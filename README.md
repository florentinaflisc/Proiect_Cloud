Introducere

Într-o lume în continuă dezvoltare apar tot mai multe aplicații, fiecare cu specificul ei, ei cu stilul ei aparte. Am realizat o aplicație care primește ca și input numele unui oraș din întreaga lume și returnează temperatura în grade Celsius la momentul respectiv, sau pentru următoarele 7 zile. Se poate observa: temperatura curentă, starea vremii, umiditatea, presiunea, temperatura maximă și temperatura minimă. Pentru orașul introdus se poate alege și afișarea temperaturii pentru următoarele 7 zile. Aceasta va cuprinde o imagine ce afișează starea vremii, temperatura anunțată, temperatura minimă și cea maximă.
	
Descriere problemă

Tot mai multe persoane studiază aplicațiile de tip meteo înainte de a pleca într-o vacanță, într-o călătorie, la plimbare în parc sau în alte locuri. În funcție de temperatură, umiditate, starea curentă a vremii poți să alegi locul în care vei merge, hainele cu care să te îmbraci sau pe care să le iei în bagaj. 

Descriere API

1.	OpenCage Geocoding API 

API-ul OpenCage Geocoding oferă 2 tipuri de geocodificare: 

-din latitudine / longitudine în text

-din text în latitudine / longitudine.

Acest API preia numele orașului introdus de către utilizator și obține datele necesare pentru a accesa API-ul de vreme.

2.	OpenWeatherMap – One Call API 

Cu un singur apel API se obțin toate datele esențiale despre vreme pentru o anumită locație cu API-ul OpenWeather One Call.

API-ul One Call oferă următoarele date meteorologice pentru orice coordonate geografice:
Vremea curentă,
Prognoza pe minute pentru 1 oră,
Prognoza pe ore pentru 48 de ore,
Prognoza zilnică pentru 7 zile,
Alerte meteorologice naționale,
Date meteo istorice pentru ultimele 5 zile,
Date meteo curente și prognozate.

Flux de date

1.Exemple de response/request

Pentru locație vom solicita latitudine si longitudine pentru orașul București.

https://api.opencagedata.com/geocode/v1/json?q=Bucharest&key=06c475e5e19743d1bbe8531eaf0eedc7

Response-ul de tip JSON este foarte lung, deci voi selecta doar partea care oferă informațiile necesare:

{

    "documentation": "https://opencagedata.com/api",
    "licenses": [
        {
            "name": "see attribution guide",
            "url": "https://opencagedata.com/credits"
        }
    ],
    "results": [
            "bounds": {
                "northeast": {
                    "lat": 44.5413964,
                    "lng": 26.2255768
                },
                "southwest": {
                    "lat": 44.3342466,
                    "lng": 25.9637045
                }
            }
]
}

Pentru latitudinea si longitudinea găsite vom solicita vremea.

https://api.openweathermap.org/data/2.5/onecall?lat=44.3342466&lon=25.9637045&exclude=hourly&appid=b33caad8375bc8a37f2353905658ff39

Response-ul de tip JSON este următorul:

{

    "lat": 44.3342,
    "lon": 25.9637,
    "timezone": "Europe/Bucharest",
    "timezone_offset": 10800,
    "current": {
        "temp": 286.76,
        "pressure": 1021,
        "humidity": 58,
        "weather": [
            {
                "id": 800,
                "main": "Clear",
                "description": "clear sky",
                "icon": "01n"
            }
        ]
    },
    
    "daily": [
        {
            "dt": 1620640800,
            "sunrise": 1620615297,
            "sunset": 1620667812,
            "moonrise": 1620613860,
            "moonset": 1620663240,
            "temp": {
                "day": 292.16,
                "min": 280.97,
                "max": 293.3,
                "night": 286.76,
                "eve": 290.41,
                "morn": 281.81
            },
            },
            "pressure": 1024,
            "humidity": 35,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ]

}

2.Metode HTTP

Pentru locație sunt acceptate atât protocoalele HTTP 1.1, cât și HTTP / 2. Toate cererile ar trebui să utilizeze metoda HTTP GET. Solicitările care utilizează alte metode vor primi un răspuns cu starea 405 - Metoda nu este permisă.

Pentru vreme se utilizează tot o metoda de tip HTTP GET pentru a prelua informațiile necesare.

3.Autentificare și autorizare servicii utilizate

Pentru ambele API-uri a fost necesară crearea de conturi si solicitarea de API Keys. OpenCage a avut un proces mai simplu de autentificare și solicitare API. Acesta oferă pentru un cont free maxim 2500 de request-uri pe zi. Pentru OpenWeather, dupa crearea contului trebuia ales pachetul dorit, in cazul meu One Call API unde am ales varianta free care pune la dispoziție maxim 1000 de apeluri pe zi si maxim 30000 pe lună.

 <img src="flux_date.PNG">
 
Capturi de ecran aplicație



