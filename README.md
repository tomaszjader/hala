# HALA. — Zostań pasterzem w Tatrach

Słoneczny landing page o pasterstwie na Podhalu. Dwa filmy sterowane przewijaniem, osobne kadrowanie mobilne i statyczne obrazy przy ograniczeniu ruchu.

**Strona:** https://tomaszjader.github.io/hala/

## Lokalnie

Wymagany Bun 1.4.4 lub nowszy oraz Node.js zgodny z Vite 8.

```sh
cd app
bun install
bun run dev
```

## Sprawdzenie wersji GitHub Pages

```sh
cd app
SITE_BASE_PATH=/hala/ bun run build
SITE_BASE_PATH=/hala/ bun run preview
```

W PowerShell ustaw wcześniej `$env:SITE_BASE_PATH = '/hala/'`, a następnie uruchom `bun run build` i `bun run preview`. Podgląd otwórz pod `/hala/`.

Push do `main` uruchamia workflow `.github/workflows/pages.yml`, który buduje i publikuje stronę. GitHub Pages korzysta ze źródła **GitHub Actions**. Nie potrzeba serwera, Cloudflare ani kluczy API.

## Edycja

- Treści i sekcje: `app/src/routes/index.tsx`
- Wygląd: `app/src/routes/index.css`
- Scena otwierająca: `app/src/scroll-scrub-scenes.ts`
- Silnik przewijania: `app/src/components/scroll-scrub/`
- Aktualne obrazy i filmy: `app/public/assets/`
- Pochodzenie mediów: `app/media-manifest.json`

Adresy mediów przechodzą przez helper `assetUrl`, dzięki czemu działają zarówno lokalnie, jak i w podkatalogu `/hala/`.

## Materiały i formularz

Obrazy wygenerowano przez Higgsfield modelem GPT Image 2.6, a filmy modelem Kling 4.0. Mają fotograficzny charakter, ale są wizualizacjami AI i nie dokumentują konkretnych osób lub miejsc.

To strona koncepcyjna, nie oficjalna rekrutacja. Formularz przygotowuje szkic e-maila w programie pocztowym. Nie zapisuje danych i nie wysyła wiadomości automatycznie.

Oryginały robocze, dawne generacje, zrzuty ekranu i zależności lokalne nie są publikowane w repozytorium.
## Wersja angielska na Netlify

`/en` i `/en/` otwierają angielską wersję strony. Parametr `?lang=en` również wymusza angielski, a `?lang=pl` polski. Bez wyboru języka strona główna pozostaje po polsku. Przekierowania w `netlify.toml` obsługują bezpośrednie wejście i odświeżanie `/en`.
