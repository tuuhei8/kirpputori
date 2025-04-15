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
            div.className = "esineet col-md-4"; 

            div.innerHTML = `
                <div class="card shadow-sm p-3 mb-4 bg-white rounded">
                    <div class="card-body text-center">
                        <h3 class="text-center m-2">${order.itemName}</h3>
                        <h5 class="mt-1">Kuvaus:</h5>
                        <p>Määrä: ${order.quantity}</p>
                        <p>Hinta: <strong>${order.price}€</strong></p>
                        <p><strong>Yhteensä: ${order.total}€</strong></p>
                        <button class="btn btn-success add-to-cart">Lisää ostoskoriin</button>
                    </div>
                </div>
            `;

            hylly.appendChild(div);
        });
    }

    displayOrders();
});
window.addToCart = function(order) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(order);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Tuote lisätty ostoskoriin!");
};

hylly.addEventListener("click", function (e) {
    if (e.target.classList.contains("add-to-cart")) {
        const card = e.target.closest(".card-body");
        const itemName = card.querySelector("h3").textContent;
        const quantityText = card.querySelector("p:nth-of-type(1)").textContent;
        const priceText = card.querySelector("p:nth-of-type(2)").textContent;

        const quantity = parseInt(quantityText.replace("Määrä: ", ""));
        const price = parseFloat(priceText.replace("Hinta: ", "").replace("€", ""));
        const total = (quantity * price).toFixed(2);

        const order = { itemName, quantity, price, total };
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(order);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Tuote lisätty ostoskoriin!");
    }
});
