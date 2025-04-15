document.addEventListener("DOMContentLoaded", function () {
    const ostoskoriList = document.getElementById("ostoskoriList");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        ostoskoriList.innerHTML = "<p class='text-center'>Ostoskorissa ei ole tuotteita.</p>";
        return;
    }

    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "card mb-3 p-3";
        div.innerHTML = `
            <h4>${item.itemName}</h4>
            <p>Määrä: ${item.quantity}</p>
            <p>Hinta: ${item.price}€</p>
            <p>Yhteensä: ${item.total}€</p>
            <button class="btn btn-danger" onclick="removeFromCart(${index})">Poista</button>
        `;
        ostoskoriList.appendChild(div);
    });
});

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}
