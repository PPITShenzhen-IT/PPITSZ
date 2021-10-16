const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".mobile-nav-links");
const links = document.querySelectorAll(".mobile-nav-links li");

let menuOpen= false;

menuBtn.addEventListener('click', () => {
    if(!menuOpen){
        menuBtn.classList.add('open');
        menuOpen= true;
    } else {
        menuBtn.classList.remove('open');
        menuOpen= false
    }

    navLinks.classList.toggle("open");
    // links.forEach(link => {
    //   link.classList.toggle("fade");
    // });
}); 

