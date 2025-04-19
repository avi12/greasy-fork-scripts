// ==UserScript==
// @name         Auto Dark Mode for Twitch
// @namespace    https://bengrant.dev
// @version      0.2
// @description  Works for desktop
// @author       Avi (https://avi12.com)
// @copyright    2025 Avi (https://avi12.com)
// @license      MIT
// @match        https://www.twitch.tv/*
// @icon         https://www.google.com/s2/favicons?domain=twitch.tv
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const darkQuery = matchMedia("(prefers-color-scheme: dark)");

  function setDark(isDark) {
    document.body.classList.value = document.body.classList.value.replace(/tw-root--theme-(light|dark)/, isDark ? "tw-root--theme-dark" : "tw-root--theme-light");
    localStorage.setItem("twilight.theme", `${isDark ? 1 : 0}`);
  }

  setDark(darkQuery.matches);
  darkQuery.addEventListener("change", e => setDark(e.matches));
})();
