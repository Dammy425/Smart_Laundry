document.addEventListener('DOMContentLoaded', function() {
    // Load all necessary data from localStorage
    const customers = getFromStore('stat');
    let assignments = getFromStore('assignments'); // Use 'let' to allow modification
    const serviceEntries = getFromStore('serviceEntries');
    
    // Get the table body element
    const tableBody = document.querySelector("#tbStudent tbody");
    if (!tableBody) return;
    
    // Clear existing rows
    tableBody.innerHTML = '';
    
    // If no assignments found, show a message
    if (!assignments || assignments.length === 0) {
        const row = document.createElement("tr");
        row.innerHTML = `<td colspan="7" class="w3-center">No pickup items found</td>`;
        tableBody.appendChild(row);
        return; // Exit if no assignments
    }
    
    // Process each assignment
    assignments.forEach(assignment => {
        const customer = customers.find(c => c.customerId1 === assignment.customerId);
        const serviceEntry = serviceEntries.find(s => s.customerId === assignment.customerId);
        
        const serviceType = serviceEntry ? serviceEntry.serviceType : 'Normal Delivery';
        
        let deliveryTime;
        switch(serviceType) {
            case 'Super Express Delivery': deliveryTime = '20 mins'; break;
            case 'Express Delivery': deliveryTime = '2 hours'; break;
            default: deliveryTime = '16 hours';
        }

        // Check if the order has been accepted
        const isAccepted = assignment.accepted === true;

        const row = document.createElement("tr");

        // Conditionally render the button based on the 'accepted' state
        const buttonHtml = isAccepted
            ? `<button class="w3-button w3-blue" disabled>Accepted (${deliveryTime} delivery)</button>`
            : `<button class="w3-button w3-green accept-btn" data-timestamp="${assignment.timestamp}" data-service="${serviceType}">Accept Order</button>`;

        row.innerHTML = `
            <td>${assignment.customerId}</td>
            <td>${assignment.clothingType}</td>
            <td>${assignment.clothDescription}</td>
            <td>${assignment.quantity || 1}</td>
            <td>${serviceType}</td>
            <td>${deliveryTime}</td>
            <td>${buttonHtml}</td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Add event listeners to all accept buttons that are not disabled
    document.querySelectorAll('.accept-btn').forEach(button => {
        button.addEventListener('click', function() {
            const serviceType = this.getAttribute('data-service');
            const timestamp = this.getAttribute('data-timestamp');
            
            // Find the item in the assignments array and update its state
            const assignmentIndex = assignments.findIndex(a => a.timestamp === timestamp);
            if (assignmentIndex !== -1) {
                assignments[assignmentIndex].accepted = true;
                
                // Save the entire updated array back to localStorage
                localStorage.setItem('assignments_array', JSON.stringify(assignments));
                
                let deliveryTime;
                switch(serviceType) {
                    case 'Super Express Delivery': deliveryTime = '20 mins'; break;
                    case 'Express Delivery': deliveryTime = '2 hours'; break;
                    default: deliveryTime = '16 hours';
                }
                
                // Update the button's appearance and state
                this.textContent = `Accepted (${deliveryTime} delivery)`;
                this.classList.remove('w3-green');
                this.classList.add('w3-blue');
                this.disabled = true;
                
                alert(`Order accepted! Estimated delivery time: ${deliveryTime}`);
                
                // Update dashboard stats immediately
                updateDashboardStats();
            }
        });
    });
});