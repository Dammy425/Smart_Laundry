// Utility to save service entries correctly
function saveToStore(key, obj) {
  if (key === 'serviceEntries') {
    const arr = JSON.parse(localStorage.getItem('serviceEntries') || '[]');
    arr.push(obj);
    localStorage.setItem('serviceEntries', JSON.stringify(arr));
  } else {
    const arr = JSON.parse(localStorage.getItem(key + '_array') || '[]');
    arr.push(obj);
    localStorage.setItem(key + '_array', JSON.stringify(arr));
  }
}
// assignService.js
// Fill readonly inputs from localStorage and handle service type price display


function setStatusField() {
  var customerId = localStorage.getItem('selectedCustomerId') || '';
  var statArray = JSON.parse(localStorage.getItem('stat_array') || '[]');
  var found = statArray.find(c => String(c.customerId1).trim() === String(customerId).trim());
  var customerName = '';
  var statusValue = '';
  if (found) {
    customerName = (found.surname1 || '') + ' ' + (found.otherName1 || '');
    if (typeof found.statusId === 'string' && found.statusId.trim() !== '') {
      statusValue = found.statusId.trim();
    }
  }
  document.getElementById('customerIdDisplay').value = customerId;
  document.getElementById('customerNameDisplay').value = customerName;
  var statusInput = document.getElementById('statusDisplay');
  var statusTestDisplay = document.getElementById('statusTestDisplay');
  if (statusInput) {
    statusInput.value = statusValue;
    console.log('DEBUG: Status input found. Value set to:', statusValue);
    if (statusValue === '') {
      console.log('DEBUG: Status input found but value is empty.');
    }
  } else {
    console.log('DEBUG: Status input NOT found in DOM.');
  }
  if (statusTestDisplay) statusTestDisplay.textContent = 'JS status value: ' + statusValue;
  console.log('DEBUG: Status value being set:', statusValue);
}

var select = document.getElementById('serviceTypeSelect');
var priceMsg = document.getElementById('servicePriceMsg');
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
      servicePrice: servicePrice
    };
    // Save the service entry to localStorage
    saveToStore('serviceEntries', serviceEntry);
    alert('Service entry registered successfully!');
    window.location.href = 'assignItems.html';
  } else {
    alert('Please fill in all fields.');
  }
}

// Call setStatusField directly after all DOM is loaded
setStatusField();
