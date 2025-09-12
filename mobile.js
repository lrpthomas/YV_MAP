(function() {
  // Ensure viewport meta for iPhone 16 and other mobiles
  var hasViewport = document.querySelector('meta[name="viewport"]');
  if (!hasViewport) {
    var meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover';
    document.head.appendChild(meta);
  } else {
    // Normalize existing viewport to include viewport-fit=cover and width=device-width
    try {
      var content = hasViewport.getAttribute('content') || '';
      var parts = content.split(',');
      var map = {};
      for (var i = 0; i < parts.length; i++) {
        var seg = parts[i].trim();
        if (!seg) continue;
        var eq = seg.indexOf('=');
        if (eq === -1) { map[seg.toLowerCase()] = 'true'; continue; }
        var key = seg.slice(0, eq).trim().toLowerCase();
        var val = seg.slice(eq + 1).trim();
        map[key] = val;
      }
      if (!('viewport-fit' in map)) { map['viewport-fit'] = 'cover'; }
      if (!('width' in map)) { map['width'] = 'device-width'; }
      var orderedKeys = ['width', 'initial-scale', 'maximum-scale', 'minimum-scale', 'user-scalable', 'viewport-fit'];
      var finalKeys = [];
      for (var j = 0; j < orderedKeys.length; j++) { if (orderedKeys[j] in map) finalKeys.push(orderedKeys[j]); }
      for (var k in map) { if (Object.prototype.hasOwnProperty.call(map, k) && finalKeys.indexOf(k) === -1) finalKeys.push(k); }
      var rebuilt = [];
      for (var m = 0; m < finalKeys.length; m++) { rebuilt.push(finalKeys[m] + '=' + map[finalKeys[m]]); }
      hasViewport.setAttribute('content', rebuilt.join(', '));
    } catch (_) { /* no-op */ }
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

