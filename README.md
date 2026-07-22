# ♠♥ Troefcall Online ♦♣ — Installatiehandleiding

Met deze stappen zet je de app gratis online, zodat jij en je vrienden
elk op je eigen telefoon kunnen spelen. Je hebt ~15 minuten nodig en
alleen een e-mailadres. Geen creditcard, geen programmeerkennis.

## Wat zit er in deze map?

- `server.js` — de server (kamers + website in één)
- `package.json` — vertelt de host hoe hij moet starten
- `public/index.html` + `public/app.js` — de complete app, al gebouwd

## Stap 1 — Maak een GitHub-account (5 min)

1. Ga naar https://github.com en klik **Sign up**
2. Vul je e-mail in, kies een wachtwoord en gebruikersnaam, bevestig je e-mail

## Stap 2 — Zet de bestanden op GitHub (5 min)

1. Ingelogd op GitHub: klik rechtsboven op **+** → **New repository**
2. Repository name: `troefcall` · laat op **Public** staan · klik **Create repository**
3. Op de volgende pagina: klik op de link **"uploading an existing file"**
4. Sleep ALLE bestanden uit deze map het venster in:
   - `server.js`, `package.json`, `README.md`
   - én de map `public` met `index.html` en `app.js` erin
   (Lukt de map niet? Maak hem na: "Add file → Create new file", typ als
   naam `public/index.html`, plak de inhoud, herhaal voor `public/app.js`.)
5. Klik onderaan op **Commit changes**

## Stap 3 — Zet de server aan op Render (5 min)

1. Ga naar https://render.com en klik **Get Started** → kies **Sign in with GitHub**
2. Klik **New +** → **Web Service**
3. Kies je `troefcall`-repository (klik **Connect**)
4. Vul in:
   - Name: `troefcall` (of iets anders — dit wordt je website-adres)
   - Build Command: laat leeg (of `npm install`)
   - Start Command: `node server.js`
   - Instance Type: **Free**
5. Klik **Deploy Web Service** en wacht 1–2 minuten tot er "Live" staat

## Stap 4 — Spelen!

Je app staat nu op: `https://troefcall.onrender.com` (jouw gekozen naam).

1. Stuur die link naar je vrienden (WhatsApp)
2. Iedereen opent de link in de browser
3. Jij: **Online met vrienden** → naam → **Nieuwe kamer maken** → deel de 4-lettercode
4. Zij: **Online** → naam → code intypen → **Meedoen**
5. Jij drukt **Start het spel** ▶

Tip: zet de link op je beginscherm (Safari: deel-knop → "Zet op beginscherm"),
dan voelt het als een echte app.

## Goed om te weten

- **Gratis servers slapen.** Na ±15 min zonder bezoek valt de server in
  slaap; de eerste bezoeker wacht dan ~30–60 sec. Daarna is hij weer snel.
- **Kamers verlopen na 24 uur** — voor een spelavond ruim genoeg.
- **De AI-coach-chat** (vragen stellen aan de coach) werkt alleen in de
  Claude-versie. Al het andere — coach-advies met uitleg, cursus, hotseat,
  dagelijkse pit, statistieken — werkt hier volledig.
- **Later een nieuwe versie?** Upload het nieuwe `public/app.js` op GitHub
  (zelfde plek, "Commit changes") — Render zet hem automatisch live.

Veel plezier! ♠♥♦♣
