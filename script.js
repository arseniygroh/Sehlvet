const iconMenu = document.querySelector(".icon-menu");
iconMenu.addEventListener("click", () => {
    document.documentElement.classList.toggle("open-menu")

})

const trending = document.querySelector(".trending");

function adjustPaddingTop() {
    const vw = window.innerWidth;
    const minWidth = 600;    
    const maxWidth = 1440;   
    const maxPadding = 50;
    const clampedWidth = Math.min(Math.max(vw, minWidth), maxWidth);
    const progress = (maxWidth - clampedWidth) / (maxWidth - minWidth);
    const newPadding = progress * maxPadding;
    trending.style.paddingTop = `${newPadding}px`;
}

window.addEventListener('load', adjustPaddingTop);
window.addEventListener('resize', adjustPaddingTop);

const trendingGrid = document.querySelector(".trending__grid");
function adjustGap() {
    const vw = window.innerWidth;
    const minGap = 16;
    const maxGap = 56;
    const maxWidth = 1440;
    const scaledGap = Math.min(maxGap, Math.max(minGap, vw / maxWidth * maxGap));
    trendingGrid.style.columnGap = `${scaledGap}px`;
}
  
window.addEventListener("load", adjustGap);
window.addEventListener("resize", adjustGap);

const swiper = new Swiper('.swiper-container', {
    loop: false,
    slidesPerView: "auto",
    watchOverflow: true,
    slidesOffsetAfter: 0,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

const grid = document.querySelector('.trending__grid');
const items = grid.querySelectorAll('.item-trending');
const wrapper = grid.querySelector('.trending__wrapper');

let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.innerWidth < 1024) {
        items.forEach((item) => {
            item.style.transform = 0 + "px";
        })
        wrapper.style.transform = 0 + "px";
        return;
    };
    const currentScrollY = window.scrollY;
    const isScrollingUp = currentScrollY < lastScrollY;
    const lastItem = items[items.length - 1];
    const middleIndex = Math.floor((items.length - 1) / 2);

    const speedUp = 0.1;   
    const speedDown = 0.08;

    const speed = isScrollingUp ? speedUp : speedDown;

    items.forEach((item, index) => {
        if (item === lastItem) return;

        let multiplier = index === middleIndex ? 0.3 : 1;
        const translateY = currentScrollY * speed * multiplier;
        item.style.transform = `translateY(${translateY}px)`;
    });

    const wrapperTranslateY = currentScrollY * speed;
    wrapper.style.transform = `translateY(${wrapperTranslateY}px)`;

    lastScrollY = currentScrollY;
});

const headers = document.querySelectorAll('[class*="__header"]');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('_animated');
      observer.unobserve(entry.target); 
    }
  });
}, {
  threshold: 0.1,
});

headers.forEach(header => observer.observe(header));

const parallaxImg = document.querySelector('.summer__image img');

function handleParallax() {
    // const isDesktop = window.innerWidth >= 1024;
    if (!parallaxImg) return;
  
    // if (!isDesktop) {
    //   parallaxImg.style.transform = 'translateY(0)';
    //   return;
    // }
  
    const parent = parallaxImg.closest('.summer__image');
    const rect = parent.getBoundingClientRect();
    const speed = 0.2;
    const offset = rect.top;
  
    const translateY = offset * speed;
    parallaxImg.style.transform = `translateY(${translateY}px)`;
}
  
window.addEventListener('scroll', handleParallax);
window.addEventListener('resize', handleParallax);
window.addEventListener('load', handleParallax);