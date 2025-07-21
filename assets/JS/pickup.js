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
        const customer = customers.find(c => c && c.customerId1 === assignment.customerId);
        const serviceEntry = serviceEntries.find(s => s && s.customerId === assignment.customerId);
        
        const serviceType = serviceEntry ? serviceEntry.serviceType : 'Normal Delivery';
        
        let deliveryTime;
        switch(serviceType) {
            case 'Super Express Delivery': deliveryTime = '20 mins'; break;
            case 'Express Delivery': deliveryTime = '2 hours'; break;
            default: deliveryTime = '16 hours';
        }

        const isAccepted = assignment.accepted === true;
        const row = document.createElement("tr");

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
    
    // Add event listeners to all 'Accept Order' buttons
    document.querySelectorAll('.accept-btn').forEach(button => {
        button.addEventListener('click', function() {
            const serviceType = this.getAttribute('data-service');
            const timestamp = this.getAttribute('data-timestamp');
            
            const assignmentIndex = assignments.findIndex(a => a.timestamp === timestamp);

            if (assignmentIndex !== -1) {
                // 1. Mark the assignment as accepted
                assignments[assignmentIndex].accepted = true;
                localStorage.setItem('assignments_array', JSON.stringify(assignments));

                // ==========================================================
                // === NEW LOGIC: Update Customer Status to 'Active' ===
                // ==========================================================
                
                // 2. Get the customer ID from this assignment
                const customerIdToUpdate = assignments[assignmentIndex].customerId;
                
                // 3. Load all customers
                let allCustomers = getFromStore('stat');
                const customerIndex = allCustomers.findIndex(c => c && c.customerId1 === customerIdToUpdate);
                
                // 4. Find the customer, check their status, and update if needed
                if (customerIndex !== -1 && allCustomers[customerIndex].statusId !== 'Active') {
                    allCustomers[customerIndex].statusId = 'Active';
                    
                    // 5. Save the updated list of customers back to localStorage
                    localStorage.setItem('stat_array', JSON.stringify(allCustomers));
                    console.log(`Customer ${customerIdToUpdate}'s status has been set to Active.`);
                }
                // ==========================================================
                // === END OF NEW LOGIC ===
                // ==========================================================

                // 6. Update the UI and notify the user
                let deliveryTime;
                switch(serviceType) {
                    case 'Super Express Delivery': deliveryTime = '20 mins'; break;
                    case 'Express Delivery': deliveryTime = '2 hours'; break;
                    default: deliveryTime = '16 hours';
                }
                
                this.textContent = `Accepted (${deliveryTime} delivery)`;
                this.classList.remove('w3-green');
                this.classList.add('w3-blue');
                this.disabled = true;
                
                alert(`Order accepted! Estimated delivery time: ${deliveryTime}`);
                
                updateDashboardStats(); // Update dashboard counts immediately
            }
        });
    });
});