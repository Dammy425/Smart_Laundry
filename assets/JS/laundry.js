// =================================================================================
// CORE UTILITY FUNCTIONS
// =================================================================================

document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.querySelector("#tbStudent tbody");
  
  // This listener ensures that code only runs on pages that have the customer table.
  if (tableBody) {
    calculateDashboardStats();
    showRegisteredCustomers();

    // --- EVENT LISTENER FOR DYNAMIC BUTTONS (EDIT/REMOVE) ---
    // This uses event delegation to handle clicks on buttons that don't exist when the page first loads.
    tableBody.addEventListener('click', function(e) {
      const targetButton = e.target.closest('button'); // Find the button that was clicked
      if (!targetButton) return;

      const customerId = targetButton.getAttribute('data-customer-id');

      // Handle Edit Button Click
      if (targetButton.classList.contains('edit-btn')) {
        editCustomer(customerId);
      }
      // Handle Remove Button Click
      if (targetButton.classList.contains('remove-btn')) {
        removeCustomer(customerId);
      }
    });
  }
});

function getFromStore(key) {
  const data = localStorage.getItem(key + '_array');
  return data ? JSON.parse(data) : [];
}

function saveToStore(key, obj) {
  const arr = getFromStore(key);
  arr.push(obj);
  localStorage.setItem(key + '_array', JSON.stringify(arr));
}

// Sidebar navigation functions
var mySidebar = document.getElementById("mySidebar");
var overlayBg = document.getElementById("myOverlay");

function w3_open() {
  if (mySidebar) mySidebar.style.display = "block";
  if (overlayBg) overlayBg.style.display = "block";
}

function w3_close() {
  if (mySidebar) mySidebar.style.display = "none";
  if (overlayBg) overlayBg.style.display = "none";
}

function showAddForm() {
  window.location.href = "register.html";
}

// =================================================================================
// DASHBOARD & DATA FUNCTIONS
// =================================================================================

function showRegisteredCustomers() {
  const customers = getFromStore('stat');
  const tableBody = document.querySelector("#tbStudent tbody");
  if (!tableBody) return;

  tableBody.innerHTML = "";
  if (!customers || customers.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="10" class="w3-center">No customers registered yet.</td></tr>`;
      return;
  }

  customers.forEach((customer) => {
    // Ensure customer is a valid object before creating a row
    if (customer && customer.customerId1) {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${customer.customerId1}</td>
        <td>${customer.surname1 || ''}</td>
        <td>${customer.otherName1 || ''}</td>
        <td>${customer.mobileNo1 || ''}</td>
        <td>${customer.email1 || ''}</td>
        <td>${customer.address1 || ''}</td>
        <td>${customer.stateId || ''}</td>
        <td>${customer.cityId || ''}</td>
        <td style="font-weight: bold;">${customer.statusId || ''}</td>
        <td>
            <button class="w3-button w3-tiny w3-blue edit-btn" data-customer-id="${customer.customerId1}">Edit</button>
            <button class="w3-button w3-tiny w3-red remove-btn" data-customer-id="${customer.customerId1}">Remove</button>
        </td>
        `;
        tableBody.appendChild(row);
    }
  });
}

function calculateDashboardStats() {
  const today = new Date().toISOString().split('T')[0];
  
  const customers = getFromStore('stat');
  const assignments = getFromStore('assignments');
  const services = getFromStore('service');
  
  const totalCustomers = customers.filter(c => typeof c === 'object' && c !== null).length;
  const totalItems = assignments.length;
  
  let dailyCollected = 0;
  assignments.forEach(assignment => {
    const assignmentDate = assignment.timestamp ? new Date(assignment.timestamp).toISOString().split('T')[0] : '';
    if (assignment.accepted === true && assignmentDate === today) {
        dailyCollected += parseInt(assignment.quantity, 10) || 1;
    }
  });

  let dailyRevenue = 0;
  services.forEach(service => {
    const serviceDate = service.date ? new Date(service.date).toISOString().split('T')[0] : '';
    if (serviceDate === today) {
      dailyRevenue += parseFloat(service.servicePrice) || 0;
    }
  });
  
  // Update dashboard cards if they exist on the page
  const totalCustomersEl = document.getElementById('totalCustomers');
  if (totalCustomersEl) totalCustomersEl.textContent = totalCustomers;
  
  const totalItemsEl = document.getElementById('totalItems');
  if (totalItemsEl) totalItemsEl.textContent = totalItems;
  
  const dailyCollectedEl = document.getElementById('dailyCollected');
  if (dailyCollectedEl) dailyCollectedEl.textContent = dailyCollected;
  
  const dailyRevenueEl = document.getElementById('dailyRevenue');
  if (dailyRevenueEl) dailyRevenueEl.textContent = `₦${dailyRevenue.toFixed(2)}`;
}

function updateDashboardStats() {
  calculateDashboardStats();
}

function clearClassItems() {
  if (confirm('Are you sure you want to clear ALL application data? This cannot be undone.')) {
    localStorage.removeItem('stat_array');
    localStorage.removeItem('assignments_array');
    localStorage.removeItem('serviceEntries_array');
    localStorage.removeItem('item_array');
    localStorage.removeItem('service_array');
    localStorage.removeItem('selectedCustomerId');
    localStorage.removeItem('customerIdToEdit');
    alert("All application data has been cleared.");
    window.location.reload();
  }
}

// =================================================================================
// NEW EDIT AND REMOVE FUNCTIONS
// =================================================================================

function removeCustomer(customerId) {
    if (confirm(`Are you sure you want to remove customer ${customerId}? This will also remove their associated items.`)) {
        // Remove the customer
        let customers = getFromStore('stat');
        customers = customers.filter(c => c && c.customerId1 !== customerId);
        localStorage.setItem('stat_array', JSON.stringify(customers));
        
        // Also remove their associated assignments and items for dashboard counting
        let assignments = getFromStore('assignments');
        assignments = assignments.filter(a => a && a.customerId !== customerId);
        localStorage.setItem('assignments_array', JSON.stringify(assignments));
        
        let items = getFromStore('item');
        items = items.filter(i => i && i.customerId !== customerId);
        localStorage.setItem('item_array', JSON.stringify(items));

        alert('Customer removed successfully.');
        
        // Refresh the UI
        showRegisteredCustomers();
        updateDashboardStats();
    }
}

function editCustomer(customerId) {
    // Store the ID of the customer to be edited and redirect
    localStorage.setItem('customerIdToEdit', customerId);
    window.location.href = 'edit.html';
}


// =================================================================================
// CENTRALIZED UTILITY FUNCTION
// =================================================================================

function checkUser(inputElementId, redirectUrl) {
    const input = document.getElementById(inputElementId);
    const customerId = input.value.trim();
    let msgDiv = document.getElementById('checkUserMsg');
    
    if (!msgDiv) {
        msgDiv = document.createElement('div');
        msgDiv.id = 'checkUserMsg';
        msgDiv.style.marginTop = '10px';
        input.parentNode.appendChild(msgDiv);
    }
    
    if (!customerId) {
        msgDiv.innerHTML = '<span style="color:red">Please enter a Customer ID.</span>';
        return;
    }
    
    if (!customerId.toLowerCase().startsWith('cu')) {
        msgDiv.innerHTML = '<span style="color:red">Customer ID must start with "cu".</span>';
        return;
    }
    
    const customers = getFromStore('stat');
    const found = customers.find(c => c.customerId1 === customerId);
    
    if (found) {
        msgDiv.innerHTML = `<span style='color:green'>Customer Found: <b>${found.surname1} ${found.otherName1}</b></span>`;
        localStorage.setItem('selectedCustomerId', customerId);
        
        let countdown = 3;
        msgDiv.innerHTML += `<br><span style='color:blue'>Redirecting in <b id='countdown'>${countdown}</b> seconds...</span>`;
        
        const interval = setInterval(function() {
            countdown--;
            const countdownEl = document.getElementById('countdown');
            if (countdownEl) {
                countdownEl.textContent = countdown;
            }
            if (countdown <= 0) {
                clearInterval(interval);
                window.location.href = redirectUrl;
            }
        }, 1000);
    } else {
        msgDiv.innerHTML = '<span style="color:red">No customer found with that ID.</span>';
    }
}