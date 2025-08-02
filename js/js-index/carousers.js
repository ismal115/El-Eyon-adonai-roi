document.addEventListener('DOMContentLoaded', function() {
    // Función para inicializar un carrusel simple
    function initSimpleCarousel(container) {
        const images = container.querySelectorAll('img');
        let currentIndex = 0;
        
        if (images.length <= 1) return; // No necesita animación si solo hay una imagen

        // Mostrar la primera imagen
        images[currentIndex].classList.add('active');
        
        // Cambiar de imagen cada 4 segundos
        const interval = setInterval(() => {
            images[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.add('active');
        }, 4000);

        // Pausar al interactuar (opcional)
        container.addEventListener('mouseenter', () => clearInterval(interval));
    }

    // Inicializar todos los carruseles simples
    document.querySelectorAll('.simple-carousel').forEach(initSimpleCarousel);
    
    // Inicializar carruseles de servicios
    document.querySelectorAll('.carousel-inner').forEach(initSimpleCarousel);

    // Carrusel hero (si es diferente)
    const heroSlides = document.querySelectorAll('.carousel-slide');
    if (heroSlides.length > 0) {
        let currentHeroSlide = 0;
        heroSlides[currentHeroSlide].classList.add('active');
        
        setInterval(() => {
            heroSlides[currentHeroSlide].classList.remove('active');
            currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
            heroSlides[currentHeroSlide].classList.add('active');
        }, 5000);
    }
});