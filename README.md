# Boga Showrya — Security Portfolio

Static site, no build step, no dependencies beyond a Google Fonts CDN link.

## Structure
- index.html        — home / hero terminal
- about.html         — whoami narrative + photo
- skills.html        — tools & domains
- projects.html      — GitHub tools & repos
- experience.html    — certifications, achievements, education
- contact.html       — contact links + resume download
- css/style.css      — all styling (design tokens at top)
- js/main.js         — terminal typing effect, nav, status bar clock, scroll reveal
- assets/resume.pdf  — downloadable resume
- assets/profile.jpg — photo (currently used in About; swap for a headshot anytime)

## To edit
Open any .html file in a text editor — content is plain HTML, easy to find and change.
Nav and status bar are duplicated per page (no build step), so if you rename a page,
update the <a href="..."> in the .nav-links on every page.

## To deploy (pick one)
1. GitHub Pages: push this folder to a repo, enable Pages on the main branch.
2. Netlify: drag-and-drop this folder onto app.netlify.com/drop — instant live URL.
3. Vercel: `vercel` in this folder (if you have the CLI installed).

## To swap the photo
Replace assets/profile.jpg with your headshot (same filename), or add a new file
and update the `src="assets/profile.jpg"` in about.html.
