---
layout: post
title: 'ASP.NET MVC 4 RC: Getting WebApi and Areas to play nicely'
comments: true
permalink: blog/getting-webapi-and-areas-to-play-nicely/
redirect_from: /getting-webapi-and-areas-to-play-nicely/
---

ASP.NET MVC 4 is a framework for building scalable, standards-based web applications using well-established design patterns and the power of ASP.NET and the .NET Framework. Two powerful features of ASP.NET MVC 4 are Areas and WebApi. Areas let you partition Web applications into smaller functional groupings, while WebApi is a platform for building RESTful applications. Unfortunately, combining both features is not supported by ASP.NET MVC 4. In this blog, I discuss these limitations and present a possible solution.

## Background

The WebApi and Areas features play an important role in the project I am currently working on. In this project, a web application is developed for multiple types of end-users. Areas are used to create separate frontends for each type of end-user. WebApi is used as part of an interaction framework (knockoutjs) that enriches the user experience. Below is a list of relevant design decisions that were made:

* The main MVC application resides in the root of the solution.
* All administrator functionality resides in a separate area.
* Each external party has its own area.
* Each area, including the root, constitutes a well separated functional block. Functionality from one area may not be exposed to another area. This is to prevent unauthorized access of data.
* Each area, including the root, has its own RESTfull API (WebApi).

During the development of this web application, I encountered an important limitation of WebApi when used in conjunction with Areas.

## Routing and WebApi

Both regular and WebApi calls use ASP.NET MVC’s routing mechanism to translate HTTP requests to the appropriate controller action. However, only regular calls support areas, while WebApi calls are “arealess”. As a result, WebApi controllers in different areas are actually accessible from all areas. Additionally, having multiple WebApi controllers with identical names in different areas will produce an exception:

> Multiple types were found that match the controller named ‘clients’. This can happen if the route that services this request (‘api/{controller}/{id}’) found multiple controllers defined with the same name but differing namespaces, which is not supported.

> The request for ‘clients’ has found the following matching controllers:
MvcApplication.Areas.Administration.Controllers.Api.ClientsController
MvcApplication.Controllers.Api.ClientsController

The error message pretty much sums up the problem: ASP.NET MVC 4 RC does not support the partitioning of WebApi controllers across areas.

## IHttpControllerSelector

The culprit is the `DefaultHttpControllerSelector` which is ASP.NET WebAPI’s default implementation of the `IHttpControllerSelector` interface. This class is responsible for selecting the appropriate `IHttpController` (the interface implemented by `ApiController`), when provided with a HTTP request message. At the heart of the `DefaultHttpControllerSelector` lies the `HttpControllerTypeCache`. This class runs through all assemblies that are used by the application and caches all types that implement the `IHttpController`. The `SelectController` method of the `DefaultHttpControllerSelector` uses this cache to lookup a matching type for the given controller name. This operation can end in three different manners:

* No matching types were found, which results in an `HttpStatus.NotFound` (404).
* One matching type was found, which is returned by the method and ASP.NET MVC continues to process the request.
* Multiple matches were found, which results in an exception similar to one displayed earlier.

## In search for a solution

Fortunately, through the power of Inversion of Control, developers can inject their own implementation of `IHttpControllerSelector`. [In a related blog by Andrew Malkov](http://netmvc.blogspot.be/2012/06/aspnet-mvc-4-webapi-support-areas-in.html), he attempts to tackle the problem by creating a custom implementation called `AreaHttpControllerSelector`.

This class allows area specific WebApi controllers to co-exist, provided one makes a minor modification to the WebApi routes. In order to function, a default route parameter called “area” must be added to the `HttpRoute` definition in the `AreaRegistration` file.

```c#
context.Routes.MapHttpRoute(
    name: "Administration_DefaultApi",
    routeTemplate: "Administration/api/{controller}/{id}",
    defaults: new { area = "Administration", id = RouteParameter.Optional }
);
```

Unfortunately, adding this extra parameter introduces a new limitation: Querystring parameters on WebApi calls no longer function. E.g. `GET /Administration/api/clients` will work, but `GET /Administration/api/clients?firstname=john` will result in a 404.

Part of the problem lies in the manner in which `AreaRegistration` is used to define routes. Consider the `AdministrationAreaRegistration` below:

```c#
public class AdministrationAreaRegistration : AreaRegistration
{
    public override string AreaName
    {
        get
        {
            return "Administration";
        }
    }

    public override void RegisterArea(AreaRegistrationContext context)
    {
        context.Routes.MapHttpRoute(
            name: "Administration_DefaultApi",
            routeTemplate: "Administration/api/{controller}/{id}",
            defaults: new { id = RouteParameter.Optional }
        );
            
        context.MapRoute(
            "Administration_default",
            "Administration/{controller}/{action}/{id}",
            new { action = "Index", id = UrlParameter.Optional }
        );
    }
}
```

The first route defines how ApiContollers can be reached, while the second route defines how regular controllers can be reached. Both registrations use a different method for registering the route in order to differentiate between normal calls and WebApi calls. Routes registered through MapHttpRoute are meant for WebApi controllers while routes registered through `MapRoute` are meant for regular controllers.

Note that `MapHttpRoute` is called on the `Routes` collection, whereas MapRoute is called on the `AreaRegistrationContext` itself. This implies that there is a difference between the default MapRoute and the one provided by the `AreaRegistrationContext`.

After digging through the sourcecode of ASP.NET MVC, I found that the most notable difference is that the MapRoute of `AreaRegistrationContext` incorporates the `AreaName` into the route’s metadata. Specifically, the value of the `AreaName` property is added to the route’s `DataTokens`.

## Solution – Part 1

I created a MapHttpRoute extension method for the AreaRegistrationContext that performed a similar operation as the AreaRegistrationContext.MapRoute method.

```c#
public static class AreaRegistrationContextExtensions
{
    public static Route MapHttpRoute(this AreaRegistrationContext context, string name, string routeTemplate)
    {
        return context.MapHttpRoute(name, routeTemplate, null, null);
    }

    public static Route MapHttpRoute(this AreaRegistrationContext context, string name, string routeTemplate, object defaults)
    {
        return context.MapHttpRoute(name, routeTemplate, defaults, null);
    }

    public static Route MapHttpRoute(this AreaRegistrationContext context, string name, string routeTemplate, object defaults, object constraints)
    {
        var route = context.Routes.MapHttpRoute(name, routeTemplate, defaults, constraints);
        if (route.DataTokens == null)
        {
            route.DataTokens = new RouteValueDictionary();
        }
        route.DataTokens.Add("area", context.AreaName);
        return route;
    }
}
```

To use the new extension method, remove the Routes property from the call chain:

```c#
context.MapHttpRoute(
    name: "Administration_DefaultApi",
    routeTemplate: "Administration/api/{controller}/{id}",
    defaults: new { id = RouteParameter.Optional }
);
```

Now both the regular routes and the WebApi routes have knowledge of their corresponding area.

## Solution – Part 2

The second part of the solution is to create an implementation of `IHttpControllerSelector` that actually uses the area name. I took the `AreaHttpControllerSelector` class from [Andrew Malkov’s blog post](http://netmvc.blogspot.be/2012/06/aspnet-mvc-4-webapi-support-areas-in.html) and used it as a base for my own solution.

```c#
namespace MvcApplication.Infrastructure.Dispatcher
{
    using System;
    using System.Collections.Concurrent;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using System.Net.Http;
    using System.Web.Http;
    using System.Web.Http.Controllers;
    using System.Web.Http.Dispatcher;

    public class AreaHttpControllerSelector : DefaultHttpControllerSelector
    {
        private const string AreaRouteVariableName = "area";

        private readonly HttpConfiguration _configuration;
        private readonly Lazy<ConcurrentDictionary<string, Type>> _apiControllerTypes;

        public AreaHttpControllerSelector(HttpConfiguration configuration)
            : base(configuration)
        {
            _configuration = configuration;
            _apiControllerTypes = new Lazy<ConcurrentDictionary<string, Type>>(GetControllerTypes);
        }

        public override HttpControllerDescriptor SelectController(HttpRequestMessage request)
        {
            return this.GetApiController(request);
        }

        private static string GetAreaName(HttpRequestMessage request)
        {
            var data = request.GetRouteData();
            if (data.Route.DataTokens == null)
            {
                return null;
            } 
            else 
            {
                object areaName;
                return data.Route.DataTokens.TryGetValue(AreaRouteVariableName, out areaName) ? areaName.ToString() : null;
            }
        }

        private static ConcurrentDictionary<string, Type> GetControllerTypes()
        {
            var assemblies = AppDomain.CurrentDomain.GetAssemblies();

            var types = assemblies
                .SelectMany(a => a
                    .GetTypes().Where(t =>
                        !t.IsAbstract &&
                        t.Name.EndsWith(ControllerSuffix, StringComparison.OrdinalIgnoreCase) &&
                        typeof(IHttpController).IsAssignableFrom(t)))
                .ToDictionary(t => t.FullName, t => t);

            return new ConcurrentDictionary<string, Type>(types);
        }

        private HttpControllerDescriptor GetApiController(HttpRequestMessage request)
        {
            var areaName = GetAreaName(request);
            var controllerName = GetControllerName(request);
            var type = GetControllerType(areaName, controllerName);

            return new HttpControllerDescriptor(_configuration, controllerName, type);
        }

        private Type GetControllerType(string areaName, string controllerName)
        {
            var query = _apiControllerTypes.Value.AsEnumerable();

            if (string.IsNullOrEmpty(areaName))
            {
                query = query.WithoutAreaName();
            }
            else
            {
                query = query.ByAreaName(areaName);
            }

            return query
                .ByControllerName(controllerName)
                .Select(x => x.Value)
                .Single();
        }
    }

    public static class ControllerTypeSpecifications
    {
        public static IEnumerable<KeyValuePair<string, Type>> ByAreaName(this IEnumerable<KeyValuePair<string, Type>> query, string areaName)
        {
            var areaNameToFind = string.Format(CultureInfo.InvariantCulture, ".{0}.", areaName);

            return query.Where(x => x.Key.IndexOf(areaNameToFind, StringComparison.OrdinalIgnoreCase) != -1);
        }

        public static IEnumerable<KeyValuePair<string, Type>> WithoutAreaName(this IEnumerable<KeyValuePair<string, Type>> query)
        {
            return query.Where(x => x.Key.IndexOf(".areas.", StringComparison.OrdinalIgnoreCase) == -1);
        }

        public static IEnumerable<KeyValuePair<string, Type>> ByControllerName(this IEnumerable<KeyValuePair<string, Type>> query, string controllerName)
        {
            var controllerNameToFind = string.Format(CultureInfo.InvariantCulture, ".{0}{1}", controllerName, AreaHttpControllerSelector.ControllerSuffix);

            return query.Where(x => x.Key.EndsWith(controllerNameToFind, StringComparison.OrdinalIgnoreCase));
        }
    }
}
```

If you want to learn more about the technical details of the solution, I suggest you read [Andrew’s excellent blog post](http://netmvc.blogspot.be/2012/06/aspnet-mvc-4-webapi-support-areas-in.html) first. The most significant modifications are:

* Changed the GetAreaName method in order to retrieve the area name from the DataTokens property rather than the RouteData.
* Added support for “arealess” WebApi controllers (e.g. those that reside in the root) to the GetControllerType method.
* Removed the fallback mechanism from the SelectController method. The original implementation would call the SelectController method of the base-class in case GetControllerType failed to produce a result. I preferred an approach where the responsibility of successful controller selection resided in AreaHttpControllerSelector.

Finally, to inject the new AreaHttpControllerSelector class, the following line must be added to the Application_Start method in the Global.asax.cs

```c#
GlobalConfiguration.Configuration.Services.Replace(typeof(IHttpControllerSelector), new AreaHttpControllerSelector(GlobalConfiguration.Configuration));
```

After these modifications everything worked as expected!

## Closing notes

The `AreaHttpControllerSelector` class presented in this blog post was designed to tackle a specific limitation of the `DefaultHttpControllerSelector`. However, the new implementation lacks several features which the default implementation has:

* The AreaHttpControllerSelector searches the current loaded assemblies for the appropriate controllers, while the DefaultHttpControllerSelector also searches all referenced assemblies.
* The DefaultHttpControllerSelector uses a much more elaborate mechanism for caching the WebApi controllers. The performance impact can be notable when the web application is loaded for the first time (cold-boot time). There is no difference in performance in subsequent requests. For more info, see [this blog post by Alexander Beletsky](http://www.beletsky.net/2011/12/inside-aspnet-mvc-instantiation-of.html).
* The DefaultHttpControllerSelector throws more meaningful exceptions when no or multiple WebApi controllers are found.

Hope you enjoyed reading this blog post! In my next installment, I will show how you can get ASP.NET MVC to automagically generate knockoutjs bindings for your forms.

## UPDATE: 6 september 2012

Several developers have contacted me about a scenario they encountered where the DataTokens property of the route variable is null. My implementation assumes that the `DataTokens` property is always initialized and will not function properly if this property is null. This behavior is most likely caused by recent changes in the ASP.NET MVC framework and may be actually be a bug in the framework. I’ve updated my code to handle this scenario.