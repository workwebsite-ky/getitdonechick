# Get It Done Chick Consulting — Website

Static site. No build step, no dependencies. Open `index.html` in a browser and it runs.

## Files
| Path | What it is |
|---|---|
| `index.html` | Home — hero, "Done List", services, why-choose, testimonials, FAQ |
| `services.html` | Full service detail pages with SEO copy |
| `pricing.html` | Bundles + full rate table + payment FAQ |
| `about.html` | Renika's story, mission & vision, credentials |
| `contact.html` | Form, contact details, Google Map |
| `css/style.css` | All styling. Brand colours live at the top under `:root` |
| `js/script.js` | Loader, nav, scroll reveals, counters, accordion, form |
| `images/` | Logo, CEO photo, contracts banner |
| `robots.txt`, `sitemap.xml` | SEO |

## Things to change before going live

1. **Testimonials** — the three reviews on `index.html` are placeholders written to show the layout. Search for `⚠ EDITABLE` and swap in real client quotes. Don't publish invented reviews.
2. **Domain** — replace `https://getitdonechick.com/` in the `<link rel="canonical">`, `og:url`, `sitemap.xml` and `robots.txt` on every page.
3. **Contact form** — currently opens the visitor's email app with everything pre-filled (`mailto:` fallback, no backend needed). To get submissions in your inbox automatically, sign up at formspree.io and change the `<form>` tag on `contact.html` to:
   `<form id="bookingForm" action="https://formspree.io/f/YOUR_ID" method="POST">`
   then delete the `bookingForm` block in `js/script.js`.
4. **Prices** — all in `pricing.html`, `services.html` and the home page cards.
5. **Bundles** — "The Career Comeback" ($150) and "The Creator's Corner" ($175) were written for you as examples. Adjust or delete.
6. **Stats** — the four counters on the home page use `data-count`. Update the numbers there.

## Brand colours (from the logo)
```
--pink       #f5399b   rhinestone pink (primary)
--pink-soft  #ff8fc5   patent-leather highlight
--pink-deep  #b0165f   pressed / shadow
--gold       #d8a64b   champagne (crown + diamonds)
--ink        #0a0509   onyx (logo background)
--blush      #fcd7e7   body text on dark
```
Change these six values in `css/style.css` and the whole site re-themes.

## Hosting
Drag the folder into Netlify Drop, or push to GitHub and turn on Pages. No server required.
