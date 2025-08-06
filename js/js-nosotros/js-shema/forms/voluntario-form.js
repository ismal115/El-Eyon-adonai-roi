document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('volunteerForm');
    const modal = document.getElementById('volunteerModal');
    const closeBtn = document.querySelector('.volunteer-close-modal'); // Asegúrate que coincida con tu HTML
    const modalBtn = document.getElementById('volunteerModalBtn'); // Asegúrate que coincida con tu HTML

    // Verificar que todos los elementos existen
    if (!form || !modal || !closeBtn || !modalBtn) {
        console.error('No se encontraron todos los elementos necesarios');
        return;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validación
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = 'red';
                // Agregar clase de error para mejor feedback
                field.classList.add('error-field');
            } else {
                field.style.borderColor = '';
                field.classList.remove('error-field');
            }
        });

        if (!isValid) {
            // Mejorar el mensaje de error
            const errorModal = document.createElement('div');
            errorModal.className = 'error-message';
            errorModal.textContent = 'Por favor complete todos los campos requeridos';
            errorModal.style.color = 'red';
            errorModal.style.margin = '10px 0';
            
            // Insertar después del botón de submit
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.parentNode.insertBefore(errorModal, submitBtn.nextSibling);
            
            // Eliminar después de 3 segundos
            setTimeout(() => {
                errorModal.remove();
            }, 3000);
            
            return;
        }

        // Mostrar modal de carga
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;

        // Enviar a FormSubmit
        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Mostrar modal rojo premium
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                // Limpiar formulario
                form.reset();
            } else {
                throw new Error('Error en el envío');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Mejor manejo de errores
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'Hubo un error al enviar el formulario. Por favor intente nuevamente.';
            errorMessage.style.color = 'red';
            errorMessage.style.margin = '10px 0';
            
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.parentNode.insertBefore(errorMessage, submitBtn.nextSibling);
            
            setTimeout(() => {
                errorMessage.remove();
            }, 5000);
        })
        .finally(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    });

    // Función para cerrar modal
    const closeModal = function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Opcional: Efecto de desvanecimiento
        modal.style.animation = 'fadeOut 0.3s';
        setTimeout(() => {
            modal.style.display = 'none';
            modal.style.animation = '';
        }, 300);
    };

    // Event listeners para cerrar
    closeBtn.addEventListener('click', closeModal);
    modalBtn.addEventListener('click', closeModal);

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Opcional: Cerrar con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
});

