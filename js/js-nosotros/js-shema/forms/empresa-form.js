    document.addEventListener('DOMContentLoaded', function() {
    // 1. Configuración del Modal
    const modal = document.getElementById('partnerModal');
    const closeModal = document.querySelector('.partner-close-modal');
    const modalBtn = document.getElementById('partnerModalBtn');
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    if (modalBtn) {
        modalBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            // Opcional: Redirigir después de cerrar
            // window.location.href = '/gracias.html';
        });
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // 2. Configuración del Formulario
    const partnerForm = document.getElementById('partnerForm');
    
    if (partnerForm) {
        partnerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación de términos (versión optimizada)
            const termsAgreement = document.getElementById('terms-agreement');
            if (!termsAgreement || !termsAgreement.checked) {
                alert('Debe aceptar los términos y condiciones');
                return;
            }
            
            // Mostrar modal de carga (opcional)
            modal.style.display = 'block';
            modal.querySelector('.partner-modal-body').innerHTML = `
                <div class="loading-spinner">
                    <i class="fas fa-spinner fa-spin"></i>
                    <p>Enviando su solicitud...</p>
                </div>
            `;
            
            // Envío con FormSubmit
            const formData = new FormData(partnerForm);
            
            fetch(partnerForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Mostrar mensaje de éxito
                    modal.querySelector('.partner-modal-body').innerHTML = `
                        <div class="partner-modal-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <h3>¡Solicitud enviada!</h3>
                        <p>Gracias por su interés en establecer una alianza con <strong>Ministerio Shemá</strong>.</p>
                        <div class="partner-modal-details">
                            <div class="detail-item">
                                <i class="fas fa-envelope"></i>
                                <span>corporate@shemaministry.org</span>
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-phone-alt"></i>
                                <span>+1 (234) 567-8900</span>
                            </div>
                        </div>
                    `;
                    partnerForm.reset();
                } else {
                    throw new Error('Error en el envío');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                modal.querySelector('.partner-modal-body').innerHTML = `
                    <div class="partner-modal-icon error">
                        <i class="fas fa-exclamation-circle"></i>
                    </div>
                    <h3>Error en el envío</h3>
                    <p>Ocurrió un error al enviar el formulario. Por favor intente nuevamente.</p>
                    <button onclick="location.reload()" class="partner-modal-btn">Reintentar</button>
                `;
            });
        });
    }
});
