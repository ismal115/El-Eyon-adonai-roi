// Scripts completos para funcionalidad

document.addEventListener('DOMContentLoaded', function() {
    // Animación para el contador de estadísticas
    function animateCounters() {
        const counters = document.querySelectorAll('[data-count]');
        const speed = 200;
        let animated = false;
        
        function updateCounters() {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-count');
                const count = +counter.innerText;
                const increment = target / speed;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    requestAnimationFrame(updateCounters);
                } else {
                    counter.innerText = target;
                }
            });
        }
        
        // Solo animar una vez
        if (!animated) {
            animated = true;
            updateCounters();
        }
    }
    
    // Lazy Load para imágenes
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback para navegadores sin IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
    
    // Manejar el scroll para animaciones
    function handleScroll() {
        const statsSection = document.querySelector('.stats-grid');
        const windowHeight = window.innerHeight;
        
        if (statsSection && statsSection.getBoundingClientRect().top < windowHeight - 100) {
            animateCounters();
            window.removeEventListener('scroll', handleScroll);
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Inicializar scroll para verificar si ya está en la posición
    handleScroll();
    
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Inicializar animaciones de entrada
    const animateElements = document.querySelectorAll('.animate__animated');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const animation = entry.target.dataset.animation || 'animate__fadeIn';
                    entry.target.classList.add('animate__animated', animation);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animateElements.forEach(el => observer.observe(el));
    } else {
        // Fallback para navegadores sin IntersectionObserver
        animateElements.forEach(el => {
            const animation = el.dataset.animation || 'animate__fadeIn';
            el.classList.add('animate__animated', animation);
        });
    }
});