document.addEventListener('DOMContentLoaded', function() {
    // Elementos del carrusel
    const carousel = document.querySelector('.hero-carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const indicators = document.querySelectorAll('.indicator');
    
    // Validación de elementos
    if (!slides.length || !carousel) {
        console.error('Elementos del carrusel no encontrados');
        return;
    }

    let currentIndex = 0;
    let autoSlideInterval;
    let isChangingSlide = false; // Bandera para controlar cambios en progreso

    // Función para actualizar indicadores
    function updateIndicators(index) {
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }

    // Función principal para mostrar slides
    function showSlide(index, isManual = false) {
        if (isChangingSlide) return;
        isChangingSlide = true;
        
        // Asegurar que el índice esté dentro de los límites
        index = (index + slides.length) % slides.length;
        
        // Ocultar todos los slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Mostrar el slide actual
        slides[index].classList.add('active');
        
        // Actualizar indicadores
        updateIndicators(index);
        
        currentIndex = index;
        
        // Resetear la bandera después de un breve retraso
        setTimeout(() => {
            isChangingSlide = false;
        }, 50);
    }

    // Navegación
    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    // Event listeners para controles manuales
    nextBtn?.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        restartAutoSlide();
    });

    prevBtn?.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
        restartAutoSlide();
    });
    
    // Event listeners para indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopAutoSlide();
            showSlide(index, true);
            restartAutoSlide();
        });
    });

    // Control del auto slide
    function startAutoSlide() {
        if (!autoSlideInterval) {
            autoSlideInterval = setInterval(() => {
                nextSlide();
            }, 4000);
        }
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }

    function restartAutoSlide() {
        stopAutoSlide();
        setTimeout(startAutoSlide, 10000); // Reanudar después de 10 segundos
    }

    // Inicialización
    function initCarousel() {
        showSlide(0);
        startAutoSlide();
        
        // Pausar al interactuar
        carousel?.addEventListener('mouseenter', stopAutoSlide);
        carousel?.addEventListener('mouseleave', startAutoSlide);
        carousel?.addEventListener('touchstart', stopAutoSlide);
        carousel?.addEventListener('touchend', restartAutoSlide);
    }

    initCarousel();
});