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

/* Shared UX helpers used by every tool and page.
   - window.uxAnnounce(msg, isError): one polite live region + toast, so copy,
     load and error feedback is visible and announced the same way everywhere.
   - Clipboard writes announce "Copied to clipboard" (or the failure).
   - Click-to-open drop zones and div tabs get keyboard support
     (role, tabindex, Enter/Space), and tabs keep aria-selected in sync. */
(function () {
  var toast, timer;
  window.uxAnnounce = function (msg, isError) {
    if (!document.body) return;
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'ux-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.toggle('err', !!isError);
    toast.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(function () { toast.classList.remove('show'); }, 1800);
  };

  var cb = navigator.clipboard;
  if (cb && cb.writeText && !cb.__ux) {
    var orig = cb.writeText.bind(cb);
    try {
      cb.writeText = function (t) {
        return orig(t).then(function (r) { if (typeof window.showToast !== 'function') window.uxAnnounce('Copied to clipboard'); return r; },
          function (e) { window.uxAnnounce('Copy failed: select the text and press Ctrl/Cmd+C', true); throw e; });
      };
      cb.__ux = true;
    } catch (e) { /* read-only in some browsers: tools keep their own feedback */ }
  }

  function activateOnKeys(el) {
    el.addEventListener('keydown', function (e) {
      if ((e.key === 'Enter' || e.key === ' ') && e.target === el) { e.preventDefault(); el.click(); }
    });
  }
  function enhance() {
    document.querySelectorAll('.drop-zone[onclick], .upload-zone[onclick], .reader-drop[onclick]').forEach(function (el) {
      if (el.hasAttribute('tabindex')) return;
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      var t = el.querySelector('[class*="title"], [class*="text"]');
      if (t) el.setAttribute('aria-label', t.textContent.trim());
      activateOnKeys(el);
    });
    document.querySelectorAll('div.tab[onclick], div.log-tab[onclick]').forEach(function (el) {
      if (el.hasAttribute('tabindex')) return;
      if (el.parentElement) el.parentElement.setAttribute('role', 'tablist');
      el.setAttribute('role', 'tab');
      el.setAttribute('tabindex', '0');
      var sync = function () { el.setAttribute('aria-selected', el.classList.contains('active') ? 'true' : 'false'); };
      sync();
      new MutationObserver(sync).observe(el, { attributes: true, attributeFilter: ['class'] });
      activateOnKeys(el);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', enhance);
  else enhance();
})();

/* Mobile: a table wider than its container scrolls inside its own
   .tn-scroll box instead of widening the whole page. Only tables that
   actually overflow and have no scrolling ancestor are wrapped; tables
   rendered later (results, tag lists) are picked up by a MutationObserver. */
(function () {
  function scrolls(el) {
    for (var p = el.parentElement; p && p !== document.body; p = p.parentElement) {
      var o = getComputedStyle(p).overflowX;
      if (o === 'auto' || o === 'scroll' || o === 'hidden' || o === 'clip') return true;
    }
    return false;
  }
  function wrapWide() {
    var vw = document.documentElement.clientWidth;
    document.querySelectorAll('table').forEach(function (t) {
      if (t.parentElement && t.parentElement.classList.contains('tn-scroll')) return;
      var r = t.getBoundingClientRect();
      if (r.width === 0 || r.right <= vw + 1 || scrolls(t)) return;
      var w = document.createElement('div');
      w.className = 'tn-scroll';
      t.parentNode.insertBefore(w, t);
      w.appendChild(t);
    });
  }
  var pending = false;
  function schedule() {
    if (pending) return; pending = true;
    requestAnimationFrame(function () { pending = false; wrapWide(); });
  }
  function start() {
    wrapWide();
    new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
    window.addEventListener('resize', schedule);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
