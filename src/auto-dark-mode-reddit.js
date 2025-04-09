// ==UserScript==
// @name         Auto Dark Mode for Reddit
// @namespace    https://bengrant.dev
// @version      0.0
// @description  Works for desktop
// @author       Avi (https://avi12.com)
// @copyright    2025 Avi (https://avi12.com)
// @license      MIT
// @match        https://www.reddit.com/*
// @icon         https://www.google.com/s2/favicons?domain=reddit.com
// @grant        none
// ==/UserScript==

(function() {
  "use strict";

  const darkQuery = matchMedia('(prefers-color-scheme: dark)');
  const selMenuButton = "#expand-user-drawer-button";

  function isWebPageDark() {
    return document.cookie.match(/theme=(\d)/)[1] === "2";
  }

  function isThemeNeedsToStay(isDark = darkQuery.matches) {
    return isWebPageDark() && isDark || !isWebPageDark() && !isDark;
  }

  async function toggleTheme() {
    const { activeElement } = document;
    const elMenuButton = document.querySelector(selMenuButton);
    elMenuButton.click();


    let isKeepTogglingDarkMode = true;
    new MutationObserver((_, observer) => {
      const isDark = document.documentElement.classList.contains("theme-dark");
      if (isThemeNeedsToStay(isDark)) {
        observer.disconnect();
        isKeepTogglingDarkMode = false;
        elMenuButton.click();
        activeElement.focus();
      }
    }).observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    do {
      const elDarkModeToggle = document.querySelector("[name=darkmode-switch-name]");
      elDarkModeToggle?.click();
      await new Promise(resolve => setTimeout(resolve, 100));
    } while(isKeepTogglingDarkMode);
  }

  new MutationObserver((_, observer) => {
    const elMenuButton = document.querySelector(selMenuButton);
    if (!elMenuButton) {
      return;
    }

    observer.disconnect();
    if (!isThemeNeedsToStay()) {
      toggleTheme();
    }
  }).observe(document, { childList: true, subtree: true });

  darkQuery.addEventListener("change", toggleTheme);
})();
