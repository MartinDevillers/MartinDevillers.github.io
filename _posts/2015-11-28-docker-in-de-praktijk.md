---
layout: post
title: Docker in de praktijk
comments: true
permalink: blog/docker-in-de-praktijk/
excerpt: Een kijkje achter de schermen van de ov-chipkaart
---
De [Nederlandse Java User Group](http://www.nljug.org/) (NLJUG) heeft in haar 2015-5 editie van [Java Magazine](http://www.nljug.org/databasejava/) een artikel geplaatst over de [micro-services architectuur](http://martinfowler.com/articles/microservices.html) die [ik samen met Info Support in 2015 voor Translink heb ontworpen en geïmplementeerd](/projecten/ov-chipkaart/). Een belangrijke succesfactor van deze micro-services architectuur is de inzet van [Docker](https://www.docker.com/). Het artikel in Java Magazine geeft een mooi beeld hoe het projectteam dankzij Docker een invulling heeft gegeven aan de wensen van Translink om een flexibele en wendbare applicatie te creëren. In een notendop hebben wij met Docker het volgende bereikt:

* **Lean OTAP**. Met Docker heb je snel een geautomatiseerde OTAP-straat staan waardoor je minder verschillen tussen ontwikkel, test, acceptatie en productie krijgt. Dit leidt weer tot minder complexiteit en minder fouten (works on my machine);
* **Betere grip op configuratie**, door deze in Dockerfile's te beschrijven en in versiebeheer op te slaan;
* **Hogere productiviteit**, doordat projectleden minder tijd kwijt zijn met beheertaken of releasewerkzaamheden, houden ze meer tijd over om te ontwikkelen. Daarnaast heb je met Docker sneller en eenvoudiger lokaal een omgeving staan die gelijkwaardig is aan productie;
* **Isoleren van applicaties** betekent hogere veiligheid, betere schaalbaarheid en minder impact van crashes.
* **Infrastructuur consolidatie**, dankzij de lage systeemvereisten van Docker kan je met minder hardware hetzelfde bereiken als wanneer je traditionele Virtual Machines zou gebruiken.

### [<i class="icon-file-pdf-o"></i> Klik hier om het artikel te lezen (PDF)](/assets/28-11-2015-artikel-translink-java-magazine-5-2015.pdf)