# GjørNo
GjørNo' er en nettside hvor man kan bli inspirert, arrangere og melde seg på ulike aktiviteter. Her kan privatpersoner blant annet legge ut poster av aktiviteter vedkommende har gjennomført, slik at andre kan inspirers til å gjøre det samme. Videre kan organisasjoner legge ut aktiviteter som andre brukere kan melde seg på. 

<br>

## Teknologier

**Frontend**
er basert på React og TypeScript.

**Backend**
er bygget på Django REST framework med sqlite3 som DB.

<br>

## Hvordan kjøre nettsiden:
### 1) Backend
Gå inn i gjorno-mappen
```bash
source venv/bin/activate
```
Gå inn i backend-mappen
```bash
python3 manage.py runserver
```

### 2) Frontend
Gå inn i frontend-mappen
```bash
yarn start
```

<br>

## Mappestruktur
Vi har valgt å skille frontend og backend i egne mapper. 

    gjorno/
        frontend/
            src/
                components/
                    ...
                pages/
                    ...
                style/
                    ...
                interface/
                    ...
                App.tsx
                ...
            package.json
            ...
        backend/
            api/
                api/
                    models.py
                    urls.py
                    serializers.py
                    ...
                settings.py
                ...
            manage.py
            ...

<br>

## Brukerhistorier
Under finner du en liste med alle brukerhistoriene våre.

| Id  | Navn | Brukerhistorie | 
| --- | ------------- | ------------------------------------- |
|  A  | Se aktivitet  | Som en bruker, ønsker jeg å kunne se aktiviteter, slik at jeg kan gjennomføre disse  |
|  B  | Legge til aktivitet  | Som en bruker ønsker jeg å kunne legge ut aktiviteter offentlig slik at andre kan bli inspirerte til å gjøre det samme  |
|  C  | Lag profil  | Som en bruker/organisasjon ønsker jeg å kunne lage en egen profil, slik at jeg kan delta/få innsyn på plattformen  |
|  D  | Innloggingssystem | Som en bruker/organisasjon ønsker jeg å kunne logge inn i egen profil, slik at jeg får oversikt over mine aktiviteter  |
|  E  | Opprette organiserte aktiviteter  | Som en organisasjon ønsker jeg å kunne opprette organiserte aktiviteter slik at andre brukere kan melde seg på  |
|  F  | Melde seg på aktiviteter  | Som en bruker ønsker jeg å kunne melde meg på aktiviteter i regi av organisasjoner slik at jeg kan delta på aktuelle turer  |
|  G  | Markere aktiviteter  | Som en bruker/organisasjon, ønsker jeg å kunne markere aktiviteter slik at de blir en del av en aktivitetslogg  |
|  H  | Skille aktiviteter  | Som en bruker ønsker jeg å kunne skille mellom aktiviteter lagt ut av organisasjoner og andre brukere, slik at jeg kan få opp det jeg ønsker å se  |
|  I  | Filtrere/sortere aktiviteter  | Som en bruker, ønsker jeg å kunne filtrere/sortere aktiviteter, slik at jeg kan finne de turene jeg har interesse for  |
|  J  | Moderator-tilgang  | Som en admin, ønsker jeg å kunne slette, opprette og moderere aktiviteter slik at aktivitetene er kvalitetssikret  |
|  K  | Statistikkside  | Som en admin ønsker jeg en statistikkside slik at jeg kan ha oversikt over hvilke aktiviteter som er mest populære  |
|  L  | Deltakere på private aktiviteter  | Brukere kan organisere turer med et spesifisert antall deltakere.  |
|  M  | Chat-funksjon  | Som bruker av applikasjonen, ønsker jeg å kunne kommunisere direkte med organisasjoner,slik at jeg kan melde meg på aktiviteter eller få mer informasjon om interessante aktiviteter.  |