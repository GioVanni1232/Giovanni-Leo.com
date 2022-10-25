const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");
const links = document.querySelectorAll(".link");
const darkToggler = document.querySelector(".dark");
const darkTogglerImg = document.querySelector(".dark img");
const body = document.querySelector("body");
const timelines = document.querySelectorAll(".timeline ul li div");
const root = document.querySelector("body");

//Custom Cursor
const cursor = document.createElement("span");
cursor.className = "custom-cursor";
root.appendChild(cursor);

window.addEventListener("mousemove", (e) => {
  const logo = e.target.closest(".interactable");
  let interacting = logo !== null;

  if (interacting) {
    cursor.classList.add("interacting");
  } else {
    cursor.classList.remove("interacting");
  }

  let x = e.clientX;
  let y = e.clientY;
  cursor.style.transform = `translate(${x}px, ${y}px)`;
});

//Timeline reveal class
if (window.innerWidth <= 674) {
  timelines.forEach((time) => {
    time.className = "odd";
  });
}

for (let i = 0; i < timelines.length; i++) {
  if (i % 2 === 0) {
    timelines[i].className = "even";
  } else {
    timelines[i].classList = "odd";
  }
}

//Dark mode toggler
darkToggler.addEventListener("click", swicthTheme);

let t1 = gsap.timeline(); //GSAP TIMELINE
let t1Scroll = gsap.timeline();
let t1Scroll2 = gsap.timeline();
let t1Scroll3 = gsap.timeline();

//NAVBAR TOGGLER
hamburger.addEventListener("click", (e) => {
  nav.classList.toggle("nav-active");
  hamburger.classList.toggle("active");
  t1.from(links, 1, { stagger: 0.2, opacity: 0, x: -100 }, "-=0.8");
});

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    nav.classList.remove("nav-active");
    hamburger.classList.remove("active");
  });
});

//DARK MODE FUNCTION
function swicthTheme() {
  document.body.classList.toggle("dark-theme");
  darkToggler.classList.toggle("dark-active");

  if (body.classList.contains("dark-theme")) {
    darkTogglerImg.src = "images/night-mode-removebg-preview.png";
    darkTogglerImg.style.width = "80%";
  } else {
    darkTogglerImg.src = "images/moon-removebg-preview.png";
    darkTogglerImg.style.width = "100%";
  }
}

//ScrollMagic

const controller = new ScrollMagic.Controller();

t1Scroll.from(".other-title", 1.5, { x: -100, opacity: 0 });
t1Scroll2.from(".other-contents", { y: 30, opacity: 0 }, "+=1");
t1Scroll3.from(".intro", 1, { opacity: 0 });
t1Scroll3.from(".timeline ul li", 1, { opacity: 0 }, "-=1");
t1Scroll3.from(".even", { x: -100, opacity: 0, stagger: 1 }, "-=1");
t1Scroll3.from(".odd", { x: -10, opacity: 0, stagger: 1 }, "-=2");

const scene1 = new ScrollMagic.Scene({
  triggerElement: ".projects",
  triggerHook: 0.5,
})
  .setTween(t1Scroll)
  .addTo(controller);

const scene2 = new ScrollMagic.Scene({
  triggerElement: ".projects",
  triggerHook: "0.5",
})
  .setTween(t1Scroll2)
  .addTo(controller);

const scene3 = new ScrollMagic.Scene({
  triggerElement: ".timeline-section",
  triggerHook: 0.5,
  duration: "150%",
})
  .setTween(t1Scroll3)
  .addTo(controller);

//end scroll magic

const messages = [
  "I am FrontEnd Web Developer",
  "First Year BSIT student at Saint Louis University",
  "I love Coding",
];

const masterTimeline = gsap.timeline({ repeat: -1 });

//GSAP ANMIMATION
t1.to(".entrance", 1.5, {
  opacity: 1,
  y: 0,
  clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
});
t1.to(".hand", { rotate: 50, yoyo: true, repeat: -1 });
t1.to(".cursor", { opacity: 0, repeat: -1, yoyo: true });

messages.forEach((mess) => {
  let texttimline = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 1 });
  texttimline.to(".text", { duration: 1, text: mess });
  masterTimeline.add(texttimline);
});
