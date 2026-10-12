// 해시 주소(#about 등)에 맞는 페이지 하나만 보여 줍니다. 스크립트가 꺼져 있으면 모든 페이지가 차례로 보입니다.
(function () {
  var root = document.documentElement;
  root.classList.add("js");

  var pages = Array.prototype.slice.call(document.querySelectorAll(".page"));
  var menuLinks = Array.prototype.slice.call(document.querySelectorAll(".gnb a"));
  var nav = document.querySelector(".gnb");
  var toggle = document.querySelector(".nav-toggle");

  function show() {
    var id = location.hash.replace("#", "") || "home";
    var target = document.getElementById(id);
    if (!target || !target.classList.contains("page")) target = document.getElementById("home");

    pages.forEach(function (p) { p.classList.toggle("is-current", p === target); });
    menuLinks.forEach(function (a) {
      if (a.getAttribute("href") === "#" + target.id) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    document.querySelectorAll(".gnb > li").forEach(function (li) {
      li.classList.toggle("is-active", !!li.querySelector('[href="#' + target.id + '"]'));
    });

    var title = target.getAttribute("data-title");
    document.title = title ? title + " | 경남 농어촌유학" : "경남 농어촌유학";
    window.scrollTo(0, 0);
    if (nav) nav.classList.remove("is-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  window.addEventListener("hashchange", show);
  show();
})();
