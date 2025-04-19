// ==UserScript==
// @name         Auto Dark Mode for Reddit
// @namespace    https://bengrant.dev
// @version      0.2
// @description  Works for desktop
// @author       Avi (https://avi12.com)
// @copyright    2025 Avi (https://avi12.com)
// @license      MIT
// @match        https://www.reddit.com/*
// @icon         https://www.google.com/s2/favicons?domain=reddit.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  /**
   * @param theme {"dark" | "light"}
   */
  function setTheme(theme) {
    document.body.classList.value = document.body.classList.value.replace(/theme-(dark|light)/, `theme-${theme}`);
    document.cookie = `theme=${theme === "dark" ? 2 : 1};`;
  }

  const darkQuery = matchMedia("(prefers-color-scheme: dark)");
  setTheme(darkQuery.matches ? "dark" : "light");
  darkQuery.addEventListener("change", e => setTheme(e.matches ? "dark" : "light"));
})();
