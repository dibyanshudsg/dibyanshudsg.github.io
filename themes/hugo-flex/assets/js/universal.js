document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("c_list");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  }
});

// Disable right-click
document.addEventListener("contextmenu", (e) => e.preventDefault());

// Disable copy & cut
document.addEventListener("copy", (e) => e.preventDefault());
document.addEventListener("cut", (e) => e.preventDefault());

// lazy lode

document.addEventListener("DOMContentLoaded", function () {
  const lazyBackgrounds = document.querySelectorAll(".lazy");

  const lazyLoad = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bg = entry.target.dataset.bg;
        entry.target.style.backgroundImage = `url('${bg}')`;
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(lazyLoad, {
    rootMargin: "100px 0px",
    threshold: 0.1,
  });

  lazyBackgrounds.forEach((el) => observer.observe(el));
});
