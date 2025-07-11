document.addEventListener('DOMContentLoaded', () => {
    const clientsTableBody = document.querySelector('#clientsTable tbody');
    const addClientForm = document.getElementById('addClientForm');

    // Function to load clients from the API
    async function loadClients() {
        try {
            const response = await fetch('http://localhost:3000/clients');
            if (!response.ok) throw new Error('Network response was not ok');
            const clients = await response.json();
            displayClients(clients);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }

    // Function to display clients in the table
    function displayClients(clients) {
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

    // Function to add a new client
    addClientForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const email = document.getElementById('email').value;

        try {
            const response = await fetch('http://localhost:3000/clients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, address, email })
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const newClient = await response.json();
            displayClients([newClient]);
            addClientForm.reset();
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    });

    // Function to edit a client
    window.editClient = async function(clientId) {
        const name = prompt('Enter new name:');
        const address = prompt('Enter new address:');
        const email = prompt('Enter new email:');

        if (name && address && email) {
            try {
                const response = await fetch(`http://localhost:3000/clients/${clientId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, address, email })
                });
                if (!response.ok) throw new Error('Network response was not ok');
                loadClients();
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        }
    };

    // Function to delete a client
    window.deleteClient = async function(clientId) {
        if (confirm('Are you sure you want to delete this client?')) {
            try {
                const response = await fetch(`http://localhost:3000/clients/${clientId}`, {
                    method: 'DELETE'
                });
                if (!response.ok) throw new Error('Network response was not ok');
                loadClients();
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        }
    };
});