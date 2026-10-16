# Solstice Construction: design proposal

Site A and Site B of the scroll test, in one Next.js app. The spec is in `handoff/`.

```bash
npm install
npm run photos   # fetch website photos + copy handoff/photos-manual/ into public/photos/
npm run dev
```

`NEXT_PUBLIC_SITE_VARIANT` picks the homepage (`a` by default). Every page is noindex, and `robots.txt` disallows everything.
