/* 主脚本 —— 纯 ES5
   负责通用组件（顶部条/头部/导航/页脚）渲染、首页区块、列表页与详情页。
   按页面通过 data-page 属性判断渲染逻辑。 */
(function () {
  'use strict';

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };

  /* HTML 转义 */
  function esc(s) {
    if (s == null) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* 生成图标引用（基于 sprite） */
  function icon(id, cls) {
    cls = cls || 'icon';
    return '<svg class="' + cls + '" aria-hidden="true"><use href="images/icons.svg#' + id + '"></use></svg>';
  }

  /* 类型样式映射 */
  function fileTypeClass(t) {
    if (t === 'PDF') return 'type-pdf';
    if (t === 'DOC') return 'type-doc';
    return 'type-xls';
  }
  function categoryClass(cat) {
    if (cat === '教学通知') return 'cat-teaching';
    if (cat === '调停课') return 'cat-rest';
    return 'cat-default';
  }

  /* ========== 顶部条 ========== */
  function renderTopBar() {
    var host = $('#top-bar');
    if (!host) return;
    var d = new Date();
    var weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    var dateStr = d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日 ' + weekdays[d.getDay()];

    host.innerHTML =
      '<div class="top-bar-inner">' +
        '<div class="top-bar-left">' +
          '<span>欢迎访问辽宁省交通高等专科学校教务处</span>' +
          '<span class="top-bar-sep top-bar-date">|</span>' +
          '<time class="top-bar-date">今天是 ' + esc(dateStr) + '</time>' +
        '</div>' +
        '<nav class="top-bar-aux" aria-label="辅助导航">' +
          '<a href="https://www.lncc.edu.cn/">交专首页</a>' +
          '<span class="top-bar-sep">|</span>' +
          '<a href="#">设为首页</a>' +
          '<span class="top-bar-sep">|</span>' +
          '<a href="#">加入收藏</a>' +
          '<span class="top-bar-sep">|</span>' +
          '<a href="#" class="inline-flex">English ' + icon('i-chev-right', 'icon icon-xs') + '</a>' +
        '</nav>' +
      '</div>';
  }

  /* ========== 站点头部 banner ========== */
  function renderSiteHeader() {
    var host = $('#site-header');
    if (!host) return;
    host.innerHTML =
      '<div class="banner">' +
        '<img class="banner-img" src="images/nybanner.png" alt="辽宁省交通高等专科学校校园主楼远景">' +
        '<div class="banner-overlay" aria-hidden="true"></div>' +
        '<div class="banner-inner">' +
          '<div class="banner-brand">' +
            '<div class="banner-logo">' +
              '<img src="images/logo.png" alt="辽宁省交通高等专科学校校徽">' +
            '</div>' +
            '<div>' +
              '<h1 class="banner-title font-serif">辽宁省交通高等专科学校' +
                '<span class="banner-title-sub">教 务 处</span>' +
              '</h1>' +
              '<p class="banner-en">ACADEMIC AFFAIRS OFFICE · LIAONING PROVINCIAL COLLEGE OF COMMUNICATIONS</p>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<form class="banner-search" role="search" onsubmit="return false;">' +
          '<span class="icon-wrap">' + icon('i-search', 'icon icon-sm') + '</span>' +
          '<label for="site-search" class="sr-only">站内检索</label>' +
          '<input id="site-search" type="search" placeholder="站内检索：通知 / 表格 / 系统">' +
          '<button type="submit">检索</button>' +
        '</form>' +
      '</div>';
  }

  /* ========== 主导航 ========== */
  function renderSiteNav(currentHref) {
    var host = $('#site-nav');
    if (!host) return;
    var items = window.SITE.navItems;
    var html = '<ul class="site-nav-list">';
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      var isCurrent = it.internal && it.href === currentHref;
      var cls = 'site-nav-link' + (isCurrent ? ' is-current' : '');
      var attrs = it.internal
        ? (isCurrent ? ' aria-current="page"' : '')
        : ' target="_blank" rel="noopener noreferrer"';
      html += '<li>' +
        '<a class="' + cls + '" href="' + esc(it.href) + '"' + attrs + '>' +
          '<span class="label">' + esc(it.label) + '</span>' +
          (it.internal ? '' : icon('i-ext', 'ext-icon')) +
        '</a></li>';
    }
    html += '</ul>';
    host.innerHTML = '<div class="container" style="padding:0;">' + html + '</div>';
  }

  /* ========== 页脚 ========== */
  function renderFooter() {
    var host = $('#site-footer');
    if (!host) return;
    host.innerHTML =
      '<div class="site-footer-overlay" aria-hidden="true"></div>' +
      '<div class="site-footer-inner">' +
        '<div class="site-footer-logo">' +
          '<img src="images/main-logo.png" alt="辽宁省交通高等专科学校" width="435" height="89">' +
        '</div>' +
        '<div class="site-footer-info">' +
          '<p>地址：辽宁省沈阳市沈北新区建设南一路5号，110122</p>' +
          '<p>招生电话：89708729 / 就业电话：89715595</p>' +
          '<p class="copyright font-serif">Copyright @ 2010 辽宁省交通高等专科学校教务处 All Rights Reserved.</p>' +
          '<p>辽宁交专信息技术中心 技术支持。</p>' +
        '</div>' +
      '</div>';
  }

  /* ========== 区块标题 ========== */
  function sectionHead(title, subtitle, href) {
    return '<div class="section-head">' +
      '<div class="section-head-left">' +
        '<h2 class="section-head-title">' + esc(title) + '</h2>' +
        '<span class="section-head-sub">' + esc(subtitle) + '</span>' +
      '</div>' +
      '<a class="section-head-more" href="' + esc(href || 'articles.html') + '">查看更多' +
        icon('i-chev-right', 'icon icon-xs') +
      '</a>' +
    '</div>';
  }

  /* ========== 首页：教学信息 ========== */
  function renderTeaching() {
    var host = $('#section-teaching');
    if (!host) return;
    var teachingCats = ['教学通知', '课程安排', '调停课', '教学运行', '教材课程'];
    var arts = window.SITE.articles;
    var notices = [];
    for (var i = 0; i < arts.length && notices.length < 7; i++) {
      var a = arts[i];
      for (var j = 0; j < teachingCats.length; j++) {
        if (a.category === teachingCats[j]) { notices.push(a); break; }
      }
    }
    var html = sectionHead('教学信息', 'TEACHING NOTICES', 'articles.html?cat=' + encodeURIComponent('教学通知'));
    html += '<ul class="notice-list">';
    for (var k = 0; k < notices.length; k++) {
      var n = notices[k];
      var isNew = k < 2;
      html += '<li><a class="notice-link" href="detail.html?slug=' + encodeURIComponent(n.slug) + '">' +
        '<span class="notice-cat ' + categoryClass(n.category) + '">' + esc(n.category) + '</span>' +
        '<span class="notice-title">' + esc(n.title) + '</span>' +
        (isNew ? '<span class="notice-new">NEW</span>' : '') +
        '<time class="notice-date">' + esc(n.date) + '</time>' +
      '</a></li>';
    }
    html += '</ul>';
    host.innerHTML = html;
  }

  /* ========== 首页：考务信息 ========== */
  function renderExam() {
    var host = $('#section-exam');
    if (!host) return;
    var quick = window.SITE.quickEntries;
    var html = sectionHead('考务信息', 'EXAMINATION', 'articles.html?cat=' + encodeURIComponent('考务通知'));

    html += '<div class="quick-grid">';
    for (var i = 0; i < quick.length; i++) {
      var q = quick[i];
      html += '<a class="quick-item" href="#">' +
        '<span class="quick-icon">' + icon(q.icon, 'icon icon-lg') + '</span>' +
        '<span class="quick-text">' +
          '<span class="quick-label">' + esc(q.label) + '</span>' +
          '<span class="quick-desc">' + esc(q.desc) + '</span>' +
        '</span>' +
      '</a>';
    }
    html += '</div>';

    var arts = window.SITE.articles;
    var notices = [];
    for (var j = 0; j < arts.length && notices.length < 4; j++) {
      if (arts[j].category === '考务通知') notices.push(arts[j]);
    }
    html += '<ul class="exam-list">';
    for (var k = 0; k < notices.length; k++) {
      var n = notices[k];
      html += '<li><a class="exam-link" href="detail.html?slug=' + encodeURIComponent(n.slug) + '">' +
        '<span class="exam-dot" aria-hidden="true"></span>' +
        '<span class="notice-title">' + esc(n.title) + '</span>' +
        '<time class="notice-date">' + esc(n.date) + '</time>' +
      '</a></li>';
    }
    html += '</ul>';
    host.innerHTML = html;
  }

  /* ========== 首页：人才培养 ========== */
  function renderTalent() {
    var host = $('#section-talent');
    if (!host) return;
    var items = window.SITE.talentItems;
    var html = sectionHead('人才培养', 'TALENT CULTIVATION', '#');
    html += '<div class="talent-grid">';
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      html += '<a class="talent-card" href="#">' +
        '<span class="talent-no">' + esc(it.no) + '</span>' +
        '<h3 class="talent-title font-serif">' + esc(it.title) + '</h3>' +
        '<p class="talent-desc">' + esc(it.desc) + '</p>' +
        '<span class="talent-more">进入栏目' + icon('i-chev-right', 'icon icon-xs') + '</span>' +
      '</a>';
    }
    html += '</div>';
    host.innerHTML = html;
  }

  /* ========== 首页：资料下载 ========== */
  function renderDownload() {
    var host = $('#section-download');
    if (!host) return;
    var files = window.SITE.downloads;
    var html = sectionHead('资料下载', 'DOWNLOADS', '#');
    html += '<div class="download-table">' +
      '<div class="download-thead">' +
        '<span>类型</span><span>文件名称</span><span>所属分类</span>' +
        '<span style="text-align:right;">大小</span>' +
        '<span style="text-align:right;">更新日期</span>' +
        '<span style="text-align:right;">操作</span>' +
      '</div>' +
      '<ul class="download-list">';
    for (var i = 0; i < files.length; i++) {
      var f = files[i];
      html += '<li class="download-row">' +
        '<span class="file-type ' + fileTypeClass(f.type) + '">' + esc(f.type) + '</span>' +
        '<span class="file-name">' +
          '<span class="file-name-text">' + esc(f.name) + '</span>' +
          '<span class="file-meta-mobile">' + esc(f.category) + ' · ' + esc(f.size) + ' · ' + esc(f.date) + '</span>' +
        '</span>' +
        '<span class="file-cell-md">' + esc(f.category) + '</span>' +
        '<span class="file-cell-md file-cell-num">' + esc(f.size) + '</span>' +
        '<time class="file-cell-md file-cell-num">' + esc(f.date) + '</time>' +
        '<a class="btn-download" href="#" aria-label="下载 ' + esc(f.name) + '">' +
          icon('i-dl', 'icon icon-sm') + '下载' +
        '</a>' +
      '</li>';
    }
    html += '</ul></div>';
    host.innerHTML = html;
  }

  /* ========== 列表页 ========== */
  function renderListPage() {
    var host = $('#list-content');
    if (!host) return;

    var arts = window.SITE.articles;
    var cats = ['全部', '教学通知', '课程安排', '调停课', '教学运行', '教材课程', '考务通知'];

    /* 取 URL 参数 */
    var qs = window.location.search;
    var current = '全部';
    var m = qs.match(/[?&]cat=([^&]+)/);
    if (m) {
      try { current = decodeURIComponent(m[1]); } catch (e) {}
    }

    function build(activeCat) {
      var html = '<div class="list-page-head">' +
        '<h1 class="list-page-title">通知公告</h1>' +
        '<a class="section-head-more" href="index.html">返回首页' + icon('i-chev-right', 'icon icon-xs') + '</a>' +
      '</div>';

      html += '<div class="cat-tabs" role="tablist">';
      for (var i = 0; i < cats.length; i++) {
        var c = cats[i];
        var isActive = c === activeCat;
        html += '<button class="cat-tab' + (isActive ? ' is-active' : '') + '" data-cat="' + esc(c) + '" role="tab" aria-selected="' + isActive + '">' + esc(c) + '</button>';
      }
      html += '</div>';

      var filtered = activeCat === '全部'
        ? arts.slice()
        : (function () {
            var r = [];
            for (var i = 0; i < arts.length; i++) if (arts[i].category === activeCat) r.push(arts[i]);
            return r;
          })();

      if (filtered.length === 0) {
        html += '<div class="list-empty">该分类暂无文章。</div>';
      } else {
        html += '<ul class="list-articles">';
        for (var j = 0; j < filtered.length; j++) {
          var a = filtered[j];
          html += '<li><a class="list-row" href="detail.html?slug=' + encodeURIComponent(a.slug) + '">' +
            '<span class="notice-cat ' + categoryClass(a.category) + '">' + esc(a.category) + '</span>' +
            '<span class="list-title">' + esc(a.title) + '</span>' +
            '<time class="notice-date">' + esc(a.date) + '</time>' +
          '</a></li>';
        }
        html += '</ul>';
      }
      host.innerHTML = html;

      /* 绑定分类按钮 */
      var btns = host.querySelectorAll('.cat-tab');
      for (var k = 0; k < btns.length; k++) {
        btns[k].addEventListener('click', function (e) {
          var cat = this.getAttribute('data-cat');
          /* 更新 URL（不刷新） */
          var newUrl = 'articles.html' + (cat === '全部' ? '' : '?cat=' + encodeURIComponent(cat));
          if (window.history && window.history.replaceState) {
            window.history.replaceState(null, '', newUrl);
          }
          build(cat);
        });
      }
    }

    build(current);
  }

  /* ========== 详情页 ========== */
  function renderDetailPage() {
    var host = $('#detail-content');
    if (!host) return;

    var qs = window.location.search;
    var slug = '';
    var m = qs.match(/[?&]slug=([^&]+)/);
    if (m) {
      try { slug = decodeURIComponent(m[1]); } catch (e) {}
    }

    var article = window.SITE.getArticleBySlug(slug);
    if (!article) {
      host.innerHTML = '<div class="list-empty" style="padding:80px 0;">文章未找到，<a href="index.html" style="color:var(--primary);text-decoration:underline;">返回首页</a>。</div>';
      var bc = $('#breadcrumb-current');
      if (bc) bc.textContent = '文章未找到';
      document.title = '文章未找到 - 辽宁省交通高等专科学校 教务处';
      return;
    }

    /* 更新页签标题与面包屑 */
    document.title = article.title + ' - 辽宁省交通高等专科学校 教务处';
    var bcCat = $('#breadcrumb-cat');
    var bcTitle = $('#breadcrumb-current');
    if (bcCat) bcCat.textContent = article.category;
    if (bcTitle) bcTitle.textContent = article.title;

    /* 渲染正文块 */
    var body = '';
    for (var i = 0; i < article.content.length; i++) {
      var b = article.content[i];
      if (b.type === 'h') {
        body += '<h2 class="prose-h font-serif">' + esc(b.text) + '</h2>';
      } else if (b.type === 'p') {
        body += '<p class="prose-p">' + esc(b.text) + '</p>';
      } else if (b.type === 'ul') {
        body += '<ul class="prose-ul">';
        for (var j = 0; j < b.items.length; j++) body += '<li>' + esc(b.items[j]) + '</li>';
        body += '</ul>';
      } else if (b.type === 'ol') {
        body += '<ol class="prose-ol">';
        for (var k = 0; k < b.items.length; k++) body += '<li>' + esc(b.items[k]) + '</li>';
        body += '</ol>';
      } else if (b.type === 'quote') {
        body += '<blockquote class="prose-quote">' + esc(b.text) + '</blockquote>';
      }
    }

    /* 附件 */
    var attHtml = '';
    if (article.attachments && article.attachments.length) {
      attHtml = '<section class="attachments" aria-labelledby="attachments-heading">' +
        '<h2 id="attachments-heading" class="attachments-head font-serif">' +
          icon('i-clip2', 'icon icon-sm') + '附件下载' +
        '</h2>' +
        '<ul class="attachments-list">';
      for (var a = 0; a < article.attachments.length; a++) {
        var f = article.attachments[a];
        attHtml += '<li><div class="att-row">' +
          '<span class="file-type ' + fileTypeClass(f.type) + '">' + esc(f.type) + '</span>' +
          '<span class="att-name">' +
            '<span class="att-name-text">' + esc(f.name) + '</span>' +
            '<span class="att-size">' + esc(f.size) + '</span>' +
          '</span>' +
          '<a class="att-btn" href="#" aria-label="下载 ' + esc(f.name) + '">' +
            icon('i-dl', 'icon icon-sm') + '下载' +
          '</a>' +
        '</div></li>';
      }
      attHtml += '</ul></section>';
    }

    /* 上下篇 */
    var adj = window.SITE.getAdjacentArticles(slug);
    var adjHtml = '<nav class="adjacent" aria-label="文章翻页">';
    if (adj.prev) {
      adjHtml += '<a class="adj-link" href="detail.html?slug=' + encodeURIComponent(adj.prev.slug) + '">' +
        icon('i-arr-l', 'icon icon-sm') +
        '<span class="adj-text">' +
          '<span class="adj-label">上一篇</span>' +
          '<span class="adj-title">' + esc(adj.prev.title) + '</span>' +
        '</span>' +
      '</a>';
    } else {
      adjHtml += '<span class="adj-empty">已经是第一篇</span>';
    }
    if (adj.next) {
      adjHtml += '<a class="adj-link right" href="detail.html?slug=' + encodeURIComponent(adj.next.slug) + '">' +
        '<span class="adj-text">' +
          '<span class="adj-label">下一篇</span>' +
          '<span class="adj-title">' + esc(adj.next.title) + '</span>' +
        '</span>' +
        icon('i-arr-r', 'icon icon-sm') +
      '</a>';
    } else {
      adjHtml += '<span class="adj-empty right">已经是最后一篇</span>';
    }
    adjHtml += '</nav>';

    /* 主文章卡片 */
    var html =
      '<article class="article-card">' +
        '<header class="article-head">' +
          '<span class="article-cat">' + esc(article.category) + '</span>' +
          '<h1 class="article-title font-serif">' + esc(article.title) + '</h1>' +
          '<p class="article-summary">' + esc(article.summary) + '</p>' +
          '<div class="article-meta-wrap">' +
            '<ul class="article-meta">' +
              '<li>' + icon('i-cal', 'icon icon-sm') + '<time class="font-mono">' + esc(article.date) + '</time></li>' +
              '<li>' + icon('i-user', 'icon icon-sm') + '作者：' + esc(article.author) + '</li>' +
              '<li>' + icon('i-build', 'icon icon-sm') + '来源：' + esc(article.source) + '</li>' +
              '<li>' + icon('i-eye', 'icon icon-sm') + '浏览：<span class="font-mono">' + esc(article.views.toLocaleString()) + '</span></li>' +
            '</ul>' +
          '</div>' +
        '</header>' +
        '<div class="article-content">' +
          body +
          attHtml +
          '<div class="article-actions">' +
            '<span>本文责任编辑：' + esc(article.author) + ' · 发布于 ' + esc(article.date) + '</span>' +
            '<div class="article-actions-btns">' +
              '<a class="btn-soft" href="index.html">' + icon('i-arr-l', 'icon icon-sm') + '返回首页</a>' +
              '<button class="btn-soft" type="button" id="btn-print">' + icon('i-print', 'icon icon-sm') + '打印</button>' +
            '</div>' +
          '</div>' +
          adjHtml +
        '</div>' +
      '</article>';

    /* 侧边栏 */
    var related = window.SITE.getRelatedArticles(slug, 6);
    var sideHtml = '<aside class="sidebar" aria-label="侧边栏">' +
      '<section aria-labelledby="related-heading">' +
        '<h2 id="related-heading" class="sidebar-section-head font-serif">' +
          '<span>相关推荐</span>' +
          '<span class="sidebar-section-head-en">RELATED</span>' +
        '</h2>' +
        '<ul class="related-list">';
    for (var r = 0; r < related.length; r++) {
      var ra = related[r];
      sideHtml += '<li><a class="related-link" href="detail.html?slug=' + encodeURIComponent(ra.slug) + '">' +
        '<span class="related-title">' + esc(ra.title) + '</span>' +
        '<span class="related-meta">' +
          '<span class="related-cat-pill">' + esc(ra.category) + '</span>' +
          '<time class="related-date">' + esc(ra.date) + '</time>' +
        '</span>' +
      '</a></li>';
    }
    sideHtml += '</ul></section>';

    /* 常用入口 */
    var quick = window.SITE.quickEntries;
    sideHtml += '<section aria-labelledby="quick-heading">' +
      '<h2 id="quick-heading" class="sidebar-section-head font-serif">' +
        '<span>常用入口</span>' +
        '<span class="sidebar-section-head-en">QUICK LINKS</span>' +
      '</h2>' +
      '<ul class="quick-mini">';
    for (var q = 0; q < quick.length; q++) {
      sideHtml += '<li><a class="quick-mini-link" href="#">' +
        icon(quick[q].icon, 'icon icon-sm') +
        '<span>' + esc(quick[q].label) + '</span>' +
        icon('i-chev-right', 'icon chev icon-xs') +
      '</a></li>';
    }
    sideHtml += '</ul></section></aside>';

    host.innerHTML = html + sideHtml;

    /* 绑定打印按钮 */
    var btn = $('#btn-print');
    if (btn) {
      btn.addEventListener('click', function () {
        if (typeof window.print === 'function') window.print();
      });
    }
  }

  /* ========== 启动 ========== */
  function init() {
    var page = (document.body && document.body.getAttribute('data-page')) || 'home';
    renderTopBar();
    renderSiteHeader();
    renderSiteNav('index.html');
    renderFooter();

    if (page === 'home') {
      renderTeaching();
      renderExam();
      renderTalent();
      renderDownload();
    } else if (page === 'list') {
      renderListPage();
    } else if (page === 'detail') {
      renderDetailPage();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
