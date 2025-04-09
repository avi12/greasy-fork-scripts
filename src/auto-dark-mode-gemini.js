// ==UserScript==
// @name         Auto Dark Mode for Gemini
// @namespace    http://tampermonkey.net/
// @version      0.1
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

  const darkQuery = matchMedia("(prefers-color-scheme: dark)");
  const OBSERVER_SUBTREE_OPTIONS = {childList: true, subtree: true};

  function isWebPageDark() {
    return localStorage.getItem("Bard-Color-Theme") === "Bard-Dark-Theme";
  }

  function isDesktop() {
    return Boolean(document.querySelector("[data-test-id=desktop-settings-control]"));
  }

  function isThemeNeedsToStay(isDark = darkQuery.matches) {
    return isWebPageDark() && isDark || !isWebPageDark() && !isDark;
  }

  async function toggleTheme(isDesktop) {
    const elBackdrop = () => document.querySelector(".cdk-overlay-backdrop");
    if (isDesktop) {
      const elSettingsButton = document.querySelector("[data-test-id=desktop-settings-control] button");
      elSettingsButton.click();
      const elMenuButton = document.querySelector("[data-test-id=side-nav-menu-button]");
      elMenuButton.click();
      const elDarkModeToggle = document.querySelector("[data-test-id=bard-dark-theme-toggle]");
      elDarkModeToggle.click();
      elBackdrop().click();
      return;
    }

    let isKeepTogglingSidebar = true;
    // noinspection CssInvalidHtmlTagReference
    const elSidebar = document.querySelector("mat-sidenav-content");

    new MutationObserver(async (_, observerSidebar) => {
      isKeepTogglingSidebar = false;
      observerSidebar.disconnect();
      let isKeepTogglingSettings = true;
      new MutationObserver((_, observerSettings) => {
        const elSettingsMenu = document.querySelector(".cdk-overlay-container");
        if (elSettingsMenu) {
          isKeepTogglingSettings = false;
          observerSettings.disconnect();
        }

        const elDarkModeToggle = document.querySelector("button[aria-checked]");
        elDarkModeToggle.click();
        elBackdrop().click();
      }).observe(document, OBSERVER_SUBTREE_OPTIONS);

      const elSettingsButton = document.querySelector("[data-test-id=mobile-settings-control]");
      while (isKeepTogglingSettings) {
        elSettingsButton.click();
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }).observe(elSidebar, {attributes: true, attributeFilter: ["aria-hidden"]});

    const elMenuButton = document.querySelector("[data-test-id=side-nav-menu-button]");
    while (isKeepTogglingSidebar) {
      elMenuButton.click();
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  new MutationObserver((_, observer) => {
    const elMenuButton = document.querySelector("[data-test-id=side-nav-menu-button]");
    if (!elMenuButton) {
      return;
    }

    observer.disconnect();
    if (!isThemeNeedsToStay()) {
      toggleTheme(isDesktop());
    }
  }).observe(document, OBSERVER_SUBTREE_OPTIONS);

  darkQuery.addEventListener("change", () => toggleTheme(isDesktop()));
})();
