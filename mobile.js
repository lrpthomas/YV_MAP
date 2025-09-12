(function() {
  // Ensure viewport meta for iPhone 16 and other mobiles
  var hasViewport = document.querySelector('meta[name="viewport"]');
  if (!hasViewport) {
    var meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover';
    document.head.appendChild(meta);
  }

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

