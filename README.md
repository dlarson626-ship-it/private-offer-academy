# Private Offer Academy — installable app (PWA)

A static web app. No build step, no server code. Put this folder on any static host over HTTPS and it
installs like a native app on iPhone, Android, Windows, Mac, and Chromebook, and works offline after the first visit.

## Files
- index.html            the whole app
- manifest.webmanifest  name, colors, icons (what makes it installable)
- sw.js                 offline caching
- icons/                app icons (192, 512, maskable, Apple touch)

## Fastest way to host (about 5 minutes)
Netlify Drop: go to app.netlify.com/drop, drag this whole folder onto the page, then claim the site with a free
account so it doesn't expire. You get an https:// address immediately.
Alternatives: Cloudflare Pages (direct upload) or GitHub Pages. All free for a static site.

Optional: point your own domain at it (for example academy.yourdomain.com) in the host's Domain settings.

## Installing on a device
- iPhone/iPad: open the address in Safari -> Share -> Add to Home Screen.
- Android: open in Chrome -> menu -> Install app (or tap the "Install app" button inside the app).
- Windows/Mac/Chromebook: open in Chrome or Edge -> install icon in the address bar (or the in-app "Install app" button).

## Updating later
Edit index.html, change VERSION in sw.js (v1 -> v2), re-upload the folder. Installed copies refresh on next open.

## Good to know
- Progress (practice + quiz scores) is saved on each device/browser separately. It does not sync between devices.
- Progress from the claude.ai preview link does not carry over to the new address.
