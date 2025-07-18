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

  // Auto-fill Service Type textbox from localStorage
  var serviceTypeInput = document.getElementById('serviceTypeDisplay');
  var serviceTypeValue = '';
  try {
    var serviceEntries = JSON.parse(localStorage.getItem('serviceEntries') || '[]');
    var serviceEntry = serviceEntries.find(e => String(e.customerId).trim() === String(customerId).trim());
    if (serviceEntry && serviceEntry.serviceType) {
      serviceTypeValue = serviceEntry.serviceType;
    } else {
      console.log('Service type not found for customerId:', customerId);
    }
  } catch (err) {
    serviceTypeValue = '';
    console.error('Error fetching service type:', err);
  }
  serviceTypeInput.value = serviceTypeValue;

  // Get selects by new unique IDs
  var laundryTypeSelect = document.getElementById('laundryTypeSelect');
  var clothingTypeSelect = document.getElementById('clothingTypeSelect');

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
});

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

  // Validate all required fields
  if (!customerId || !customerName || !laundryType || !clothingType || !clothDescription) {
    alert('Please fill in all fields.');
    return;
  }

  // Validate clothing type selection
  if (clothingType === "-- Select Clothing Type --") {
    alert('Please select a valid clothing type.');
    return;
  }

  // Validate cloth description length
  if (clothDescription.length < 3) {
    alert('Please enter a more detailed description (at least 3 characters).');
    return;
  }

  var assignment = {
    customerId: customerId,
    customerName: customerName,
    laundryType: laundryType,
    clothingType: clothingType,
    clothDescription: clothDescription,
    dateRegistered: new Date().toISOString() // Add timestamp for tracking
  };

  // Save the assignment
  saveToStore('assignments', assignment);
  
  // Show success message
  alert('Item registered successfully! Redirecting to pickup page...');
  
  // Clear the form (optional)
  document.getElementById('clothDescriptionInput').value = '';
  
  // Redirect to pickup page after 1 second
  setTimeout(function() {
    window.location.href = "pickup.html";
  }, 1000);
}