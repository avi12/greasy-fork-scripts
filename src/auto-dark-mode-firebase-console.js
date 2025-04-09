// ==UserScript==
// @name         Auto Dark Mode for Firebase Console
// @namespace    http://tampermonkey.net/
// @version      0.0
// @description  Works for desktop
// @author       Avi (https://avi12.com)
// @copyright    2025 Avi (https://avi12.com)
// @license      MIT
// @match        https://console.firebase.google.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=firebase.google.com
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  function setTheme(theme) {
    document.body.classList.value = document.body.classList.value.replace(/fire-scheme-(light|dark)/, `fire-scheme-${theme}`);
  }
  const instanceDarkTheme = matchMedia("(prefers-color-scheme: dark)");
  setTheme(instanceDarkTheme.matches ? "dark" : "light");
  instanceDarkTheme.addEventListener("change", ({ matches }) => setTheme(matches ? "dark" : "light"));
})();
