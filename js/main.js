/* 제네시스 부업 — 공통 스크립트 */
(function () {
  "use strict";

  // 모바일 네비 토글
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
    });
    // 링크 클릭 시 메뉴 닫기
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "메뉴 열기");
      }
    });
  }

  // 푸터 연도 자동 표기
  var yearEls = document.querySelectorAll("[data-year]");
  var y = new Date().getFullYear();
  yearEls.forEach(function (el) { el.textContent = y; });
})();
