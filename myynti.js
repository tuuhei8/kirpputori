document.addEventListener("DOMContentLoaded", function () {
    const orderForm = document.getElementById("orderForm");
    const orderList = document.getElementById("orderList");

    // Load saved orders from localStorage
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    renderOrders();

    // Handle form submission
    orderForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const itemName = document.getElementById("item").value.trim();
        const quantity = parseInt(document.getElementById("quantity").value, 10);
        const price = parseFloat(document.getElementById("price").value);

        if (!itemName || isNaN(quantity) || quantity <= 0 || isNaN(price) || price <= 0) {
            alert("Syötä kelvollinen nimi, määrä ja hinta.");
            return;
        }

        const newOrder = { itemName, quantity, price, total: (quantity * price).toFixed(2) };
        orders.push(newOrder);
        saveOrders();
        renderOrders();

        // Clear form fields
        orderForm.reset();
    });

    // Function to render orders in the table
    function renderOrders() {
        orderList.innerHTML = "";
        orders.forEach((order, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${order.itemName}</td>
                <td>${order.quantity}</td>
                <td>${order.price} €</td>
                <td>${order.total} €</td>
                <td><button class="btn btn-danger btn-sm" onclick="deleteOrder(${index})">Poista</button></td>
            `;
            orderList.appendChild(row);
        });
    }

    // Function to delete an order
    window.deleteOrder = function (index) {
        orders.splice(index, 1);
        saveOrders();
        renderOrders();
    };

    // Function to save orders to localStorage
    function saveOrders() {
        localStorage.setItem("orders", JSON.stringify(orders));
    }
});

