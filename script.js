// Loading animation
window.addEventListener('load', function() {
  const loading = document.getElementById('loading');
  setTimeout(() => {
    loading.classList.add('hidden');
  }, 1000);
});

// Typing animation
const typingText = document.getElementById('typedText');
const roles = ['IoT Developer', 'Embedded Systems Engineer', 'UI/UX Enthusiast', 'Problem Solver'];let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    typingText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 100 : 150;

  if (!isDeleting && charIndex === currentRole.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typeSpeed = 500;
  }

  setTimeout(typeRole, typeSpeed);
}

// Start typing animation
typeRole();

// Enhanced navigation
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const header = document.getElementById('header');

const onScroll = () => {
  let currentSection = '';
  
  // Header scroll effect
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Active section detection
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 200) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === currentSection) {
      link.classList.add('active');
    }
  });
};

// Scroll to top button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  onScroll();
  
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    
    // Close mobile menu after clicking a link
    const navLinksContainer = document.querySelector('.nav-links');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    navLinksContainer.classList.remove('active');
    mobileMenuToggle.classList.remove('active');
  });
});

// Mobile menu toggle - FIXED IMPLEMENTATION
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinksContainer = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
  navLinksContainer.classList.toggle('active');
  mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-container')) {
    navLinksContainer.classList.remove('active');
    mobileMenuToggle.classList.remove('active');
  }
});

// Close mobile menu on window resize
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    navLinksContainer.classList.remove('active');
    mobileMenuToggle.classList.remove('active');
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(50px)';
  section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  observer.observe(section);
});

// Initial call
document.addEventListener('DOMContentLoaded', onScroll);

// Parallax effect for background elements
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const shapes = document.querySelectorAll('.shape');
  
  shapes.forEach((shape, index) => {
    const speed = 0.5 + (index * 0.1);
    const yPos = -(scrolled * speed);
    shape.style.transform = `translate3d(0, ${yPos}px, 0)`;
  });
});

// Add hover effects to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
  });
});

// --- Logika untuk Skills Slider ---
document.addEventListener('DOMContentLoaded', function() {
  const skillsNavButtons = document.querySelectorAll('.skills-nav-button');
  const skillsSlider = document.querySelector('.skills-slider');

  if (skillsNavButtons.length > 0 && skillsSlider) {
    skillsNavButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Hapus kelas 'active' dari semua tombol
        skillsNavButtons.forEach(btn => btn.classList.remove('active'));
        
        // Tambahkan kelas 'active' ke tombol yang diklik
        this.classList.add('active');

        // Dapatkan indeks slide dari atribut data-slide
        const slideIndex = this.dataset.slide;

        // Geser slider ke posisi yang benar
        // 0% untuk slide pertama, -50% untuk slide kedua
        skillsSlider.style.transform = `translateX(-${slideIndex * 50}%)`;
      });
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const timelineItems = document.querySelectorAll('.timeline-item');

  if (timelineItems.length > 0) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Hentikan observasi setelah animasi muncul
        }
      });
    }, {
      threshold: 0.1 // Picu animasi saat 10% item terlihat
    });

    
    timelineItems.forEach(item => {
      observer.observe(item);
    });
  }
}); 

// --- Logika untuk Efek Flip Card pada Skills ---
document.addEventListener('DOMContentLoaded', function() {
  const skillCards = document.querySelectorAll('.skill-card');

  skillCards.forEach(card => {
    card.addEventListener('click', function() {
      // Menemukan elemen '.skill-card-inner' di dalam kartu yang di-klik
      const cardInner = this.querySelector('.skill-card-inner');
      // Menambah atau menghapus class 'is-flipped' untuk memicu animasi
      cardInner.classList.toggle('is-flipped');
    });
  });
});

// --- LOGIKA UNTUK MODAL DETAIL PROYEK ---
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('projectModal');
  const detailButtons = document.querySelectorAll('.view-details-btn');
  const closeButton = document.querySelector('.modal-close-btn');

  // Fungsi untuk membuka modal
  detailButtons.forEach(button => {
    button.addEventListener('click', function() {
      const card = this.closest('.project-card');
      
      // Mengisi modal dengan data dari atribut data-*
      document.getElementById('modalTitle').textContent = card.dataset.title;
      document.getElementById('modalImage').src = card.dataset.image;
      document.getElementById('modalOverview').textContent = card.dataset.overview;
      
      // Mengisi tags
      const tagsContainer = document.getElementById('modalTags');
      tagsContainer.innerHTML = '';
      card.dataset.tags.split(',').forEach(tagText => {
        const tag = document.createElement('span');
        tag.className = 'project-tag';
        tag.textContent = tagText;
        tagsContainer.appendChild(tag);
      });

      // Mengisi features
      const featuresContainer = document.getElementById('modalFeatures');
      featuresContainer.innerHTML = '';
      card.dataset.features.split(',').forEach(featureText => {
        const feature = document.createElement('li');
        feature.textContent = featureText;
        featuresContainer.appendChild(feature);
      });

      // Menampilkan modal
      modal.classList.add('visible');
    });
  });

  // Fungsi untuk menutup modal
  function closeModal() {
    modal.classList.remove('visible');
  }

  closeButton.addEventListener('click', closeModal);
  
  // Menutup modal saat mengklik area gelap di luar
  modal.addEventListener('click', function(event) {
    if (event.target === modal) {
      closeModal();
    }
  });
});

// --- LOGIKA UNTUK MENGIRIM EMAIL DENGAN EMAILJS ---
document.addEventListener('DOMContentLoaded', function() {
    
    // Inisialisasi EmailJS dengan Public Key Anda
    emailjs.init({
      publicKey: 'hmvKURtKZ4vozBRZ_',
    });

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Mencegah form melakukan refresh halaman

            // Ganti dengan Service ID dan Template ID Anda
            const serviceID = 'service_vy8xr7h';
            const templateID = 'template_rg4r63d';

            // Mengubah teks tombol saat mengirim
            const submitBtn = contactForm.querySelector('.form-submit-btn');
            submitBtn.textContent = 'Sending...';

            // Kirim form menggunakan EmailJS
            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    submitBtn.textContent = 'Send Message';
                    alert('Message sent successfully!');
                    contactForm.reset(); // Mengosongkan form setelah terkirim
                }, (err) => {
                    submitBtn.textContent = 'Send Message';
                    alert('Failed to send message. Error: ' + JSON.stringify(err));
                });
        });
    }
});