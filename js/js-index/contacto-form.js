document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactoForm');
  const modal = document.getElementById('confirmationModal');
  const closeModal = document.querySelector('.close-modal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        field.style.borderColor = 'red';
      } else {
        field.style.borderColor = '';
      }
    });

    if (!isValid) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        showModal();
        form.reset();
      } else {
        alert('Hubo un error al enviar el mensaje. Por favor intente nuevamente.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Hubo un error al enviar el mensaje. Por favor intente nuevamente.');
    });
  });

  function showModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function closeModalFunc() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  closeModal.addEventListener('click', closeModalFunc);
  modalCloseBtn.addEventListener('click', closeModalFunc);
  window.addEventListener('click', function (e) {
    if (e.target === modal) {
      closeModalFunc();
    }
  });
});