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
const sectionElement = document.querySelectorAll("section");
const ulElement = document.querySelector("#navbar__list");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */


 const navLinks = document.querySelectorAll(".active");

 if (!!window.IntersectionObserver) {
   let observer = new IntersectionObserver((entries, observer) => {
     entries.forEach((entry) => {
       if (entry.isIntersecting) {
         sectionElement.forEach((section) => {
           if (section.id === entry.target.id) {
             section.classList.add("your-active-class");
              for (const links of navLinks) {
               if (links.id === entry.target.id) {
                 links.classList.add("nav__highlight");
               } else {
                 links.classList.remove("nav__highlight");
               }
             }
           } else {
             section.classList.remove("your-active-class");
           }
         });
       }
     });
   });
   sectionElement.forEach((section) => {
     observer.observe(section);
   });
 }


 /**
  * End Helper Functions
  * Begin Main Functions
  *
  */

 for (const sectiondata of sectionElement) {

   const sectionId = sectiondata.id;
   const sectionDataNav = sectiondata.dataset.nav;

   const liElement = document.createElement("li");
   const anchorTag = `<a class="menu__link" href="#${sectionId}" id="#${sectionId}">${sectionDataNav}</a>`;

   liElement.innerHTML = anchorTag;
   ulElement.appendChild(liElement);

   // Scroll to section on link click
   liElement.addEventListener("click", (event) => {
     event.preventDefault();
     sectiondata.scrollIntoView({
       easing: "linear",
       duration: 2000,
       behavior: "smooth",
       block: "start",
     });
   });
 }




// Top button variable
const topBtn = document.querySelector(".top-btn");

// Function to display button on scrolling
window.onscroll = function () {
  if (document.body.scrollTop >= 0 || document.documentElement.scrollTop >= 0) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
};



// Event Listener of top button which scroll's to the top smoothly
topBtn.addEventListener("click", function () {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
    block: "start",
  });
});
