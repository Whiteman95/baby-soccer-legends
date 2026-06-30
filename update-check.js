// Auto-update redirect: fetches version.txt (always fresh via cache-busted URL),
// compares to the ?v= query param on the current URL, and redirects to
// ?v=<new_stamp> if the build changed. The new URL is not in Safari's cache, so
// GitHub Pages serves it fresh — no "Clear History and Website Data" needed.
(function () {
  var urlV = new URLSearchParams(location.search).get('v');
  fetch('version.txt?cb=' + Date.now())
    .then(function (r) { return r.text(); })
    .then(function (v) {
      v = v.trim();
      if (v && v !== urlV) {
        // New build available — redirect to a cache-busting URL so the browser
        // fetches fresh HTML (and therefore fresh index.js/pck/wasm too).
        location.replace(location.pathname + '?v=' + v);
      }
    })
    .catch(function () { /* offline or fetch blocked — just run the cached build */ });
}());
