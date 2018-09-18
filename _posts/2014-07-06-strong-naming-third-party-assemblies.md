---
layout: post
title: Strong Naming Third-party Assemblies
comments: true
permalink: blog/strong-naming-third-party-assemblies/
redirect_from: /strong-naming-third-party-assemblies/
lang: en
---

[Strong naming](http://msdn.microsoft.com/en-us/library/wd40t7ad%28v=vs.110%29.aspx) has caused a [religious](https://json.codeplex.com/workitem/22458) [war](http://nickberardi.com/json-net-strong-naming-and-nuget-woes/) [in](https://github.com/thinktecture/Thinktecture.IdentityModel.45/issues/50) [the](https://bitbucket.org/davidebbo/webactivator/issue/4/assemblies-are-not-signed) [Open](https://github.com/NancyFx/Nancy/issues/1522) [Source](https://github.com/mikehadlow/EasyNetQ/issues/192) [.NET-community](https://github.com/octokit/octokit.net/issues/405). If you are a writing a third-party library or you simply are a .NET-enthusiast, then you will definitely want to read [this extensive thread on NuGet](http://nuget.codeplex.com/discussions/247827). You will learn a lot about strong naming, its implications and the pickle the Open Source community is currently in. Be warned, the thread is *long*, contains *heated debates* and has been running for *over three years*. 

In this post, I will not be burning my hands on this debate. This thread is aimed at the consultants looking for a practical solution. You are at a client. You are developing an application. You use third-party libraries because you want to reach your goals as efficiently as possible. You encounter the following error while building your solution:

> Assembly generation failed – Referenced assembly ‘Cool.Library’ does not have a strong name

## A practical solution

Rather than wasting your expensive billable hours on debates your client does not understand nor care about, let’s fix the problem at hand: The assembly does not have a strong name, so let’s add one ourselves. The following guide assumes you have a third party library called Cool.Library.dll. 

 1. Open up Developer Command Prompt for Visual Studio. This tool is available in your Window programs and can be found using the default Windows search.
 2. Ensure your prompt has access to the following tools by executing them once: `sn` `ildasm` and `ilasm`
 3.	Navigate to the folder where your Cool.Library.dll is located
 4. `sn –k Cool.Library.snk` to create a new key pair
 5. `ildasm Cool.Library.dll /out:Cool.Library.il` to disassemble the library
 6. `move Cool.Library.dll Cool.Library.unsigned.dll` to keep the original library as a back-up
 7. `ilasm Cool.Library.il /dll /resource=Cool.Library.res /key=Cool.Library.snk` to reassemble the library with a strong name
 8. `powershell -command "& {[System.Reflection.AssemblyName]::GetAssemblyName($args).FullName} Cool.Library.dll"` to get the assembly fully qualified name. You will need this bit if you have to reference the DLL in external configuration files like web.config or app.config. 

The above steps allow you to strong name any assembly. If you are dealing with an open-source library, you can also choose to download the original solution and build it with a strong name. Personally, I am less fond of this option since you will be essentially adopting code into your project. Adopting code means you will have to name it, walk it and feed it.

## To be concluded...

The steps outlined in this blog are in no means an elegant solution to the [actual problem](http://nuget.codeplex.com/discussions/247827). But it works and safes you precious time that is better spent on solving your business’s problems. I hope that Microsoft and the community can reach consensus on the strong naming conundrum so that we can all move on.