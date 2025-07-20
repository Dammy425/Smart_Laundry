document.addEventListener('DOMContentLoaded', function() {

  const customerIdDisplay = document.getElementById('customerIdDisplay');
  const customerNameDisplay = document.getElementById('customerNameDisplay');
  const statusDisplay = document.getElementById('statusDisplay');
  const serviceTypeSelect = document.getElementById('serviceTypeSelect');
  const priceMsg = document.getElementById('servicePriceMsg');
  const registerButton = document.getElementById('btnRegisterService');

  function setStatusField() {
    const customerId = localStorage.getItem('selectedCustomerId') || '';
    const statArray = getFromStore('stat');
    const found = statArray.find(c => c && String(c.customerId1).trim() === String(customerId).trim());
    
    let customerName = 'N/A';
    let statusValue = 'N/A';
    
    if (found) {
      customerName = `${found.surname1 || ''} ${found.otherName1 || ''}`;
      statusValue = found.statusId ? found.statusId.trim() : 'N/A';
    }
    
    if (customerIdDisplay) customerIdDisplay.value = customerId;
    if (customerNameDisplay) customerNameDisplay.value = customerName;
    if (statusDisplay) statusDisplay.value = statusValue;
  }

  function displayServicePrice() {
    const selectedOption = serviceTypeSelect.options[serviceTypeSelect.selectedIndex];
    const price = selectedOption.dataset.price;

    if (price) {
        let formattedPrice = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(price);
        let color = 'green';
        if (price === '10000') color = 'blue';
        if (price === '20000') color = 'red';
        priceMsg.innerHTML = `<span style='color:${color}'>Price = ${formattedPrice}</span>`;
    } else {
        priceMsg.innerHTML = "";
    }
  }

  function registerServiceEntry() {
    const customerId = customerIdDisplay.value.trim();
    const serviceType = serviceTypeSelect.value;
    const selectedOption = serviceTypeSelect.options[serviceTypeSelect.selectedIndex];
    const servicePrice = selectedOption.dataset.price;

    if (customerId && serviceType && servicePrice) {
      const serviceEntry = {
        customerId,
        serviceType,
        servicePrice,
        date: new Date().toISOString()
      };
      
      saveToStore('serviceEntries', serviceEntry);
      // Also save to 'service' for dashboard revenue counting
      saveToStore('service', serviceEntry);
      
      alert('Service entry registered successfully!');
      window.location.href = 'assignItems.html';
    } else {
      alert('Please select a service type.');
    }
  }

  // --- INITIALIZATION & EVENT LISTENERS ---
  setStatusField();
  serviceTypeSelect.addEventListener('change', displayServicePrice);
  registerButton.addEventListener('click', registerServiceEntry);
});