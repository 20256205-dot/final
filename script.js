// SkillSwap Baguio: basic JavaScript (menu toggle, skill filter, form messages)
(function () {
  'use strict';

  // Tell the CSS that JavaScript is running
  document.documentElement.classList.add('js');

  // 1. Menu toggle for small screens
  var nav = document.querySelector('.site-nav');
  var inner = document.querySelector('.header-inner');
  if (nav && inner) {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'menu-toggle';
    button.textContent = 'Menu';
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', 'site-nav');
    nav.id = 'site-nav';
    inner.insertBefore(button, nav);

    button.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      button.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Press Escape to close the menu
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        button.setAttribute('aria-expanded', 'false');
        button.focus();
      }
    });
  }

  // 2. Skill filter on the Skills page
  var filter = document.getElementById('skill-filter');
  if (filter) {
    var items = document.querySelectorAll('.filter-item');
    var count = document.getElementById('filter-count');
    var none = document.getElementById('no-results');

    filter.addEventListener('input', function () {
      var term = filter.value.trim().toLowerCase();
      var shown = 0;
      items.forEach(function (item) {
        var match = item.textContent.toLowerCase().indexOf(term) !== -1;
        item.hidden = !match;
        if (match) { shown++; }
      });
      none.hidden = shown !== 0;
      count.textContent = term ? shown + ' group(s) found.' : '';
    });

    // Stop the search form from reloading the page
    filter.form.addEventListener('submit', function (event) { event.preventDefault(); });
  }

  // 3. Demo forms: check the fields, then show a friendly message
  var forms = document.querySelectorAll('form[data-demo]');
  forms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var status = form.querySelector('.form-status');
      if (status) { status.textContent = form.getAttribute('data-demo'); }
      form.reset();
    });
  });
})();
