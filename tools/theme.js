/* Shared theme controller (parity with coffeemilktea.github.io/tools/theme.js)
   ─────────────────────────────────────────────────────────────────────
   Sets data-theme="light" on <html> before first paint so the page never
   flashes the wrong palette, exposes window.toggleTheme(), and wires up a
   #btn-theme button if the page has one.

   The choice persists to the localStorage key "hl7-tools-theme", which is
   shared with the landing page — a visitor's choice follows them between
   repos. Palette tokens themselves still live in tools/theme.css here
   (landing uses /assets/tokens.css). Storage can throw in a hardened
   browser (site data blocked, sandboxed iframe), so every access is
   guarded and the page falls back to dark. The theme button gets an
   aria-label that tracks the next mode.
   ───────────────────────────────────────────────────────────────────── */
(function () {
  const STORAGE_KEY = 'hl7-tools-theme';

  function read() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function write(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) { /* not fatal */ }
  }

  /* Apply the saved theme immediately — before paint — to prevent a flash */
  if (read() === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  function getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  }

  function syncBtn(btn, theme) {
    if (!btn) return;
    const icon  = btn.querySelector('.theme-icon');
    const label = btn.querySelector('.theme-label');
    if (icon)  icon.textContent  = theme === 'dark' ? '☀️' : '🌙';
    if (label) label.textContent = theme === 'dark' ? 'Light' : 'Dark';
    btn.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    btn.setAttribute('aria-label', btn.title);
  }

  window.toggleTheme = function () {
    const next = getTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    write(next);
    syncBtn(document.getElementById('btn-theme'), next);
  };

  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('btn-theme');
    if (btn) {
      btn.addEventListener('click', window.toggleTheme);
      syncBtn(btn, getTheme());
    }
  });
})();
