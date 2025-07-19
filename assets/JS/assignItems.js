// Clothing type options
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
  // Load customer data
  const customerId = localStorage.getItem('selectedCustomerId') || '';
  const customerName = getCustomerName(customerId);
  const serviceType = getServiceType(customerId);

  // Set form values
  document.getElementById('customerIdDisplay').value = customerId;
  document.getElementById('customerNameDisplay').value = customerName;
  document.getElementById('serviceTypeDisplay').value = serviceType || 'Not specified';

  // Initialize laundry type dropdown
  const laundryTypeSelect = document.getElementById('laundryTypeSelect');
  const clothingTypeSelect = document.getElementById('clothingTypeSelect');

  // Populate clothing types based on laundry type selection
  laundryTypeSelect.addEventListener('change', function() {
    populateClothingTypes(this.value);
  });

  // Initialize with laundry items by default
  populateClothingTypes('laundry');

  // Set up button event listeners
  document.getElementById('addNewItemBtn').addEventListener('click', addNewItem);
  document.getElementById('proceedToPickupBtn').addEventListener('click', proceedToPickup);
});

function getCustomerName(customerId) {
  const customers = getFromStore('stat');
  const customer = customers.find(c => c.customerId1 === customerId);
  return customer ? `${customer.surname1} ${customer.otherName1}` : '';
}

function getServiceType(customerId) {
  const serviceEntries = getFromStore('serviceEntries');
  const serviceEntry = serviceEntries.find(e => e.customerId === customerId);
  return serviceEntry ? serviceEntry.serviceType : null;
}

function populateClothingTypes(laundryType) {
  const clothingTypeSelect = document.getElementById('clothingTypeSelect');
  clothingTypeSelect.innerHTML = '';

  const items = laundryType === 'drycleaning' ? dryCleaningItems : laundryItems;
  
  items.forEach(item => {
    const option = document.createElement('option');
    option.value = item;
    option.textContent = item;
    clothingTypeSelect.appendChild(option);
  });
}

function addNewItem() {
  const customerId = document.getElementById('customerIdDisplay').value.trim();
  const customerName = document.getElementById('customerNameDisplay').value.trim();
  const laundryType = document.getElementById('laundryTypeSelect').value;
  const clothingType = document.getElementById('clothingTypeSelect').value;
  const clothDescription = document.getElementById('clothDescriptionInput').value.trim();
  const quantity = document.getElementById('itemQuantityInput').value || 1;

  // Validate inputs
  if (!validateInputs(customerId, laundryType, clothingType, clothDescription)) {
    return;
  }

  // Create and save the assignment
  const assignment = {
    customerId: customerId,
    customerName: customerName,
    laundryType: laundryType,
    clothingType: clothingType,
    clothDescription: clothDescription,
    quantity: quantity,
    timestamp: new Date().toISOString()
  };

  saveToStore('assignments', assignment);
  
  // Also save to items for dashboard counting
  saveToStore('item', {
    customerId: customerId,
    itemType: clothingType,
    description: clothDescription,
    date: new Date().toISOString()
  });
  
  alert('Item added successfully!');
  resetForm();
  updateDashboardStats();
}

function proceedToPickup() {
  const customerId = document.getElementById('customerIdDisplay').value.trim();
  const assignments = getFromStore('assignments');
  const customerAssignments = assignments.filter(a => a.customerId === customerId);

  if (customerAssignments.length === 0) {
    alert('Please add at least one item before proceeding.');
    return;
  }

  window.location.href = "pickup.html";
}

function validateInputs(customerId, laundryType, clothingType, clothDescription) {
  if (!customerId) {
    alert('Customer information is missing. Please start from registration.');
    return false;
  }

  if (!laundryType || laundryType === "-- Select Laundry Type --") {
    alert('Please select a laundry type.');
    return false;
  }

  if (!clothingType || clothingType === "-- Select Clothing Type --") {
    alert('Please select a clothing type.');
    return false;
  }

  if (!clothDescription || clothDescription.length < 3) {
    alert('Please enter a valid description (at least 3 characters).');
    return false;
  }

  return true;
}

function resetForm() {
  document.getElementById('clothDescriptionInput').value = '';
  document.getElementById('clothingTypeSelect').selectedIndex = 0;
  document.getElementById('itemQuantityInput').value = 1;
}