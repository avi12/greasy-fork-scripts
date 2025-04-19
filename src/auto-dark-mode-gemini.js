// ==UserScript==
// @name         Auto Dark Mode for Gemini
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Works for both desktop and mobile
// @author       Avi (https://avi12.com)
// @copyright    2025 Avi (https://avi12.com)
// @license      MIT
// @match        https://gemini.google.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gemini.google.com
// @grant        none
// ==/UserScript==


(function () {
  "use strict";

  function setDark(isDark) {
    document.body.classList.value = document.body.classList.value.replace(/(light|dark)-theme/, isDark ? "dark-theme" : "light-theme");
    localStorage.setItem("Bard-Color-Theme", isDark ? "Bard-Dark-Theme" : "Bard-Light-Theme");
  }

  new MutationObserver((_, observer) => {
    const elMenuButton = document.querySelector("[data-test-id=side-nav-menu-button]");
    if (!elMenuButton) {
      return;
    }

    observer.disconnect();
    const darkQuery = matchMedia("(prefers-color-scheme: dark)");
    setDark(darkQuery.matches);
    darkQuery.addEventListener("change", e => setDark(e.matches));
  }).observe(document, {childList: true, subtree: true});
})();
