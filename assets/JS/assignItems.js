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

// Global variables
let itemCount = 1;

document.addEventListener('DOMContentLoaded', function() {
    // Load customer data
    const customerId = localStorage.getItem('selectedCustomerId') || '';
    const customerName = getCustomerName(customerId);
    const serviceType = getServiceType(customerId);

    // Set form values
    document.getElementById('customerIdDisplay').value = customerId;
    document.getElementById('customerNameDisplay').value = customerName;
    document.getElementById('serviceTypeDisplay').value = serviceType || 'Not specified';

    // Initialize first laundry type dropdown
    const firstLaundrySelect = document.querySelector('.laundry-type-select');
    firstLaundrySelect.addEventListener('change', function() {
        populateClothingTypes(this);
    });
    populateClothingTypes(firstLaundrySelect);

    // Set up button event listeners
    document.getElementById('addNewItemBtn').addEventListener('click', addNewItemForm);
    document.getElementById('proceedToPickupBtn').addEventListener('click', proceedToPickup);
});

function getCustomerName(customerId) {
    const customers = JSON.parse(localStorage.getItem('stat_array') || '[]');
    const customer = customers.find(c => c.customerId1 === customerId);
    return customer ? `${customer.surname1} ${customer.otherName1}` : '';
}

function getServiceType(customerId) {
    const serviceEntries = JSON.parse(localStorage.getItem('serviceEntries') || '[]');
    const serviceEntry = serviceEntries.find(e => e.customerId === customerId);
    return serviceEntry ? serviceEntry.serviceType : null;
}

function populateClothingTypes(selectElement) {
    const clothingTypeSelect = selectElement.closest('.item-form').querySelector('.clothing-type-select');
    clothingTypeSelect.innerHTML = '';
    
    const items = selectElement.value === 'drycleaning' ? dryCleaningItems : laundryItems;
    
    items.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        clothingTypeSelect.appendChild(option);
    });
}

function addNewItemForm() {
    itemCount++;
    const newItemForm = document.createElement('div');
    newItemForm.className = 'item-form';
    newItemForm.id = `itemForm_${itemCount-1}`;
    newItemForm.innerHTML = `
        <div class="item-form-header">
            <h5><i class="fa fa-tshirt"></i> Item #${itemCount}</h5>
            <span class="remove-item-btn" onclick="removeItemForm(${itemCount-1})">
                <i class="fa fa-times"></i> Remove
            </span>
        </div>
        <div class="w3-row-padding" style="margin: 0 -16px">
            <div class="w3-col m4 l4 w3-margin-bottom">
                <label><i class="fa fa-truck-fast fa-fw"></i> Laundry Type</label>
                <select class="w3-input w3-border laundry-type-select" required>
                    <option value="">-- Select Laundry Type --</option>
                    <option value="laundry">Laundry</option>
                    <option value="drycleaning">Dry Cleaning</option>
                </select>
            </div>
            <div class="w3-col m4 l4 w3-margin-bottom">
                <label><i class="fa fa-truck-fast fa-fw"></i> Clothing Type</label>
                <select class="w3-input w3-border clothing-type-select" required>
                    <option value="">-- Select Clothing Type --</option>
                </select>
            </div>
            <div class="w3-col m4 l4 w3-margin-bottom">
                <label><i class="fa fa-align-left fa-fw"></i> Item Description</label>
                <input class="w3-input w3-border cloth-description-input" type="text" placeholder="Enter item description..." required/>
            </div>
            <div class="w3-col m4 l4 w3-margin-bottom">
                <label><i class="fa fa-hashtag fa-fw"></i> Quantity</label>
                <input class="w3-input w3-border item-quantity-input" type="number" min="1" value="1" required/>
            </div>
        </div>
    `;
    document.getElementById('itemsContainer').appendChild(newItemForm);
    
    // Add event listener to the new laundry type select
    const newLaundrySelect = newItemForm.querySelector('.laundry-type-select');
    newLaundrySelect.addEventListener('change', function() {
        populateClothingTypes(this);
    });
}

function removeItemForm(index) {
    const formToRemove = document.getElementById(`itemForm_${index}`);
    if (formToRemove) {
        formToRemove.remove();
        // Update item numbers
        const forms = document.querySelectorAll('.item-form');
        forms.forEach((form, i) => {
            form.querySelector('h5').innerHTML = `<i class="fa fa-tshirt"></i> Item #${i+1}`;
        });
        itemCount = forms.length;
    }
}

function proceedToPickup() {
    // Get all item forms
    const itemForms = document.querySelectorAll('.item-form');
    const customerId = document.getElementById('customerIdDisplay').value.trim();
    const customerName = document.getElementById('customerNameDisplay').value.trim();
    const serviceType = document.getElementById('serviceTypeDisplay').value.trim();
    
    // Validate at least one item has been added
    if (itemForms.length === 0) {
        alert('Please add at least one item before proceeding.');
        return;
    }
    
    // Process each item form
    itemForms.forEach((form, index) => {
        const laundryType = form.querySelector('.laundry-type-select').value;
        const clothingType = form.querySelector('.clothing-type-select').value;
        const clothDescription = form.querySelector('.cloth-description-input').value.trim();
        const quantity = form.querySelector('.item-quantity-input').value;
        
        // Validate inputs
        if (!laundryType || !clothingType || !clothDescription) {
            alert(`Please fill all fields for Item #${index+1}`);
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
            serviceType: serviceType,
            timestamp: new Date().toISOString()
        };
        
        saveToStore('assignments', assignment);
    });
    
    // Redirect to pickup page
    window.location.href = "pickup.html";
}

function saveToStore(key, value) {
    const arr = JSON.parse(localStorage.getItem(key) || '[]');
    arr.push(value);
    localStorage.setItem(key, JSON.stringify(arr));
}