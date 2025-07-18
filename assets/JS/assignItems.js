// assignItems.js

// Dry Cleaning Items
const dryCleaningItems = [
  "-- Select Clothing Type --",
  "Wool or silk suits",
  "Blazers (structured)",
  "Tuxedos",
  "Evening gowns",
  "Silk or satin dresses",
  "Beaded/embellished garments",
  "Wool coats",
  "Cashmere overcoats",
  "Leather/suede jackets",
  "Fur-trimmed coats",
  "Silk blouses",
  "Cashmere sweaters",
  "Linen suits",
  "Velvet clothing",
  "Taffeta/chiffon dresses",
  "Wool trousers",
  "Pleated skirts",
  "Silk neckties",
  "Delicate scarves",
  "Vintage/high-end designer wear",
  "Structured work uniforms"
];

// Laundry Items
const laundryItems = [
  "-- Select Clothing Type --",
  "Cotton t-shirts",
  "Jeans & denim",
  "Sweatshirts & hoodies",
  "Pajamas & loungewear",
  "Underwear & socks",
  "Bed sheets & pillowcases",
  "Bath towels",
  "Gym clothes (polyester blends)",
  "Knit cotton dresses",
  "Stretchy leggings",
  "Baby clothes (non-delicate)",
  "Canvas sneakers (washable)",
  "Cotton button-down shirts",
  "Shorts (cotton/polyester)",
  "Swimwear (machine-washable)",
  "Aprons & cloth napkins",
  "Flannel shirts",
  "Microfiber cleaning cloths",
  "Cotton skirts",
  "Reusable shopping bags"
];

document.addEventListener('DOMContentLoaded', function() {
  var customerId = localStorage.getItem('selectedCustomerId') || '';
  var customerName = '';
  if (customerId) {
    // Get customer details from stat_array
    var customers = JSON.parse(localStorage.getItem('stat_array') || '[]');
    var found = customers.find(c => c.customerId1 === customerId);
    if (found) {
      customerName = (found.surname1 || '') + ' ' + (found.otherName1 || '');
    }
  }

  document.getElementById('customerIdDisplay').value = customerId;
  document.getElementById('customerNameDisplay').value = customerName;

  // Auto-fill Service Type textbox from localStorage, linked to customerId
  // TEST: If service entry for cu46590 is missing, add a sample entry
  if (customerId === 'cu46590') {
    var serviceEntriesTest = JSON.parse(localStorage.getItem('serviceEntries') || '[]');
    var exists = serviceEntriesTest.some(e => String(e.customerId).trim() === 'cu46590');
    if (!exists) {
      serviceEntriesTest.push({ customerId: 'cu46590', serviceType: 'Normal Delivery' });
      localStorage.setItem('serviceEntries', JSON.stringify(serviceEntriesTest));
      console.log('Test service entry added for cu46590 with serviceType Normal Delivery');
    }
  }
  // Debugging output
  console.log('serviceEntries:', JSON.parse(localStorage.getItem('serviceEntries') || '[]'));
  console.log('stat_array:', JSON.parse(localStorage.getItem('stat_array') || '[]'));
  console.log('customerId:', customerId);
  var serviceTypeInput = document.getElementById('serviceTypeDisplay');
  var serviceTypeValue = '';
  try {
    var serviceEntries = JSON.parse(localStorage.getItem('serviceEntries') || '[]');
    var serviceEntry = serviceEntries.find(e => String(e.customerId).trim() === String(customerId).trim());
    if (serviceEntry && serviceEntry.serviceType) {
      serviceTypeValue = serviceEntry.serviceType;
    } else {
      // Fallback: try stat_array
      var statArray = JSON.parse(localStorage.getItem('stat_array') || '[]');
      var statEntry = statArray.find(e => String(e.customerId1).trim() === String(customerId).trim());
      if (statEntry && statEntry.serviceType) {
        serviceTypeValue = statEntry.serviceType;
      } else {
        console.log('Service type not found for customerId:', customerId);
      }
    }
  } catch (err) {
    serviceTypeValue = '';
    console.error('Error fetching service type:', err);
  }
  serviceTypeInput.value = serviceTypeValue;


  // Get selects by new unique IDs
  var laundryTypeSelect = document.getElementById('laundryTypeSelect');
  var clothingTypeSelect = document.getElementById('clothingTypeSelect');
  // Removed priceMsg logic (only needed for assignService)

  function populateClothingType(optionsArray) {
    clothingTypeSelect.innerHTML = '';
    optionsArray.forEach(function(item) {
      var opt = document.createElement('option');
      opt.value = item;
      opt.textContent = item;
      clothingTypeSelect.appendChild(opt);
    });
  }

  // Initial population
  if (laundryTypeSelect.value === 'laundry') {
    populateClothingType(laundryItems);
  } else if (laundryTypeSelect.value === 'drycleaning') {
    populateClothingType(dryCleaningItems);
  }

  laundryTypeSelect.addEventListener('change', function() {
    if (laundryTypeSelect.value === 'laundry') {
      populateClothingType(laundryItems);
    } else if (laundryTypeSelect.value === 'drycleaning') {
      populateClothingType(dryCleaningItems);
    } else {
      clothingTypeSelect.innerHTML = '';
    }
  });

  // No price logic needed for assignItems
});

// ...existing code...
// Utility to save to localStorage (append to array)
function saveToStore(key, value) {
  let arr = JSON.parse(localStorage.getItem(key) || '[]');
  arr.push(value);
  localStorage.setItem(key, JSON.stringify(arr));
}

// Utility to get all assignments for a customerId
function getAssignmentsByCustomerId(customerId) {
  let arr = JSON.parse(localStorage.getItem('assignments') || '[]');
  return arr.filter(entry => entry.customerId === customerId);
}


// Handler for Register Service Entry button
function registerItemAssignment() {
  var customerId = document.getElementById('customerIdDisplay').value.trim();
  var customerName = document.getElementById('customerNameDisplay').value.trim();
  var laundryType = document.getElementById('laundryTypeSelect').value;
  var clothingType = document.getElementById('clothingTypeSelect').value;
  var clothDescription = document.getElementById('clothDescriptionInput').value.trim();

  if (!customerId || !customerName || !laundryType || !clothingType || !clothDescription) {
    console.log('DEBUG: customerId:', customerId);
    console.log('DEBUG: customerName:', customerName);
    console.log('DEBUG: laundryType:', laundryType);
    console.log('DEBUG: clothingType:', clothingType);
    console.log('DEBUG: clothDescription:', clothDescription);
    alert('Please fill in all fields.');
    return;
  }

  var assignment = {
    customerId: customerId,
    customerName: customerName,
    laundryType: laundryType,
    clothingType: clothingType,
    clothDescription: clothDescription
  };
  saveToStore('assignments', assignment);
  alert('Assignment saved successfully!');
}
