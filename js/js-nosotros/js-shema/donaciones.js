document.addEventListener('DOMContentLoaded', function() {
 
    // 1. Configuración de montos
  const amountBtns = document.querySelectorAll('.amount-btn');
  const customAmount = document.getElementById('customAmount');
  
  amountBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      amountBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      customAmount.value = '';
    });
  });
  
  customAmount.addEventListener('focus', function() {
    amountBtns.forEach(b => b.classList.remove('active'));
  });
  
  // 2. Tabs de métodos de pago
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      
      // Actualizar botones
      tabBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Actualizar contenidos
      tabContents.forEach(content => content.classList.remove('active'));
      document.getElementById(tabId).classList.add('active');
    });
  });
  
  // 3. Integración con PayPal
  if (document.getElementById('paypal-button-container')) {
    paypal.Buttons({
      style: {
        color: 'gold',
        shape: 'pill',
        label: 'pay',
        height: 40
      },
      createOrder: function(data, actions) {
        const amount = getDonationAmount();
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: amount
            },
            description: 'Donación al Ministerio Shemá'
          }]
        });
      },
      onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
          showDonationSuccess(details.payer.name.given_name, getDonationAmount());
        });
      },
      onError: function(err) {
        console.error('PayPal Error:', err);
        showDonationError();
      }
    }).render('#paypal-button-container');
  }
  
  // 4. Manejo del formulario
  const donationForm = document.getElementById('donationForm');
  if (donationForm) {
    donationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validar términos
      if (!document.getElementById('donationTerms').checked) {
        alert('Debes aceptar los términos y condiciones');
        return;
      }
      
      // Determinar método de pago seleccionado
      const activeTab = document.querySelector('.tab-content.active').id;
      
      if (activeTab === 'paypal-tab') {
        // PayPal ya maneja su propio flujo
        return;
      } else if (activeTab === 'card-tab') {
        // Validar tarjeta (simulación)
        if (!validateCard()) {
          alert('Por favor completa correctamente los datos de la tarjeta');
          return;
        }
        processCardDonation();
      } else if (activeTab === 'bank-tab') {
        showBankInstructions();
      }
    });
  }
  
  // 5. Modal
  const donationModal = document.getElementById('donationModal');
  const closeModalBtns = document.querySelectorAll('.close-modal, #closeDonationModal');
  
  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      donationModal.style.display = 'none';
    });
  });
  
  window.addEventListener('click', function(e) {
    if (e.target === donationModal) {
      donationModal.style.display = 'none';
    }
  });
  
  // Funciones auxiliares
  function getDonationAmount() {
    const activeBtn = document.querySelector('.amount-btn.active');
    if (activeBtn) {
      return activeBtn.getAttribute('data-amount');
    } else if (customAmount.value) {
      return customAmount.value;
    }
    return '0';
  }
  
  function validateCard() {
    const cardNumber = document.getElementById('cardNumber').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
    
    return cardNumber.length >= 16 && expiryDate.length === 5 && cvv.length >= 3;
  }
  
  function processCardDonation() {
    // Simulación de procesamiento de tarjeta
    setTimeout(() => {
      showDonationSuccess(
        document.getElementById('fullName').value.split(' ')[0],
        getDonationAmount()
      );
    }, 1500);
  }
  
  function showBankInstructions() {
    const message = `
      <h4>Instrucciones para Transferencia Bancaria</h4>
      <p>Por favor realiza tu transferencia con los siguientes datos:</p>
      <ul style="text-align: left; margin: 20px 0;">
        <li><strong>Banco:</strong> Nombre de tu Banco</li>
        <li><strong>Cuenta:</strong> 123-456789-01</li>
        <li><strong>Titular:</strong> Ministerio Shemá</li>
        <li><strong>Monto:</strong> $${getDonationAmount()} USD</li>
      </ul>
      <p>Envía el comprobante a donaciones@shemaministry.org</p>
    `;
    
    document.getElementById('donationMessage').innerHTML = message;
    donationModal.style.display = 'block';
  }
  
  function showDonationSuccess(name, amount) {
    const frequency = document.querySelector('input[name="frequency"]:checked').value;
    const message = `
      <p>¡Gracias ${name || 'donante'} por tu donación de $${amount} USD!</p>
      <p>Hemos recibido ${frequency === 'monthly' ? 'tu donación recurrente' : 'tu generosa contribución'}.</p>
      <p>Te hemos enviado un correo con los detalles.</p>
    `;
    
    document.getElementById('donationMessage').innerHTML = message;
    donationModal.style.display = 'block';
    donationForm.reset();
  }
  
  function showDonationError() {
    document.getElementById('donationMessage').innerHTML = `
      <p style="color: #d32f2f;">Ocurrió un error al procesar tu donación.</p>
      <p>Por favor intenta nuevamente o contáctanos.</p>
    `;
    donationModal.style.display = 'block';
  }
});

// <script src="https://www.paypal.com/sdk/js?client-id=TU_CLIENT_ID&currency=USD"></script>