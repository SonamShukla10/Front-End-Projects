/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/
const sections = document.querySelector("section");
const navbar = document.querySelector("#navbar__list");


/**
 * End Global Variables
 * Start Helper Functions
 *
*/
function insetionLink(navLinkName, sectionId) {
  // new link
  const htmlTextToAdd = `<li><a href="${sectionId}" class = "menu__link">${navLinkName}</a></li>`;
  // new nav
  nav.insertAdjacentHTML("beforeend", htmlTextToAdd);
}

function isTopSectionInViewport(el) {
  const react = el.getBoundingClientRect();

  return (
    react.top >= 0 &&

    react.top <= 0.4 * (window.innerHeight || document.documentElement.clientHeight)
  );
}


//helper Functions
function getElementOffset(el) {
  const react = el.getBoundingClientRect();

  return {
    top: react.top + window.pageYOffset,
    left: react.left + window.pageXOffset
  };
}


/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
function buildNav(sections){
  for (const section of sections){
    let navLinkName = section.getAttribute("data-nav");
    let sectionId = section.getAttribute("id");
    insetionLink(navLinkName, sectionId);
  }
}

// Add class 'active' to section when near top of viewport
function setSectionIntoViewActive(sections) {
  for (const section of sections) {
    const activeLink = document.querySelector(
      `a[href="#${section.getAttribute("id")
      )}"]`
    );

    if (isTopSectionInViewport(section)) {
      section.classList.add("active");
      activeLink.classList.add("menu__link--active");
    }
  }
}

// Scroll to anchor ID using scrollTO event
function smoothScroll(el) {
  window.scrollTo({
    top: getElementOffset(el).top - nav.offsetHeight,
    left: getElementOffset(el).left,
    behavior: "smooth"
  });
}

/**
 * End Main Functions
 * Begin Events
 *
*/
function createBtnUp() {
  const htmlTextToAdd = `<a href="#" class="bottom__link hide"> Top </a>`;
  document.body.insertAdjacentHTML("afterbegin, htmlTextToAdd");
}


function showBtnUP() {
  const butn = document.querySelector(".bottom__link");
  if (window.pageYOffset <= 0.6 * window.innerHeight) {
    butn.classList.add("hide");
  } else {
    butn.classList.remove("hide");

    butn.addEventListener("click", function(e) {
      e.preventDefault();
      // scroll to top
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    });
  }
}

function hideNav(delay) {
  var timing;
  timing && clearTimeout(timing);
  nav.classList.add("hide");
  timing = setTimeout(function() {
    nav.classList.remove("hide");
  }, delay);

}



document.addEventListener("DOMContentLoaded", function() {
  // Build menu
  buildNav(sections);
  createButnUp();
})



// Scroll to section on link click
nav.addEventListener("click", function(e) {
  if (e.target.nodeName === "A") {
    e.preventDefault();

    const activeSection = document.querySelector(
      `section[id = ${e.target.getAttribute("href").slice(1)}]`
    );
    smoothScroll(activeSection);
  }
});

// Set sections as active
setTimeout(
  window.addEventListener("scroll", function() {
    setSectionIntoViewActive(sections);
    hideNav(1000);
    showBtnUP();
  }),
  2000
);
});
