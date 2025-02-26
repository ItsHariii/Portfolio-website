// Loading Screen and Initial Animations
let hasAnimated = false;

window.addEventListener('load', () => {
  if (hasAnimated) return;  // Prevent multiple animations
  
  const loadingScreen = document.getElementById('loading-screen');
  loadingScreen.style.opacity = '0';
  
  // Initial animations
  const profilePic = document.getElementById('profile-pic');
  const profileText = document.querySelector('#profile .section__text');
  const desktopNav = document.getElementById('desktop-nav');
  
  setTimeout(() => {
    loadingScreen.style.display = 'none';
    
    if (profilePic) {
      profilePic.style.opacity = '0';
      profilePic.classList.add('animate__animated', 'animate__fadeInLeft');
      profilePic.style.opacity = '1';
    }
    
    if (profileText) {
      profileText.style.opacity = '0';
      profileText.classList.add('animate__animated', 'animate__fadeInRight');
      profileText.style.opacity = '1';
    }
    
    if (desktopNav) {
      desktopNav.style.opacity = '0';
      desktopNav.classList.add('animate__animated', 'animate__fadeInDown');
      desktopNav.style.opacity = '1';
    }
    
    hasAnimated = true;  // Mark as animated
  }, 500);
});

// Remove animation classes after they complete
document.addEventListener('animationend', function(e) {
  if (e.target.id === 'profile-pic' || 
      e.target.classList.contains('section__text') || 
      e.target.id === 'desktop-nav') {
    e.target.classList.remove('animate__animated', 'animate__fadeInLeft', 'animate__fadeInRight', 'animate__fadeInDown');
  }
});

// Progress Bar
window.onscroll = function() {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;
  document.getElementById("progress-bar").style.width = scrolled + "%";
};

// Mobile menu toggle
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Scroll animation observer for non-profile elements
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.target.closest('#profile') && entry.isIntersecting) {
      const element = entry.target;
      
      if (!element.classList.contains('has-animated')) {
        if (element.classList.contains('section__text__p1')) {
          element.classList.add('animate__animated', 'animate__fadeInUp');
        } else if (element.classList.contains('title')) {
          element.classList.add('animate__animated', 'animate__fadeInUp');
        } else if (element.classList.contains('about-containers') || 
                   element.classList.contains('project-container')) {
          element.classList.add('animate__animated', 'animate__fadeIn');
        }
        
        element.classList.add('has-animated');
        
        // Remove animation classes after animation completes
        element.addEventListener('animationend', () => {
          element.classList.remove('animate__animated', 'animate__fadeInUp', 'animate__fadeIn');
        }, { once: true });
      }
    }
  });
}, observerOptions);

// Observe elements for animation (excluding profile section)
document.addEventListener('DOMContentLoaded', () => {
  const elementsToAnimate = document.querySelectorAll(`
    .section__text__p1:not(#profile *),
    .title:not(#profile *),
    .about-containers,
    .project-container
  `);
  
  elementsToAnimate.forEach(element => {
    if (!element.classList.contains('has-animated')) {
      observer.observe(element);
    }
  });
});

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      if (img.dataset.src && !img.dataset.loaded) {
        img.src = img.dataset.src;
        img.classList.add('fade-in');
        img.dataset.loaded = 'true';
        imageObserver.unobserve(img);
      }
    }
  });
}, {
  threshold: 0,
  rootMargin: '50px'
});

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img[data-src]');
  images.forEach(img => {
    if (!img.dataset.loaded) {
      imageObserver.observe(img);
    }
  });
});
