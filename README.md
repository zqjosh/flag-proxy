# Jovaire — Roblox Scripter Portfolio

Static portfolio site (plain HTML/CSS/JS, no build step). Works on GitHub Pages.

## Editing

Everything you'd normally change lives in **`content.js`**: bio, skills, clips, experience, commission terms, Discord.
You don't need to touch `index.html`, `styles.css` or `main.js`.

### Adding a clip

Add it to the right category's `clips` list in `content.js`:

```js
{
  title: "Customer AI ordering system",
  description: "NPCs path to the counter, order, wait and leave. Server-side queue.",
  url: "https://youtu.be/XXXXXXXXXXX",
  tags: ["Pathfinding", "OOP"]
},
```

Supported `url` values: YouTube (incl. Shorts), Streamable, or a file in `media/` (`.mp4`, `.webm`, `.png`, `.jpg`, `.gif`, `.webp`).
Empty categories and an empty `experience` list are hidden automatically.

## Recording clips

- **Recorder:** OBS Studio (free) or Medal. 1080p, 60 fps.
- **Length:** 20–45 seconds per system. Show it working straight away, with no intro.
- **Content:** show the feature in-game, then a few seconds of the Explorer / code structure. Clients hire scripters on code quality.
- **Multiplayer systems:** record with Studio's *Test → Clients and Servers* (2+ players) to show it replicates correctly.
- **Upload:** YouTube as **Unlisted** (best quality, free) or Streamable, then paste the link into `content.js`.
- Avoid committing big video files to the repo. Keep anything in `media/` under ~10 MB.

## Previewing locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Publishing (GitHub Pages)

Repo **Settings → Pages → Build and deployment → Deploy from a branch**, choose the branch and `/ (root)`.
