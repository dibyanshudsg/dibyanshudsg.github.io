document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("c_list");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  }
});

const currentPath = window.location.pathname.replace(/\/$/, "");
const links = document.querySelectorAll(".ca_link");

links.forEach((link) => {
  const rawHref = link.getAttribute("href");
  if (!rawHref) return;

  const linkHref = new URL(rawHref, window.location.origin).pathname.replace(
    /\/$/,
    ""
  );

  if (currentPath === linkHref || currentPath.startsWith(linkHref + "/")) {
    // Highlight this link
    link.classList.add("active");

    // Open all parent <li.chapter>
    let parent = link.closest("li.chapter");
    while (parent) {
      parent.classList.add("open");

      // Also highlight the parent's link
      const parentLink = parent.querySelector(":scope > .ca_link");
      if (parentLink) parentLink.classList.add("active");

      parent = parent.parentElement.closest("li.chapter");
    }
  }
});

// Toggle submenu on click
document.querySelectorAll("#c_list li.chapter").forEach((chapter) => {
  const submenu = chapter.querySelector("ul");
  const link = chapter.querySelector(":scope > .ca_link");

  if (submenu && link) {
    chapter.classList.add("has-sub");

    link.addEventListener("click", (e) => {
      // Prevent navigation if empty href
      if (
        link.getAttribute("href") === "" ||
        link.getAttribute("href") === "#"
      ) {
        e.preventDefault();
      }

      // Close siblings
      const siblings = chapter.parentElement.querySelectorAll(
        ":scope > li.chapter.open"
      );
      siblings.forEach((sibling) => {
        if (sibling !== chapter) {
          sibling.classList.remove("open");
        }
      });

      // Toggle current
      chapter.classList.toggle("open");
    });
  }
});

// Disable right-click
document.addEventListener("contextmenu", (e) => e.preventDefault());

// Disable copy & cut
document.addEventListener("copy", (e) => e.preventDefault());
document.addEventListener("cut", (e) => e.preventDefault());
