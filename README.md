# LUMIÈRE — Capture a Moment 📸

An interactive vintage instant camera with a luxury black-and-gold finish. Press **Capture Moment** to animate the shutter, fire a camera flash, eject a Polaroid-style instant photo, and watch the picture develop from dark monochrome to full color.

**No personal/business branding. No framework. No image assets or JavaScript libraries needed.**

## What is inside?

- A detailed vintage camera built entirely from layered CSS (no 3D model)
- Shutter aperture and flash animations
- Instant-print photo ejection and gradual development
- 3 original vector landscapes: Golden Hour, After Dark, Amber Dunes
- Three scene choices and Reset button
- Responsive mobile and desktop layouts with subtle mouse parallax
- Ambient dust particles in the Canvas 2D API
- Keyboard support: `Space` to capture
- `prefers-reduced-motion` styles

## Built with

- HTML5
- CSS3 (gradients, 3D transforms, keyframes)
- Vanilla JavaScript
- Canvas 2D for particles
- Inline SVG for locally embedded original landscape illustrations

**Note:** Google Fonts are used for optional typography. The interface works offline with Georgia and Arial system-font fallbacks. No runtime image/CDN request is required for the animation.

## Run locally

### Option A — Quick start

Open `index.html` in a browser.

### Option B — Local server

```bash
python -m http.server 8000
```

Then visit http://localhost:8000/ . You can also use VS Code Live Server.

## Controls

1. Choose a scene using the `‹` and `›` buttons.
2. Press **Capture Moment** or `Space`.
3. Watch the flash and print animation; after a few seconds the photo becomes colorful.
4. Press **Capture Again** to repeat; **Reset** clears the printed photo.

## Publish to GitHub Pages

1. Create a **public** GitHub repository, e.g. `lumiere-instant-camera`.
2. Upload `index.html`, `styles.css`, `script.js`, `README.md`, `LICENSE`, `.gitignore` (optional `previews/` and `SOCIAL_CAPTIONS.md`).
3. Visit repository **Settings → Pages**. Choose **Deploy from a branch**, `main`, root `/`, and Save.
4. Your live link will look similar to `https://YOUR-USERNAME.github.io/lumiere-instant-camera/`.
5. Replace the placeholders in `SOCIAL_CAPTIONS.md` with your actual live preview and repository URLs.

## Reel recording idea (9:16)

- 0–3s: Show camera and luxury dark/gold look.
- 3–6s: Close-up on lens and capture button.
- 6–10s: Camera flash and photo ejection.
- 10–13s: Polaroid develops to full color.
- 13–17s: Change to a new scene and capture again.
- 17–20s: Editor code + browser output split-screen.

For an uncluttered recording, use browser full-screen, zoom 85–100% as needed, and hide the cursor when stationary.

## Files

```text
lumiere-vintage-camera/
├── index.html
├── styles.css
├── script.js
├── README.md
├── SOCIAL_CAPTIONS.md
├── LICENSE
├── .gitignore
└── previews/
    ├── desktop-idle.png
    ├── desktop-captured.png
    ├── reel-idle.png
    └── reel-captured.png
```

## License

MIT — you're free to learn from, customize, and publish the source code.
