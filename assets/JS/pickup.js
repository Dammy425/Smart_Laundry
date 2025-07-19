document.addEventListener('DOMContentLoaded', function() {
    // Load all necessary data from localStorage
    const customers = getFromStore('stat');
    const assignments = getFromStore('assignments');
    const serviceEntries = getFromStore('serviceEntries');
    
    // Get the table body element
    const tableBody = document.querySelector("#tbStudent tbody");
    if (!tableBody) return;
    
    // Clear existing rows
    tableBody.innerHTML = '';
    
    // Group assignments by customerId for easier processing
    const assignmentsByCustomer = {};
    assignments.forEach(assignment => {
        if (!assignmentsByCustomer[assignment.customerId]) {
            assignmentsByCustomer[assignment.customerId] = [];
        }
        assignmentsByCustomer[assignment.customerId].push(assignment);
    });
    
    // Process each customer who has assignments
    Object.keys(assignmentsByCustomer).forEach(customerId => {
        // Find customer details
        const customer = customers.find(c => c.customerId1 === customerId);
        const customerName = customer ? `${customer.surname1} ${customer.otherName1}` : 'Unknown Customer';
        
        // Find service type
        const serviceEntry = serviceEntries.find(s => s.customerId === customerId);
        const serviceType = serviceEntry ? serviceEntry.serviceType : 'Normal Delivery';
        
        // Process each assignment for this customer
        assignmentsByCustomer[customerId].forEach(assignment => {
            const row = document.createElement("tr");
            
            // Create delivery time estimate based on service type
            let deliveryTime;
            switch(serviceType) {
                case 'Super Express Delivery':
                    deliveryTime = '20 mins';
                    break;
                case 'Express Delivery':
                    deliveryTime = '2 hours';
                    break;
                default:
                    deliveryTime = '16 hours';
            }
            
            row.innerHTML = `
                <td>${customerId}</td>
                <td>${assignment.clothingType}</td>
                <td>${assignment.clothDescription}</td>
                <td>${assignment.quantity || 1}</td>
                <td>${serviceType}</td>
                <td>${deliveryTime}</td>
                <td><button class="w3-button w3-green accept-btn" data-service="${serviceType}">Accept Order</button></td>
            `;
            
            tableBody.appendChild(row);
        });
    });
    
    // If no assignments found, show a message
    if (tableBody.innerHTML === '') {
        const row = document.createElement("tr");
        row.innerHTML = `<td colspan="7" class="w3-center">No pickup items found</td>`;
        tableBody.appendChild(row);
    }
    
    // Add event listeners to all accept buttons
    document.querySelectorAll('.accept-btn').forEach(button => {
        button.addEventListener('click', function() {
            const serviceType = this.getAttribute('data-service');
            let deliveryTime;
            
            switch(serviceType) {
                case 'Super Express Delivery':
                    deliveryTime = '20 mins';
                    break;
                case 'Express Delivery':
                    deliveryTime = '2 hours';
                    break;
                default:
                    deliveryTime = '16 hours';
            }
            
            this.textContent = `Accepted (${deliveryTime} delivery)`;
            this.classList.remove('w3-green');
            this.classList.add('w3-blue');
            this.disabled = true;
            
            alert(`Order accepted! Estimated delivery time: ${deliveryTime}`);
            
            // Update dashboard stats
            updateDashboardStats();
        });
    });
});