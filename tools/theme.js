/* Shared theme controller — dark only.
   The site and the tools use a single Tokyo Night (night) theme, defined in
   tokyo-night.css. This file only clears any light-mode choice a visitor
   saved under the old "hl7-tools-theme" key, so returning visitors land on
   the dark theme too. window.toggleTheme is kept as a no-op for any old
   caller. */
(function () {
  document.documentElement.removeAttribute('data-theme');
  try { localStorage.removeItem('hl7-tools-theme'); } catch (e) { /* storage blocked: not fatal */ }
  window.toggleTheme = function () {};
})();
