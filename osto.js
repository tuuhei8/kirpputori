document.addEventListener("DOMContentLoaded", function () {
    const hylly = document.getElementById("hylly");

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    function displayOrders() {
        hylly.innerHTML = ""; 

        if (orders.length === 0) {
            hylly.innerHTML = "<p class='text-center'>Ei myynnissä olevia esineitä.</p>";
            return;
        }

        orders.forEach(order => {
            const div = document.createElement("div");
            div.className = "esineet"; 

            div.innerHTML = `
                <div class="card shadow-sm p-3 mb-4 bg-white rounded">
                    <div class="card-body text-center">
                        <h3 class="text-center m-2">${order.itemName}</h3>
                        <h5 class="mt-1">Kuvaus:</h5>
                        <p>Määrä: ${order.quantity}</p>
                        <p>Hinta: <strong>${order.price}€</strong></p>
                        <p><strong>Yhteensä: ${order.total}€</strong></p>
                        <button class="btn btn-success">Lisää ostoskoriin</button>
                    </div>
                </div>
            `;

            hylly.appendChild(div);
        });
    }

    displayOrders();
});
