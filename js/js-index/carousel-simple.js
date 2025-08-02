// Carrusel simple para las secciones
function initSimpleCarousels() {
    const carousels = document.querySelectorAll('.simple-carousel');
    
    carousels.forEach(carousel => {
        const images = carousel.querySelectorAll('img');
        let currentIndex = 0;
        
        if (images.length > 1) {
            setInterval(() => {
                images[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % images.length;
                images[currentIndex].classList.add('active');
            }, 4000); // Cambia cada 4 segundos
        }
    });
}

document.addEventListener('DOMContentLoaded', initSimpleCarousels);