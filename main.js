(function () {
  "use strict";

  var data = window.PORTFOLIO;
  if (!data) return;

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function get(path) {
    return path.split(".").reduce(function (obj, key) {
      return obj == null ? undefined : obj[key];
    }, data);
  }

  // Only allow http(s) links and relative paths inside the repo.
  function safeUrl(url) {
    if (typeof url !== "string" || !url.trim()) return null;
    var trimmed = url.trim();
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    if (/^[\w./-]+$/.test(trimmed) && trimmed.indexOf("..") === -1) return trimmed;
    return null;
  }

  // ---------- Text bindings ----------
  document.querySelectorAll("[data-bind]").forEach(function (node) {
    var value = get(node.getAttribute("data-bind"));
    if (value != null) node.textContent = value;
  });
  document.getElementById("year").textContent = new Date().getFullYear();

  // ---------- Hero ----------
  var chips = document.getElementById("genre-chips");
  (data.genres || []).forEach(function (genre) {
    chips.appendChild(el("li", "chip", genre));
  });

  var stats = document.getElementById("stats");
  var years = new Date().getFullYear() - data.startedYear;
  [
    [years + "+", "Years scripting"],
    ["Full-time", "Availability"],
    [(data.languages || []).join(" / "), "Languages"]
  ].forEach(function (pair) {
    var box = el("div", "stat");
    box.appendChild(el("dt", null, pair[1]));
    box.appendChild(el("dd", null, pair[0]));
    stats.appendChild(box);
  });

  // ---------- About ----------
  var aboutText = document.getElementById("about-text");
  (data.about || []).forEach(function (paragraph) {
    aboutText.appendChild(el("p", null, paragraph));
  });

  var skills = document.getElementById("skills");
  Object.keys(data.skills || {}).forEach(function (group) {
    var block = el("div", "skill-group");
    block.appendChild(el("h3", null, group));
    var list = el("ul", "chips chips-sm");
    data.skills[group].forEach(function (skill) {
      list.appendChild(el("li", "chip", skill));
    });
    block.appendChild(list);
    skills.appendChild(block);
  });

  // ---------- Specialities ----------
  var specGrid = document.getElementById("specialities");
  (data.specialities || []).forEach(function (spec, i) {
    var card = el("article", "spec-card");
    card.appendChild(el("span", "spec-num mono", String(i + 1).padStart(2, "0")));
    card.appendChild(el("h3", null, spec.title));
    card.appendChild(el("p", null, spec.text));
    specGrid.appendChild(card);
  });

  // ---------- Media ----------
  function youtubeId(url) {
    var m = url.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})/i);
    return m ? m[1] : null;
  }
  function streamableId(url) {
    var m = url.match(/streamable\.com\/(?:e\/|o\/)?([\w]+)/i);
    return m ? m[1] : null;
  }

  function buildMedia(clip) {
    var box = el("div", "media");
    var url = safeUrl(clip.url);
    if (!url) {
      box.classList.add("media-missing");
      box.appendChild(el("span", null, "Media unavailable"));
      return box;
    }

    var yt = youtubeId(url);
    if (yt) {
      // Click-to-load: avoids loading a full YouTube player per clip on page load.
      var button = el("button", "media-facade");
      button.type = "button";
      button.setAttribute("aria-label", "Play: " + (clip.title || "clip"));
      var thumb = el("img");
      thumb.src = "https://i.ytimg.com/vi/" + yt + "/hqdefault.jpg";
      thumb.alt = "";
      thumb.loading = "lazy";
      button.appendChild(thumb);
      button.appendChild(el("span", "play-icon"));
      button.addEventListener("click", function () {
        var frame = el("iframe");
        frame.src = "https://www.youtube-nocookie.com/embed/" + yt + "?autoplay=1&rel=0";
        frame.title = clip.title || "Clip";
        frame.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
        frame.allowFullscreen = true;
        box.replaceChildren(frame);
      });
      box.appendChild(button);
      return box;
    }

    var st = streamableId(url);
    if (st && /streamable\.com/i.test(url)) {
      var sframe = el("iframe");
      sframe.src = "https://streamable.com/e/" + st;
      sframe.title = clip.title || "Clip";
      sframe.loading = "lazy";
      sframe.allow = "fullscreen";
      sframe.allowFullscreen = true;
      box.appendChild(sframe);
      return box;
    }

    if (/\.(mp4|webm|mov)(\?.*)?$/i.test(url)) {
      var video = el("video");
      video.src = url;
      video.controls = true;
      video.muted = true;
      video.playsInline = true;
      video.preload = "metadata";
      box.appendChild(video);
      return box;
    }

    if (/\.(png|jpe?g|gif|webp|avif)(\?.*)?$/i.test(url)) {
      var img = el("img");
      img.src = url;
      img.alt = clip.title || "";
      img.loading = "lazy";
      img.addEventListener("error", function () {
        box.classList.add("media-missing");
        box.replaceChildren(el("span", null, "Media unavailable"));
      });
      box.appendChild(img);
      return box;
    }

    box.classList.add("media-missing");
    box.appendChild(el("span", null, "Unsupported link"));
    return box;
  }

  // ---------- Work ----------
  var groupsHost = document.getElementById("work-groups");
  var tabsHost = document.getElementById("work-tabs");
  var filled = (data.categories || []).filter(function (cat) {
    return cat.clips && cat.clips.length;
  });

  if (!filled.length) {
    document.getElementById("work-empty").hidden = false;
    tabsHost.hidden = true;
  } else {
    filled.forEach(function (cat) {
      var group = el("div", "work-group");
      group.dataset.category = cat.id;
      var head = el("div", "work-group-head");
      head.appendChild(el("h3", null, cat.title));
      head.appendChild(el("span", "count mono", cat.clips.length + (cat.clips.length === 1 ? " clip" : " clips")));
      group.appendChild(head);
      if (cat.blurb) group.appendChild(el("p", "work-group-blurb", cat.blurb));

      var grid = el("div", "clip-grid");
      cat.clips.forEach(function (clip) {
        var card = el("article", "clip-card");
        card.appendChild(buildMedia(clip));
        var body = el("div", "clip-body");
        if (clip.title) body.appendChild(el("h4", null, clip.title));
        if (clip.description) body.appendChild(el("p", null, clip.description));
        if (clip.tags && clip.tags.length) {
          var tags = el("ul", "chips chips-xs");
          clip.tags.forEach(function (t) { tags.appendChild(el("li", "chip", t)); });
          body.appendChild(tags);
        }
        card.appendChild(body);
        grid.appendChild(card);
      });
      group.appendChild(grid);
      groupsHost.appendChild(group);
    });

    // Filter tabs only make sense with more than one category.
    if (filled.length < 2) {
      tabsHost.hidden = true;
    } else {
      var options = [{ id: "all", title: "All" }].concat(filled);
      options.forEach(function (opt, i) {
        var tab = el("button", "tab", opt.title);
        tab.type = "button";
        tab.setAttribute("role", "tab");
        tab.setAttribute("aria-selected", i === 0 ? "true" : "false");
        tab.addEventListener("click", function () {
          tabsHost.querySelectorAll(".tab").forEach(function (t) {
            t.setAttribute("aria-selected", t === tab ? "true" : "false");
          });
          groupsHost.querySelectorAll(".work-group").forEach(function (g) {
            g.hidden = opt.id !== "all" && g.dataset.category !== opt.id;
          });
        });
        tabsHost.appendChild(tab);
      });
    }
  }

  // ---------- Reviews ----------
  var reviews = (data.reviews || []).filter(function (r) { return r && r.quote && r.name; });
  if (!reviews.length) {
    document.querySelectorAll('[data-requires="reviews"]').forEach(function (node) {
      node.hidden = true;
    });
  } else {
    var reviewList = document.getElementById("review-list");
    reviews.forEach(function (review) {
      var card = el("figure", "review");
      var rating = Math.max(1, Math.min(5, Math.round(review.rating || 5)));
      var stars = el("div", "stars");
      stars.setAttribute("role", "img");
      stars.setAttribute("aria-label", rating + " out of 5 stars");
      for (var i = 0; i < 5; i++) stars.appendChild(el("span", i < rating ? "star on" : "star", "★"));
      card.appendChild(stars);
      card.appendChild(el("blockquote", null, "“" + review.quote + "”"));
      var cap = el("figcaption");
      cap.appendChild(el("span", "review-name", review.name));
      if (review.project) cap.appendChild(el("span", "review-project", review.project));
      card.appendChild(cap);
      reviewList.appendChild(card);
    });
  }

  // Number the section kickers after hiding empty sections, so they never skip.
  var n = 0;
  document.querySelectorAll(".section").forEach(function (section) {
    if (section.hidden) return;
    var kicker = section.querySelector(".section-kicker");
    if (kicker) {
      n += 1;
      kicker.textContent = String(n).padStart(2, "0") + " — " + kicker.textContent;
    }
  });

  // ---------- Commissions ----------
  var terms = document.getElementById("terms");
  ((data.commissions && data.commissions.terms) || []).forEach(function (term) {
    var card = el("div", "term");
    card.appendChild(el("h3", null, term.title));
    card.appendChild(el("p", null, term.text));
    terms.appendChild(card);
  });

  // ---------- Contact ----------
  var copyBtn = document.getElementById("copy-discord");
  var feedback = document.getElementById("copy-feedback");
  var resetTimer;
  function showFeedback(msg) {
    feedback.textContent = msg;
    clearTimeout(resetTimer);
    resetTimer = setTimeout(function () { feedback.textContent = ""; }, 2500);
  }
  copyBtn.addEventListener("click", function () {
    var name = data.discord;
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(name).then(
        function () { showFeedback("Copied “" + name + "”. Add me on Discord."); },
        function () { showFeedback("Couldn't copy. My username is " + name); }
      );
    } else {
      showFeedback("My Discord username is " + name);
    }
  });
})();
