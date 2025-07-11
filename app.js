// Function to load clients from the API
async function loadClients() {
    try {
        const response = await fetch('http://localhost:3000/clients?' + new Date().getTime());
        if (!response.ok) throw new Error('Network response was not ok');
        const clients = await response.json();
        displayClients(clients);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

// Function to display clients in the table
function displayClients(clients) {
    const clientsTableBody = document.querySelector('#clientsTable tbody');
    if (!clientsTableBody) return;
    clientsTableBody.innerHTML = '';
    clients.forEach(client => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${client.name}</td>
            <td>${client.address}</td>
            <td>${client.email}</td>
            <td>
                <button onclick="editClient('${client._id}')">Edit</button>
                <button onclick="deleteClient('${client._id}')">Delete</button>
            </td>
        `;
        clientsTableBody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const addClientForm = document.getElementById('addClientForm');

    // Function to handle form submission (both add and edit)
    addClientForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const clientId = document.getElementById('clientId').value;
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const email = document.getElementById('email').value;

        try {
            if (clientId) {
                // Edit existing client
                const response = await fetch(`http://localhost:3000/clients/${clientId}?_=${new Date().getTime()}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, address, email })
                });
                if (!response.ok) throw new Error('Network response was not ok');
            } else {
                // Add new client
                const response = await fetch('http://localhost:3000/clients', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, address, email })
                });
                if (!response.ok) throw new Error('Network response was not ok');
            }

            // Reset form and reload clients
            loadClients();
            addClientForm.reset();
            document.getElementById('submitBtn').textContent = 'Save Client';
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    });

    // Function to edit a client - populates form with client data
    window.editClient = async function(clientId) {
        try {
            const response = await fetch(`http://localhost:3000/clients/${clientId}?_=${new Date().getTime()}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const client = await response.json();

            // Populate form fields with client data
            document.getElementById('clientId').value = client._id;
            document.getElementById('name').value = client.name;
            document.getElementById('address').value = client.address;
            document.getElementById('email').value = client.email;

            // Change button text to indicate edit mode
            document.getElementById('submitBtn').textContent = 'Update Client';

            // Scroll to form for better UX
            document.getElementById('addClientForm').scrollIntoView({ behavior: 'smooth' });

        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    };

    // Function to delete a client
    window.deleteClient = async function(clientId) {
        if (confirm('Are you sure you want to delete this client?')) {
            try {
                const response = await fetch(`http://localhost:3000/clients/${clientId}?_=${new Date().getTime()}`, {
                    method: 'DELETE'
                });
                if (!response.ok) throw new Error('Network response was not ok');
                loadClients();
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        }
    };

    // Don't load clients automatically on page load - only when button is clicked
});