// ==UserScript==
// @name         Auto Dark Mode for Twitch
// @namespace    https://bengrant.dev
// @version      0.1
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

  function isWebPageDark() {
    return localStorage.getItem("twilight.theme") === "1";
  }

  const setIsDark = isDark => {
    if (isWebPageDark() && isDark || !isWebPageDark() && !isDark) {
      return;
    }

    const getElDarkModeToggle = () => document.querySelector("[data-a-target=dark-mode-toggle]");
    const elProfilePicture = document.querySelector("[data-a-target=user-menu-toggle]");
    const {activeElement} = document;
    if (!getElDarkModeToggle()) {
      elProfilePicture.click();
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        getElDarkModeToggle().parentElement.querySelector("label").click();
        elProfilePicture?.click();
        activeElement.focus();
      });
    });
  }


  setIsDark(darkQuery.matches);
  darkQuery.addEventListener("change", e => setIsDark(e.matches));
})();
