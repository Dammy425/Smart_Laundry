// =================================================================================
// CORE UTILITY FUNCTIONS
// =================================================================================

document.addEventListener("DOMContentLoaded", function () {
  // This runs on every page. Initialize dashboard stats if on the index page.
  if (document.getElementById('totalCustomers')) {
    calculateDashboardStats();
    showRegisteredCustomers();
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
  if (!customers || customers.length === 0) return;

  customers.forEach((customer) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${customer.customerId1 || ''}</td>
      <td>${customer.surname1 || ''}</td>
      <td>${customer.otherName1 || ''}</td>
      <td>${customer.mobileNo1 || ''}</td>
      <td>${customer.email1 || ''}</td>
      <td>${customer.address1 || ''}</td>
      <td>${customer.stateId || ''}</td>
      <td>${customer.cityId || ''}</td>
      <td style="font-weight: bold;">${customer.statusId || ''}</td>
    `;
    tableBody.appendChild(row);
  });
}

function calculateDashboardStats() {
  const today = new Date().toISOString().split('T')[0];
  
  const customers = getFromStore('stat');
  const assignments = getFromStore('assignments');
  const services = getFromStore('service');
  
  const totalCustomers = customers.filter(c => typeof c === 'object').length;
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
  
  if (document.getElementById('totalCustomers')) {
    document.getElementById('totalCustomers').textContent = totalCustomers;
  }
  if (document.getElementById('totalItems')) {
    document.getElementById('totalItems').textContent = totalItems;
  }
  if (document.getElementById('dailyCollected')) {
    document.getElementById('dailyCollected').textContent = dailyCollected;
  }
  if (document.getElementById('dailyRevenue')) {
    document.getElementById('dailyRevenue').textContent = `₦${dailyRevenue.toFixed(2)}`;
  }
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
    alert("All application data has been cleared.");
    window.location.reload();
  }
}

// =================================================================================
// NEW CENTRALIZED UTILITY FUNCTION
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
            if (document.getElementById('countdown')) {
                document.getElementById('countdown').textContent = countdown;
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