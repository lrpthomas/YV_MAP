(function() {
  // Ensure viewport meta for iPhone 16 and other mobiles
  function ensureViewportMeta() {
    var meta = document.querySelector('meta[name="viewport"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover';
      document.head.appendChild(meta);
      return;
    }
    try {
      var current = meta.getAttribute('content') || '';
      var parts = current.split(',').map(function(s) { return s.trim(); }).filter(function(s) { return s.length > 0; });
      function hasToken(token) {
        var key = token.split('=')[0];
        for (var i = 0; i < parts.length; i++) {
          var p = parts[i];
          if (p.split('=')[0] === key) { return true; }
        }
        return false;
      }
      var desired = ['width=device-width','initial-scale=1','maximum-scale=1','viewport-fit=cover'];
      for (var j = 0; j < desired.length; j++) {
        if (!hasToken(desired[j])) { parts.push(desired[j]); }
      }
      meta.setAttribute('content', parts.join(', '));
    } catch (_) { /* no-op */ }
  }
  ensureViewportMeta();

  // Create a mobile toolbar and move existing action buttons into it
  function setupToolbar() {
    var selectBtn = document.getElementById('btnSelect');
    var clearBtn = document.getElementById('btnClear');
    var exportBtn = document.getElementById('btnExportSel');
    if (!selectBtn || !clearBtn || !exportBtn) return;

    // Avoid duplicating if already wrapped
    if (selectBtn.parentElement && selectBtn.parentElement.classList.contains('ym-toolbar')) return;

    var toolbar = document.createElement('div');
    toolbar.className = 'ym-toolbar';
    toolbar.appendChild(selectBtn);
    toolbar.appendChild(clearBtn);
    toolbar.appendChild(exportBtn);
    document.body.appendChild(toolbar);
  }

  // Expose the Folium-created Leaflet map as window.map for shared scripts
  function exposeLeafletMapAlias() {
    try {
      if (window.map && typeof window.map.getCenter === 'function') return;
      var candidate = null;
      // Prefer keys that match Folium's map_* naming
      for (var key in window) {
        if (!Object.prototype.hasOwnProperty.call(window, key)) continue;
        if (!/^map_[a-f0-9]+$/i.test(key)) continue;
        var val = window[key];
        if (val && (typeof val.getCenter === 'function') && (typeof val.addLayer === 'function')) { candidate = val; break; }
      }
      // Fallback: first object on window that looks like an L.Map
      if (!candidate) {
        for (var k in window) {
          if (!Object.prototype.hasOwnProperty.call(window, k)) continue;
          var v = window[k];
          if (v && (typeof v.getCenter === 'function') && (typeof v.addLayer === 'function')) { candidate = v; break; }
        }
      }
      if (candidate) { window.map = candidate; }
    } catch (_) { /* no-op */ }
  }

  function initMobile() {
    setupToolbar();
    exposeLeafletMapAlias();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobile);
  } else {
    initMobile();
  }
})();

