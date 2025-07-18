// document.addEventListener("DOMContentLoaded", function () {
//   clearAllLocalStorage();
// });
// function clearAllLocalStorage() {
//   localStorage.clear();
//   alert('All localStorage data cleared!');
//   showRegisteredCustomers();
// }

function getFromStore(key) {
  const data = localStorage.getItem(key + '_array');
  return data ? JSON.parse(data) : [];
}

function saveToStore(key, obj) {
  const arr = getFromStore(key);
  arr.push(obj);
  localStorage.setItem(key + '_array', JSON.stringify(arr));
}

function setToStore(key, value) {
  if (typeof localStorage !== 'undefined' && localStorage) {
    localStorage.setItem(key, value);
  } else {
    console.error('Local storage is not available.');
  }
}

function getFromStore(key) {
  const data = localStorage.getItem(key + '_array');
  return data ? JSON.parse(data) : [];
}
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
  const customers =  getFromStore('stat');
  const tableBody = document.querySelector("#tbStudent tbody");
  if (!tableBody) {
    console.warn('Table body for #tbStudent not found. Skipping rendering.');
    return;
  }
  tableBody.innerHTML = "";

  if (!customers || customers.length === 0) {
    console.log('No registered customers found in localStorage.');
    return;
  }

  customers.forEach((customer) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${customer.customerId1}</td>
      <td>${customer.surname1}</td>
      <td>${customer.otherName1}</td>
      <td>${customer.mobileNo1}</td>
      <td>${customer.email1}</td>
      <td>${customer.address1}</td>
      <td>${customer.stateId}</td>
      <td>${customer.cityId}</td>
      <td>${customer.statusId}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Call showRegisteredCustomers on page load only if table exists
document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('#tbStudent')) {
    showRegisteredCustomers();
  }
});