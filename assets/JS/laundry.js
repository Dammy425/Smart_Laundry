// document.addEventListener("DOMContentLoaded", function () {
//   clearAllLocalStorage();
// });
// function clearAllLocalStorage() {
//   localStorage.clear();
//   alert('All localStorage data cleared!');
//   showRegisteredCustomers();
// }

document.addEventListener("DOMContentLoaded", function () {
  // Initialize the dashboard
  if (document.querySelector('#tbStudent')) {
    showRegisteredCustomers();
  }
  calculateDashboardStats();
});

function getFromStore(key) {
  const data = localStorage.getItem(key + '_array') || localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

function saveToStore(key, obj) {
  const arr = getFromStore(key);
  arr.push(obj);
  localStorage.setItem(key + '_array', JSON.stringify(arr));
  updateDashboardStats();
}

function setToStore(key, value) {
  if (typeof localStorage !== 'undefined' && localStorage) {
    localStorage.setItem(key, value);
  } else {
    console.error('Local storage is not available.');
  }
}

// Sidebar functions
var mySidebar = document.getElementById("mySidebar");
var overlayBg = document.getElementById("myOverlay");

function w3_open() {
  if (mySidebar.style.display === "block") {
    mySidebar.style.display = "none";
    overlayBg.style.display = "none";
  } else {
    mySidebar.style.display = "block";
    overlayBg.style.display = "block";
  }
}

function w3_close() {
  mySidebar.style.display = "none";
  overlayBg.style.display = "none";
}

function showAddForm() {
  window.location.href = "register.html";
}

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
      <td>${customer.statusId || ''}</td>
    `;
    tableBody.appendChild(row);
  });
}

function calculateDashboardStats() {
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Get all data from localStorage
  const customers = getFromStore('stat') || [];
  const items = getFromStore('item') || [];
  const services = getFromStore('service') || [];
  const assignments = getFromStore('assignments') || [];
  
  // Calculate totals
  const totalCustomers = customers.length;
  const totalItems = items.length + assignments.length; // Count both items and assignments
  
  // Calculate daily collected items and revenue
  let dailyCollected = 0;
  let dailyRevenue = 0;
  
  services.forEach(service => {
    const serviceDate = service.date ? new Date(service.date).toISOString().split('T')[0] : '';
    if (serviceDate === today) {
      dailyCollected += service.items ? service.items.length : 0;
      dailyRevenue += parseFloat(service.totalAmount) || 0;
    }
  });
  
  // Update the dashboard
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
  if (confirm('Are you sure you want to clear all customer data?')) {
    localStorage.removeItem('stat_array');
    showRegisteredCustomers();
    calculateDashboardStats();
  }
}