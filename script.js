// Loading Screen
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen');
  loadingScreen.style.opacity = '0';
  setTimeout(() => {
    loadingScreen.style.display = 'none';
  }, 500);
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

// Smooth scroll with animation trigger
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    // Add animation classes when scrolling to section
    target.classList.add('animate__animated', 'animate__fadeIn');
    
    target.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  });
});

// Scroll animation observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate__animated');
      entry.target.classList.add(entry.target.dataset.animation || 'animate__fadeIn');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections and animated elements
document.querySelectorAll('section, .animate__animated').forEach(element => {
  observer.observe(element);
});

// Add hover animation to buttons
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('mouseover', function() {
    this.style.transform = 'translateY(-3px)';
  });
  
  button.addEventListener('mouseout', function() {
    this.style.transform = 'translateY(0)';
  });
});

// Lazy loading for images
document.addEventListener("DOMContentLoaded", function() {
  const images = document.querySelectorAll('img[data-src]');
  const imageOptions = {
    threshold: 0,
    rootMargin: '0px 0px 50px 0px'
  };

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('fade-in');
        observer.unobserve(img);
      }
    });
  }, imageOptions);

  images.forEach(img => imageObserver.observe(img));
});
