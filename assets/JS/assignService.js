document.addEventListener('DOMContentLoaded', function() {
  setStatusField();
  
  var select = document.getElementById('serviceTypeSelect');
  var priceMsg = document.getElementById('servicePriceMsg');
  
  if (select && priceMsg) {
    select.addEventListener('change', function() {
      if (select.value === 'Normal Delivery') {
        priceMsg.innerHTML = "<span style='color:green'>Price = ₦5,000</span>";
      } else if (select.value === 'Express Delivery') {
        priceMsg.innerHTML = "<span style='color:blue'>Price = ₦10,000 (most popular)</span>";
      } else if (select.value === 'Super Express Delivery') {
        priceMsg.innerHTML = "<span style='color:red'>Price = ₦20,000</span>";
      } else { 
        priceMsg.innerHTML = "";
      }
    });
  }
});

function setStatusField() {
  var customerId = localStorage.getItem('selectedCustomerId') || '';
  var statArray = getFromStore('stat');
  var found = statArray.find(c => String(c.customerId1).trim() === String(customerId).trim());
  var customerName = '';
  var statusValue = '';
  
  if (found) {
    customerName = (found.surname1 || '') + ' ' + (found.otherName1 || '');
    if (typeof found.statusId === 'string' && found.statusId.trim() !== '') {
      statusValue = found.statusId.trim();
    }
  }
  
  if (document.getElementById('customerIdDisplay')) {
    document.getElementById('customerIdDisplay').value = customerId;
  }
  
  if (document.getElementById('customerNameDisplay')) {
    document.getElementById('customerNameDisplay').value = customerName;
  }
  
  var statusInput = document.getElementById('statusDisplay');
  var statusTestDisplay = document.getElementById('statusTestDisplay');
  
  if (statusInput) {
    statusInput.value = statusValue;
  }
  
  if (statusTestDisplay) {
    statusTestDisplay.textContent = 'JS status value: ' + statusValue;
  }
}

function registerServiceEntry() {
  var customerId = document.getElementById('customerIdDisplay').value.trim();
  var serviceType = document.getElementById('serviceTypeSelect').value;
  var servicePrice = '';
  var servicePriceMsg = document.getElementById('servicePriceMsg').textContent;

  if (servicePriceMsg.includes('₦5,000')) {
    servicePrice = '5000';
  } else if (servicePriceMsg.includes('₦10,000')) {
    servicePrice = '10000';
  } else if (servicePriceMsg.includes('₦20,000')) {
    servicePrice = '20000';
  }

  if (customerId && serviceType && servicePrice) {
    var serviceEntry = {
      customerId: customerId,
      serviceType: serviceType,
      servicePrice: servicePrice,
      date: new Date().toISOString()
    };
    
    // Save the service entry to localStorage
    saveToStore('serviceEntries', serviceEntry);
    
    // Also save to services for dashboard counting
    saveToStore('service', {
      customerId: customerId,
      serviceType: serviceType,
      totalAmount: servicePrice,
      date: new Date().toISOString()
    });
    
    alert('Service entry registered successfully!');
    window.location.href = 'assignItems.html';
  } else {
    alert('Please fill in all fields.');
  }
}