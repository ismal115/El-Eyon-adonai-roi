document.addEventListener('DOMContentLoaded', function() {
    // Elementos básicos
    const carousel = document.querySelector('.hero-carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!slides.length || !carousel) {
        console.error('Elementos del carrusel no encontrados');
        return;
    }

    let currentIndex = 0;
    let autoSlideInterval;

    // Función para mostrar slide
    function showSlide(index) {
        // Asegúrate que el índice esté dentro de los límites
        index = (index + slides.length) % slides.length;
        
        // Oculta todos los slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Desactiva todos los indicadores
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Muestra el slide actual
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentIndex = index;
    }

    // Navegación
    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    // Event listeners
    nextBtn?.addEventListener('click', nextSlide);
    prevBtn?.addEventListener('click', prevSlide);
    
    // Indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Auto slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Iniciar
    showSlide(0);
    startAutoSlide();
    
    // Pausar al interactuar
    carousel?.addEventListener('mouseenter', stopAutoSlide);
    carousel?.addEventListener('mouseleave', startAutoSlide);
});