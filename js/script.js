/* ==========================================================================
   GET IT DONE CHICK CONSULTING — script.js
   Vanilla JS, no dependencies. Every block is guarded so the same file can be
   shared by all five pages.
   ========================================================================== */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --- Page loader ------------------------------------------------------ */
  var loader = document.getElementById("loader");
  if (loader) {
    window.addEventListener("load", function () {
      setTimeout(function () { loader.classList.add("done"); }, reduced ? 0 : 500);
    });
    // Safety net: never trap the visitor behind the loader.
    setTimeout(function () { loader.classList.add("done"); }, 3000);
  }

  /* --- Sticky nav background ------------------------------------------- */
  var nav = document.querySelector(".nav");
  function onScroll() {
    if (nav) nav.classList.toggle("stuck", window.scrollY > 12);
    var top = document.getElementById("toTop");
    if (top) top.classList.toggle("show", window.scrollY > 500);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* --- Mobile menu ------------------------------------------------------ */
  var burger = document.querySelector(".burger");
  var links = document.getElementById("navLinks");
  if (burger && links) {
    burger.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        links.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && links.classList.contains("open")) {
        links.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
        burger.focus();
      }
    });
  }

  /* --- Scroll reveal ---------------------------------------------------- */
  var revealables = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -60px" });
    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add("in"); });
  }

  /* --- The Done List (hero signature) ----------------------------------
     Items fade in, then strike themselves through in sequence — the brand
     promise acted out rather than described.                              */
  var doneItems = document.querySelectorAll(".donelist li");
  if (doneItems.length) {
    if (reduced) {
      doneItems.forEach(function (li, i) {
        li.classList.add("in");
        if (i < doneItems.length - 1) li.classList.add("checked");
      });
    } else {
      doneItems.forEach(function (li, i) {
        setTimeout(function () { li.classList.add("in"); }, 700 + i * 180);
        if (i < doneItems.length - 1) {
          setTimeout(function () { li.classList.add("checked"); }, 1400 + i * 520);
        }
      });
    }
  }

  /* --- Animated counters ------------------------------------------------ */
  var counters = document.querySelectorAll("[data-count]");
  function run(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    var dur = 1500, start = performance.now();
    function tick(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + (p === 1 ? suffix : "");
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  if (counters.length) {
    if ("IntersectionObserver" in window && !reduced) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { run(e.target); cio.unobserve(e.target); }
        });
      }, { threshold: 0.5 });
      counters.forEach(function (el) { cio.observe(el); });
    } else {
      counters.forEach(function (el) {
        el.textContent = el.getAttribute("data-count") + (el.getAttribute("data-suffix") || "");
      });
    }
  }

  /* --- Card cursor glow -------------------------------------------------- */
  if (!reduced && window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".card").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", (e.clientX - r.left) + "px");
        card.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
    });
  }

  /* --- Subtle parallax --------------------------------------------------- */
  var parallax = document.querySelectorAll(".parallax");
  if (parallax.length && !reduced) {
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        parallax.forEach(function (el) {
          var speed = parseFloat(el.getAttribute("data-speed")) || 0.08;
          el.style.transform = "translate3d(0," + (y * speed).toFixed(2) + "px,0)";
        });
        ticking = false;
      });
    }, { passive: true });
  }

  /* --- FAQ accordion ----------------------------------------------------- */
  document.querySelectorAll(".acc").forEach(function (acc) {
    var q = acc.querySelector(".acc-q");
    var a = acc.querySelector(".acc-a");
    if (!q || !a) return;
    q.addEventListener("click", function () {
      var isOpen = acc.classList.contains("open");
      // one answer at a time keeps the list scannable
      acc.closest(".faq").querySelectorAll(".acc.open").forEach(function (other) {
        other.classList.remove("open");
        other.querySelector(".acc-a").style.maxHeight = null;
        other.querySelector(".acc-q").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        acc.classList.add("open");
        a.style.maxHeight = a.scrollHeight + "px";
        q.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* --- Contact form → mailto fallback ------------------------------------
     No backend is wired up, so the form composes a pre-filled email in the
     visitor's mail app. Swap the handler for Formspree/EmailJS when ready. */
  var form = document.getElementById("bookingForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.querySelector(".hp") && form.querySelector(".hp").value) return; // bot trap
      var status = document.getElementById("formStatus");
      var data = new FormData(form);
      var name = (data.get("name") || "").toString().trim();
      var email = (data.get("email") || "").toString().trim();
      var service = (data.get("service") || "").toString();
      var message = (data.get("message") || "").toString().trim();

      if (!name || !email || !message) {
        if (status) status.textContent = "Add your name, email, and a note so Renika can reply.";
        return;
      }

      var body =
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Phone: " + (data.get("phone") || "—") + "\n" +
        "Service: " + service + "\n\n" +
        message;

      window.location.href =
        "mailto:getitdonechick@gmail.com" +
        "?subject=" + encodeURIComponent("New inquiry — " + service + " — " + name) +
        "&body=" + encodeURIComponent(body);

      if (status) status.textContent = "Your email app is opening with the details filled in. Hit send and Renika will reply within one business day.";
      form.reset();
    });
  }

  /* --- Back to top -------------------------------------------------------- */
  var toTop = document.getElementById("toTop");
  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    });
  }

  /* --- Footer year --------------------------------------------------------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
