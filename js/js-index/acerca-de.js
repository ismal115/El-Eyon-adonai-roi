function rotateCarousels() {
    document.querySelectorAll('.simple-carousel').forEach(carousel => {
        const images = carousel.querySelectorAll('img');
        const active = carousel.querySelector('.active');
        let next = active.nextElementSibling || images[0];
        
        active.classList.remove('active');
        next.classList.add('active');
    });
}

// Cambia cada 5 segundos
setInterval(rotateCarousels, 5000);

// Scroll suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        1
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Opcional: Resaltar la sección
        targetElement.classList.add('highlight-section');
        setTimeout(() => {
            targetElement.classList.remove('highlight-section');
        }, 2000);
        }
    });
    });

    // Para enlaces que vienen de otras páginas
    if(window.location.hash === '#contacto') {
    setTimeout(() => {
        const contactoSection = document.getElementById('contacto');
        if(contactoSection) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = contactoSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        }
    }, 100);
    }