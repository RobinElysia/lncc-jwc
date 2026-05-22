/**
 * Static App - Minimal ES5 JavaScript
 * Handles navigation, article filtering, and basic interactions
 */

(function() {
  'use strict';

  // Cache DOM elements
  var app = {
    articlesCache: null,
    currentFilter: 'all',
    
    // Initialize the app
    init: function() {
      this.setActiveNav();
      this.setupEventListeners();
    },

    // Set active navigation item based on current page
    setActiveNav: function() {
      var current = window.location.pathname;
      var navLinks = document.querySelectorAll('nav a');
      
      navLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '/' && current === '/') {
          link.classList.add('active');
        } else if (link.getAttribute('href') === '/articles' && current === '/articles') {
          link.classList.add('active');
        }
      });
    },

    // Setup event listeners
    setupEventListeners: function() {
      // Filter buttons if on articles page
      var filterBtns = document.querySelectorAll('[data-filter]');
      filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          app.filterArticles(this.getAttribute('data-filter'));
        });
      });

      // Print button
      var printBtn = document.getElementById('print-article');
      if (printBtn) {
        printBtn.addEventListener('click', function(e) {
          e.preventDefault();
          window.print();
        });
      }

      // Search form if exists
      var searchForm = document.querySelector('[role="search"]');
      if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
          e.preventDefault();
          app.handleSearch(this);
        });
      }
    },

    // Filter articles by category
    filterArticles: function(category) {
      var articles = document.querySelectorAll('.article-item');
      var btns = document.querySelectorAll('[data-filter]');
      
      // Update button states
      btns.forEach(function(btn) {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === category) {
          btn.classList.add('active');
        }
      });

      // Filter articles
      articles.forEach(function(article) {
        var cat = article.getAttribute('data-category');
        if (category === 'all' || cat === category) {
          article.style.display = '';
        } else {
          article.style.display = 'none';
        }
      });

      // Update filter state
      app.currentFilter = category;
    },

    // Handle search form submission
    handleSearch: function(form) {
      var query = form.querySelector('input[type="search"]').value.trim();
      if (query) {
        // For static version, just filter visible articles
        var articles = document.querySelectorAll('.article-item');
        var found = false;
        
        articles.forEach(function(article) {
          var title = article.textContent.toLowerCase();
          if (title.indexOf(query.toLowerCase()) !== -1) {
            article.style.display = '';
            found = true;
          } else {
            article.style.display = 'none';
          }
        });
      }
    },

    // Fetch articles data
    fetchArticles: function(callback) {
      if (app.articlesCache) {
        callback(app.articlesCache);
        return;
      }

      var xhr = new XMLHttpRequest();
      xhr.open('GET', '/data/articles.json', true);
      xhr.onload = function() {
        if (xhr.status === 200) {
          try {
            app.articlesCache = JSON.parse(xhr.responseText);
            callback(app.articlesCache);
          } catch (e) {
            console.error('Failed to parse articles:', e);
          }
        }
      };
      xhr.onerror = function() {
        console.error('Failed to load articles');
      };
      xhr.send();
    },

    // Get article by slug
    getArticleBySlug: function(slug, callback) {
      app.fetchArticles(function(articles) {
        var article = articles.find(function(a) {
          return a.slug === slug;
        });
        callback(article);
      });
    },

    // Get related articles
    getRelatedArticles: function(currentSlug, limit, callback) {
      limit = limit || 6;
      app.fetchArticles(function(articles) {
        var current = articles.find(function(a) {
          return a.slug === currentSlug;
        });

        if (!current) {
          callback(articles.slice(0, limit));
          return;
        }

        var sameCategory = articles.filter(function(a) {
          return a.slug !== currentSlug && a.category === current.category;
        });

        var others = articles.filter(function(a) {
          return a.slug !== currentSlug && a.category !== current.category;
        });

        var related = sameCategory.concat(others).slice(0, limit);
        callback(related);
      });
    }
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      app.init();
    });
  } else {
    app.init();
  }

  // Expose app object globally
  window.staticApp = app;
})();
