Vibe — Fashion Media Portal 
Om prosjektet
Vibe er en moderne, fullstack medieportal dedikert til mote, stil og moderne kultur. Dette prosjektet er utviklet som en del av min teknologiske praksis og presenteres i forbindelse med Fagsamtale 2.

Målet med plattformen er å skape et digitalt rom der brukere ikke bare kan konsumere redaksjonelt innhold (som artikler, motekolleksjoner og trender), men også aktivt delta ved å dele sine egne antrekk, kommentere og samhandle med nettsamfunnet. Prosjektet demonstrerer moderne webutvikling med fokus på brukeropplevelse (UX/UI), sikker datahåndtering og skalerbar arkitektur.

Teknologistakk
Prosjektet er bygget med en moderne klient-tjener-arkitektur (Client-Server) og benytter følgende teknologier:

Frontend (Klient)
Next.js (App Router): React-rammeverk for bygging av et raskt og SEO-vennlig Single Page Application (SPA).

TypeScript: Typet overbygning av JavaScript for færre feil og mer robust kode.

Tailwind CSS: Utility-first CSS-rammeverk for responsivt og moderne "editorial" design.

Axios: For effektiv håndtering av HTTP-forespørsler mot backend.

Backend (Tjener)
Node.js & Express.js: Plattform og rammeverk for bygging av et raskt og skalerbart REST API.

PostgreSQL: Relasjonsdatabase for sikker og strukturert lagring av brukere, artikler, poster og kommentarer.

Multer: Node.js-mellomvare (middleware) for sikker opplasting av bilder til serveren.

JWT (JSON Web Tokens) & bcryptjs: Standarder for sikker kryptering av passord og rutebeskyttelse/autorisasjon.

Nøkkelfunksjonalitet
1. Brukerautentisering og Sikkerhet 
Fullverdig registrerings- og innloggingssystem.

Passord lagres aldri i klartekst, men hashes enveis ved hjelp av bcryptjs.

Innloggede brukere tildeles et JWT-token som lagres i nettleserens localStorage for å gi tilgang til beskyttede endepunkter (API routes).

2. Dynamisk Nyhetsstrøm (Feed) 
Startsiden inneholder en sentral strøm som samler innhold fra alle seksjoner: redaksjonelle artikler, nye kolleksjoner, sesongens trender og brukernes egne innlegg.

Mulighet for å filtrere innholdet via dynamiske faner.

3. Brukergenerert Innhold (CRUD-operasjoner) 
Create: Autentiserte brukere kan opprette egne innlegg ("posts") med tittel, beskrivelse og tags. Bilder kan enten lastes opp lokalt fra PC eller via en bilde-URL fra nettet.

Read: Alle innlegg får en egen offentlig side som alle (også uregistrerte) kan se.

Update & Delete: Brukere har fulle rettigheter til å redigere eller slette sine egne innlegg.

4. Redaksjonelt Innhold: Artikler, Kolleksjoner og Trender 
Artikler: Kategorisert innhold (Style, Beauty, Trends, Culture). Støtter kommentarfelt for innloggede brukere.

Lagre-funksjon: Brukere kan "bokmerke" (lagre) artikler de liker, som deretter samles i en egen liste.

Trender: Visuell presentasjon av motetrender med et praktisk hashtag-system for enkel navigasjon.

5. Personlig Dashboard (Min Profil) 
Et eget kontrollpanel for innloggede brukere hvor de får full oversikt over sine publiserte innlegg, lagrede artikler og kontoinformasjon.

Arkitektur og Designmønstre
Applikasjonen følger prinsippene for moderne Fullstack-utvikling:

RESTful API: Klare og logiske endepunkter (f.eks. /api/auth/login, /api/posts, /api/feed).

Databasehåndtering: Integrasjon med PostgreSQL gjøres via node-postgres med oppkoblingsbasseng (connection pooling) for optimal ytelse, samt parametriserte SQL-spørringer for å forhindre SQL-injeksjon.

Sikkerhetsfokus: Alle sensitive konfigurasjoner (databasepassord, JWT-hemmeligheter) håndteres via .env-filer og er ekskludert fra versjonskontroll (Git).

## Databasemodell (VibeDB)
Prosjektet bruker PostgreSQL som relasjonsdatabase. Databasen er normalisert og består av 6 hovedtabeller som reflekterer virkelige sammenhenger:

* **users**: Lagrer brukerinformasjon (id, username, email, password_hash).
* **categories**: Definerer kategorier for redaksjonelt innhold.
* **articles**: Redaksjonelle artikler (Knyttet til categories via `category_id`).
* **user_posts**: Brukergenerert innhold (Knyttet til users via `user_id`).
* **comments**: Kommentarer på artikler (Relasjonstabel knyttet til både `users` og `articles`).
* **saved_articles**: Lagrede artikler/bokmerker (Relasjonstabel for many-to-many mellom `users` og `articles`).

## API-Endepunkter (Ruter)
Backend tilbyr et RESTful API for kommunikasjon med frontend. Her er en oversikt over de viktigste rutene:

| Metode | Endepunkt | Beskrivelse | Krever Autentisering |
|--------|-----------|-------------|----------------------|
| POST   | `/api/auth/register` | Registrerer ny bruker | Nei |
| POST   | `/api/auth/login` | Logger inn bruker og returnerer JWT | Nei |
| GET    | `/api/auth/me` | Henter profil til innlogget bruker | Ja |
| GET    | `/api/articles` | Henter alle artikler (støtter ?category filter) | Nei |
| GET    | `/api/posts` | Henter alle innlegg fra brukere | Nei |
| POST   | `/api/posts` | Oppretter et nytt brukerinnlegg (CRUD) | Ja |
| PUT    | `/api/posts/:id` | Oppdaterer eksisterende innlegg (CRUD) | Ja (kun eier) |
| DELETE | `/api/posts/:id` | Sletter et innlegg (CRUD) | Ja (kun eier) |
| POST   | `/api/saved/:articleId` | Toggler lagring av en artikkel (bokmerke) | Ja |

## GDPR og Personvern (Privacy by Design)
* **Dataminimering:** Systemet samler kun inn strengt nødvendige data for at applikasjonen skal fungere (brukernavn, e-post og passord). Ingen unødvendig personlig informasjon lagres.
* **Sikker lagring:** Passord krypteres med `bcryptjs` før lagring i databasen. Selv ved et datainnbrudd vil ikke brukernes faktiske passord bli kompromittert.

## Universell Utforming (UU)
Frontend er utviklet med hensyn til universell utforming for å være tilgjengelig for flest mulig brukere:
* **Semantisk HTML:** Bruk av riktige tags (`<main>`, `<nav>`, `<article>`, `<header>`) for skjermlesere.
* **Tastaturnavigasjon:** Applikasjonen kan navigeres ved hjelp av Tab-tasten.
* **Kontrast:** Fargepaletten (Tailwind) er valgt med tanke på god lesbarhet og tilstrekkelig kontrast mellom tekst og bakgrunn.
* **Alt-attributter:** Alle bilder har beskrivende alt-tekster.

## Versjonskontroll (Git)
Gjennom utviklingsløpet er Git og GitHub brukt konsekvent. Funksjoner er utviklet med egne brancher for å sikre at produksjonskoden forblir stabil, og commits har beskrivende meldinger som forklarer *hva* som er endret og *hvorfor*.
