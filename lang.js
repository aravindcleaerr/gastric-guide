(function() {
  // Detect current page language from URL
  var path = window.location.pathname;
  var filename = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  var isKannada = filename.indexOf('-kn.html') !== -1 || filename === 'index-kn.html';
  var currentLang = isKannada ? 'kn' : 'en';

  // Get saved language preference
  var savedLang = localStorage.getItem('gutwise-lang');

  // If user has a saved preference and it doesn't match current page, redirect
  if (savedLang && savedLang !== currentLang) {
    var newUrl;
    if (savedLang === 'kn') {
      // Convert English URL to Kannada
      if (filename === 'index.html' || filename === '') {
        newUrl = 'index-kn.html';
      } else {
        newUrl = filename.replace('.html', '-kn.html');
      }
    } else {
      // Convert Kannada URL to English
      if (filename === 'index-kn.html') {
        newUrl = 'index.html';
      } else {
        newUrl = filename.replace('-kn.html', '.html');
      }
    }
    window.location.replace(newUrl);
    return;
  }

  // Save current language as preference (first visit or matching page)
  if (!savedLang) {
    localStorage.setItem('gutwise-lang', currentLang);
  }

  // Handle language switcher click - save preference
  document.addEventListener('click', function(e) {
    var target = e.target.closest('.lang-switch');
    if (target) {
      var href = target.getAttribute('href');
      var newLang = (href.indexOf('-kn.html') !== -1 || href === 'index-kn.html') ? 'kn' : 'en';
      localStorage.setItem('gutwise-lang', newLang);
    }
  });

  // Helper function to convert URL to correct language version
  function convertUrl(url, targetLang) {
    // Skip external links
    if (url.indexOf('://') !== -1 || url.indexOf('mailto:') === 0 || url.indexOf('tel:') === 0) {
      return url;
    }
    // Skip anchor links
    if (url.indexOf('#') === 0) {
      return url;
    }

    var file = url.split('#')[0].split('?')[0];
    var hash = url.indexOf('#') !== -1 ? url.substring(url.indexOf('#')) : '';
    var query = url.indexOf('?') !== -1 ? url.substring(url.indexOf('?'), url.indexOf('#') !== -1 ? url.indexOf('#') : url.length) : '';

    // Skip non-html files
    if (file && !file.endsWith('.html') && file !== '' && file !== './') {
      return url;
    }

    var isUrlKannada = file.indexOf('-kn.html') !== -1 || file === 'index-kn.html';

    if (targetLang === 'kn' && !isUrlKannada) {
      // Convert to Kannada
      if (file === 'index.html' || file === '' || file === './') {
        return 'index-kn.html' + query + hash;
      }
      return file.replace('.html', '-kn.html') + query + hash;
    } else if (targetLang === 'en' && isUrlKannada) {
      // Convert to English
      if (file === 'index-kn.html') {
        return 'index.html' + query + hash;
      }
      return file.replace('-kn.html', '.html') + query + hash;
    }

    return url;
  }

  // Intercept all internal link clicks to maintain language preference
  document.addEventListener('click', function(e) {
    var link = e.target.closest('a');
    if (!link) return;

    // Skip language switcher (already handled above)
    if (link.classList.contains('lang-switch')) return;

    var href = link.getAttribute('href');
    if (!href) return;

    // Skip external links, anchors, and special protocols
    if (href.indexOf('://') !== -1 || href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0 || href.indexOf('#') === 0) {
      return;
    }

    var preferredLang = localStorage.getItem('gutwise-lang') || currentLang;
    var convertedUrl = convertUrl(href, preferredLang);

    if (convertedUrl !== href) {
      e.preventDefault();
      window.location.href = convertedUrl;
    }
  });
})();
