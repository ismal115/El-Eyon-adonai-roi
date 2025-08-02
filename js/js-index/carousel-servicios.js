document.addEventListener('DOMContentLoaded', function() {
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        const carousel = item.querySelector('.carousel-inner');
        const images = carousel.querySelectorAll('img');
        let currentIndex = 0;
        let interval;
        
        // Iniciar carrusel al hacer hover
        item.addEventListener('mouseenter', function() {
            startCarousel();
        });
        
        // Detener carrusel al salir del hover
        item.addEventListener('mouseleave', function() {
            stopCarousel();
        });
        
        function startCarousel() {
            // Mostrar primera imagen inmediatamente
            showImage(currentIndex);
            
            // Iniciar intervalo para cambio automático
            interval = setInterval(nextImage, 3000);
        }
        
        function stopCarousel() {
            clearInterval(interval);
        }
        
        function nextImage() {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }
        
        function showImage(index) {
            // Ocultar todas las imágenes
            images.forEach(img => {
                img.classList.remove('active');
            });
            
            // Mostrar imagen actual
            images[index].classList.add('active');
            images[index].style.animation = 'fadeIn 1s';
        }
    });
});
