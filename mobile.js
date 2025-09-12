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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupToolbar);
  } else {
    setupToolbar();
  }
})();

