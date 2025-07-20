// Clothing type options
const dryCleaningItems = [
  "-- Select Clothing Type --",
  "Wool or silk suits", "Blazers (structured)", "Tuxedos", "Evening gowns",
  "Silk or satin dresses", "Beaded/embellished garments", "Wool coats", "Cashmere overcoats",
  "Leather/suede jackets", "Fur-trimmed coats", "Silk blouses", "Cashmere sweaters",
  "Linen suits", "Velvet clothing", "Taffeta/chiffon dresses", "Wool trousers",
  "Pleated skirts", "Silk neckties", "Delicate scarves", "Vintage/high-end designer wear",
  "Structured work uniforms"
];

const laundryItems = [
  "-- Select Clothing Type --",
  "Cotton t-shirts", "Jeans & denim", "Sweatshirts & hoodies", "Pajamas & loungewear",
  "Underwear & socks", "Bed sheets & pillowcases", "Bath towels", "Gym clothes (polyester blends)",
  "Knit cotton dresses", "Stretchy leggings", "Baby clothes (non-delicate)", "Canvas sneakers (washable)",
  "Cotton button-down shirts", "Shorts (cotton/polyester)", "Swimwear (machine-washable)",
  "Aprons & cloth napkins", "Flannel shirts", "Microfiber cleaning cloths", "Cotton skirts",
  "Reusable shopping bags"
];

let itemCounter = 1;

document.addEventListener('DOMContentLoaded', function() {
  // --- INITIALIZATION ---
  loadCustomerData();

  // Populate the first item form's clothing types based on the default laundry type
  const firstLaundrySelect = document.querySelector('#itemForm_0 .laundry-type-select');
  populateClothingTypes(firstLaundrySelect);

  // --- EVENT LISTENERS ---
  document.getElementById('addNewItemBtn').addEventListener('click', addNewItemForm);
  document.getElementById('proceedToPickupBtn').addEventListener('click', saveAllItemsAndProceed);

  // Use event delegation for dynamic elements within the container
  const itemsContainer = document.getElementById('itemsContainer');
  
  // Listener for REMOVE button clicks
  itemsContainer.addEventListener('click', function(e) {
    // Traverse up to find the remove button if an icon inside it was clicked
    const removeBtn = e.target.closest('.remove-item-btn');
    if (removeBtn) {
      removeForm(removeBtn);
    }
  });
  
  // Listener for LAUNDRY TYPE changes
  itemsContainer.addEventListener('change', function(e) {
    if (e.target.classList.contains('laundry-type-select')) {
      populateClothingTypes(e.target);
    }
  });
});

// --- CORE FUNCTIONS ---

function loadCustomerData() {
  const customerId = localStorage.getItem('selectedCustomerId') || '';
  const customers = getFromStore('stat');
  const serviceEntries = getFromStore('serviceEntries');

  const customer = customers.find(c => c.customerId1 === customerId);
  const serviceEntry = serviceEntries.find(e => e.customerId === customerId);
  
  const customerName = customer ? `${customer.surname1} ${customer.otherName1}` : 'N/A';
  const serviceType = serviceEntry ? serviceEntry.serviceType : 'Not Specified';

  document.getElementById('customerIdDisplay').value = customerId;
  document.getElementById('customerNameDisplay').value = customerName;
  document.getElementById('serviceTypeDisplay').value = serviceType;
}

function addNewItemForm() {
  itemCounter++;
  const itemsContainer = document.getElementById('itemsContainer');
  
  // Clone the last item form available
  const lastForm = itemsContainer.lastElementChild;
  const newForm = lastForm.cloneNode(true);

  // Update ID and title
  newForm.id = `itemForm_${itemCounter}`;
  newForm.querySelector('.item-title').innerHTML = `<i class="fa fa-tshirt"></i> Item #${itemCounter}`;
  
  // Clear input fields in the new form
  newForm.querySelector('.laundry-type-select').selectedIndex = 0;
  newForm.querySelector('.clothing-type-select').innerHTML = '<option value="">-- Select Clothing Type --</option>';
  newForm.querySelector('.cloth-description-input').value = '';
  newForm.querySelector('.item-quantity-input').value = '1';
  newForm.style.border = '1px solid #ddd'; // Reset border style

  // Show the remove button
  newForm.querySelector('.remove-item-btn').style.display = 'inline';

  itemsContainer.appendChild(newForm);
}

function removeForm(removeBtn) {
  const formToRemove = removeBtn.closest('.item-form');
  // Do not remove if it's the only form left
  if (document.querySelectorAll('.item-form').length > 1) {
    formToRemove.remove();
    updateFormNumbers();
  }
}

function updateFormNumbers() {
  const allForms = document.querySelectorAll('.item-form');
  itemCounter = 1; // Reset global counter
  allForms.forEach(form => {
    form.querySelector('.item-title').innerHTML = `<i class="fa fa-tshirt"></i> Item #${itemCounter}`;
    itemCounter++;
  });
  itemCounter--; // Adjust counter to be the last index
}

function populateClothingTypes(laundrySelectElement) {
  const laundryType = laundrySelectElement.value;
  // Find the clothing select within the same form
  const clothingSelect = laundrySelectElement.closest('.item-form').querySelector('.clothing-type-select');
  
  clothingSelect.innerHTML = ''; // Clear existing options
  const items = laundryType === 'drycleaning' ? dryCleaningItems : laundryItems;
  
  items.forEach(item => {
    const option = document.createElement('option');
    option.value = item;
    option.textContent = item;
    clothingSelect.appendChild(option);
  });
}

function saveAllItemsAndProceed() {
  const allForms = document.querySelectorAll('.item-form');
  let allItemsData = [];
  let allValid = true;

  const customerId = document.getElementById('customerIdDisplay').value;
  const customerName = document.getElementById('customerNameDisplay').value;

  // --- VALIDATION PASS ---
  allForms.forEach(form => {
    form.style.border = '1px solid #ddd'; // Reset border
    const laundryType = form.querySelector('.laundry-type-select').value;
    const clothingType = form.querySelector('.clothing-type-select').value;
    const description = form.querySelector('.cloth-description-input').value.trim();
    const quantity = form.querySelector('.item-quantity-input').value;

    if (!laundryType || !clothingType || clothingType === '-- Select Clothing Type --' || !description || description.length < 3) {
      allValid = false;
      form.style.border = '2px solid red';
    } else {
      allItemsData.push({
        laundryType,
        clothingType,
        clothDescription: description,
        quantity,
      });
    }
  });

  // --- SAVE AND REDIRECT PASS ---
  if (allValid) {
    if (allItemsData.length === 0) {
        alert("Please add at least one item.");
        return;
    }

    allItemsData.forEach(itemData => {
      // Create the object to be saved for the pickup page
      const assignment = {
        customerId: customerId,
        customerName: customerName,
        laundryType: itemData.laundryType,
        clothingType: itemData.clothingType,
        clothDescription: itemData.clothDescription,
        quantity: itemData.quantity,
        timestamp: new Date().toISOString()
      };
      
      // Save to 'assignments' for the pickup page logic
      saveToStore('assignments', assignment);
      
      // Save to 'item' for dashboard counting
      saveToStore('item', {
        customerId: customerId,
        itemType: itemData.clothingType,
        description: itemData.clothDescription,
        date: new Date().toISOString()
      });
    });

    alert(`Successfully added ${allItemsData.length} item(s). Proceeding to pickup.`);
    updateDashboardStats(); // Ensure dashboard is updated
    window.location.href = 'pickup.html';

  } else {
    alert('Please correct the highlighted item(s). All fields are required and description must be at least 3 characters.');
  }
}