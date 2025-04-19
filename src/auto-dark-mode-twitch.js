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

  /**
   * @param theme {"dark" | "light"}
   */
  function setTheme(theme) {
    document.body.classList.value = document.body.classList.value.replace(/tw-root--theme-(light|dark)/, `tw-root--theme-${theme}`);
    localStorage.setItem("twilight.theme", `${theme === "dark" ? 1 : 0}`);
  }

  const darkQuery = matchMedia("(prefers-color-scheme: dark)");
  setTheme(darkQuery.matches ? "dark" : "light");
  darkQuery.addEventListener("change", e => setTheme(e.matches ? "dark" : "light"));
})();
