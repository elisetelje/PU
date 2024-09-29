### Utvikling

Hver oppgave skal på dette stadiet være et tenkt konkret stykke arbeid.
Dette arbeidet skal skje i en egen gren i git.

For hver oppgave har GitLab et forslag til gren-navn, basert på issuen på formen
```
33-vurdere-navngiving-av-gren-navn-paa-lange-oppgaver
```
Denne blir fort litt lang, men så lenge oppgavenummeret er med på starten
vil GitLab forstå at grenen hører til oppgaven når tiden er inne for merging.
I tillegg skal alle commits være navngitt deskriptivt etter reglene i
[conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).
Dette vil si at alle commit meldinger er på formen
```
docs(#43): endre på README

Beskrivelse av forandringen, kun dersom det trengs.
Inni parantesen skrives oppgavenummeret bunten jobber mot.
Merk at resten av linjen er i infinitiv, har liten forbokstav og er uten tegnsetting.
Linjen skal passe inn i setningen:
  
  Hvis denne bunten flettes inn i kodebasen vil den <melding>.
  
BREAKING CHANGES: ødelegger funksjonalitet og må derfor ha denne linjen
```
Vi holder oss til de definerte engelske nøkkelordene for maskinlesbarheten sin del:

`feat`, `fix`, `chore`, `build`, `test`, `refactor`, `perf`, `style`, `ci`, `docs`.

Bunter med automatiske meldinger (`revert `, `merge `) trenger ikke følge reglene.

### Kontrollering

Etter utvikling lages en merge request fra utviklingsgrenen til hovedgrenen (master).
Merge requesten skal ha en fornuftig tittel, og beskrivelen skal kort beskrive forandingen
og *hvorfor* forandringen er blitt gjort.
Hva som er blitt gjort skal være beskrevet i commit meldingene. Merge requesten skal også
referere til oppgaven den løser med `Fixes #58`, som GitLab forstår.
Så fremt man har brukt GitLab sitt forslag til gren-navn på oppgaven vil fletteforespørselen
automatisk få merkelapper og `Closes #<oppgavenr>` i beskrivelsen.

Oppgaven på sprint-tavlen flyttes til "Til vurdering"-kolonnen, og et annet gruppemedlem
skal bli bedt om å vurdere fletteforespørselen, gjennom å få den tilegnet. Videre forbedringer og forandringer skal
legges på utviklingsgrenen, og når grenen er klar skal den merges inn i hovedgrenen.

Dersom forandringer har skjedd på hovedgrenen i mellomtiden må utviklingsgrenen enten sammenflettes
eller lempes om (rebase) med hovedgrenens nye innhold før merge requesten kan merges.

