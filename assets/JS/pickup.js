// pickup.js

document.addEventListener('DOMContentLoaded', function() {
    // Load all necessary data from localStorage
    const customers = JSON.parse(localStorage.getItem('stat_array') || '[]');
    const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    const serviceEntries = JSON.parse(localStorage.getItem('serviceEntries') || '[]');
    
    // Get the table body element
    const tableBody = document.querySelector("#tbStudent tbody");
    if (!tableBody) {
        console.warn('Table body for #tbStudent not found');
        return;
    }
    
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
        const serviceType = serviceEntry ? serviceEntry.serviceType : 'Not Specified';
        
        // Process each assignment for this customer
        assignmentsByCustomer[customerId].forEach(assignment => {
            const row = document.createElement("tr");
            
            row.innerHTML = `
                <td>${customerId}</td>
                <td>${assignment.clothingType}</td>
                <td>${assignment.clothDescription}</td>
                <td>1</td> <!-- Assuming quantity is 1 per item -->
                <td>${serviceType}</td>
            `;
            
            tableBody.appendChild(row);
        });
    });
    
    // If no assignments found, show a message
    if (tableBody.innerHTML === '') {
        const row = document.createElement("tr");
        row.innerHTML = `<td colspan="5" class="w3-center">No pickup items found</td>`;
        tableBody.appendChild(row);
    }
});

// Helper function to format service type display
function formatServiceType(serviceType) {
    if (!serviceType) return 'Not Specified';
    
    const typeMap = {
        'Normal Delivery': 'Normal',
        'Express Delivery': 'Express',
        'Super Express Delivery': 'Super Express'
    };
    
    return typeMap[serviceType] || serviceType;
}