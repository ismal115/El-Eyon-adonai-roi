document.addEventListener('DOMContentLoaded', function() {
    // Configuración para cada carrusel
    setupCarousel('carousel-nacional');
    setupCarousel('carousel-internacional');
    
    function setupCarousel(carouselId) {
        const carousel = document.getElementById(carouselId);
        const miniaturas = carousel.querySelectorAll('.miniatura');
        const imagenesGrandes = carousel.querySelectorAll('.mision-imagen-grande img');
        const textosDesc = carousel.querySelectorAll('.mision-texto');
        
        miniaturas.forEach(miniatura => {
            miniatura.addEventListener('click', function() {
                const target = this.getAttribute('data-target');
                
                // Remover clase active de todos los elementos de ESTE carrusel
                miniaturas.forEach(m => m.classList.remove('active'));
                imagenesGrandes.forEach(img => img.classList.remove('active'));
                textosDesc.forEach(txt => txt.classList.remove('active'));
                
                // Agregar clase active a los elementos seleccionados
                this.classList.add('active');
                imagenesGrandes[target].classList.add('active');
                textosDesc[target].classList.add('active');
            });
        });
        
        // Carrusel automático (opcional)
        let currentIndex = 0;
        function rotateCarousel() {
            currentIndex = (currentIndex + 1) % miniaturas.length;
            miniaturas[currentIndex].click();
        }
        let intervalId = setInterval(rotateCarousel, 5000);
        
        // Pausar al hacer hover
        carousel.addEventListener('mouseenter', () => clearInterval(intervalId));
        carousel.addEventListener('mouseleave', () => {
            intervalId = setInterval(rotateCarousel, 5000);
        });
    }
});