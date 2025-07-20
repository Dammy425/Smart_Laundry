document.addEventListener('DOMContentLoaded', function() {
document.getElementById('btnCheckUser').addEventListener('click', function() {
// Call the new centralized function from laundry.js
checkUser('customerIdCheck', 'assignItems.html');
});
});

function checkUser() {
    const input = document.getElementById('customerIdCheck');
    const customerId = input.value.trim();
    let msgDiv = document.getElementById('checkUserMsg');
    
    if (!msgDiv) {
        msgDiv = document.createElement('div');
        msgDiv.id = 'checkUserMsg';
        input.parentNode.appendChild(msgDiv);
    }
    
    if (!customerId) {
        msgDiv.innerHTML = '<span style="color:red">Please enter a Customer ID.</span>';
        return;
    }
    
    if (!customerId.toLowerCase().includes('cu')) {
        msgDiv.innerHTML = '<span style="color:red">Customer ID must include "cu".</span>';
        return;
    }
    
    const customers = getFromStore('stat');
    const found = customers.find(c => c.customerId1 === customerId);
    
    if (found) {
        msgDiv.innerHTML = `<span style='color:green'>Customer Found: <b>${found.surname1} ${found.otherName1}</b></span>`;
        localStorage.setItem('selectedCustomerId', customerId);
        
        let countdown = 5;
        msgDiv.innerHTML += `<br><span style='color:blue'>Redirecting in <b id='countdown'>${countdown}</b> seconds...</span>`;
        alert('Redirecting in 5 seconds...');
        
        const interval = setInterval(function() {
            countdown--;
            document.getElementById('countdown').textContent = countdown;
            if (countdown === 0) {
                clearInterval(interval);
                window.location.href = 'assignItems.html';
            }
        }, 1000);
    } else {
        msgDiv.innerHTML = '<span style="color:red">No customer found with that ID.</span>';
    }
}