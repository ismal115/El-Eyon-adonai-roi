document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 5000; // 5 segundos

    // Función para cambiar de slide
    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    // Función para siguiente slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // Función para slide anterior
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Iniciar autoplay
    function startSlide() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    // Pausar autoplay cuando el usuario interactúa
    function pauseSlide() {
        clearInterval(slideInterval);
    }

    // Event listeners
    nextBtn.addEventListener('click', function() {
        pauseSlide();
        nextSlide();
        startSlide();
    });

    prevBtn.addEventListener('click', function() {
        pauseSlide();
        prevSlide();
        startSlide();
    });

    // Event listeners para los indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            pauseSlide();
            goToSlide(index);
            startSlide();
        });
    });

    // Pausar al tocar el slide en móviles
    slides.forEach(slide => {
        slide.addEventListener('touchstart', pauseSlide);
        slide.addEventListener('touchend', startSlide);
    });

    // Iniciar el carrusel
    startSlide();

    // Ajustar altura del carrusel al cargar y redimensionar
    function adjustCarouselHeight() {
        const headerHeight = document.querySelector('header').offsetHeight;
        const carousel = document.querySelector('.hero-carousel');
        carousel.style.height = `calc(100vh - ${headerHeight}px)`;
    }

    // Ejecutar al cargar y redimensionar
    window.addEventListener('load', adjustCarouselHeight);
    window.addEventListener('resize', adjustCarouselHeight);
});