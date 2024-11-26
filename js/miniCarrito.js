/**
 * Programacion 1
 * Contreras, Nairut
 * Gesualdi, Afonso
 */
'use strict'

// Referencia global para el mini-carrito cuando hover
const carritoBtn = document.querySelector(".carrito");
const miniContainer = document.createElement("div");

miniContainer.className = "mini-cart";
miniContainer.style.display = "none";

// Creación de un contenedor para el botón del carrito y el mini-cart
const carritoWrapper = document.createElement("div");
carritoWrapper.className = "carrito-wrapper";
carritoBtn.parentNode.appendChild(carritoWrapper);

// Añade el botón del carrito y el mini-carrito al contenedor
carritoWrapper.appendChild(carritoBtn);
carritoWrapper.appendChild(miniContainer);

// Evento para mostrar y ocultar el mini-cart
carritoWrapper.addEventListener("mouseover", showMiniCarrito);
carritoWrapper.addEventListener("mouseout", hideMiniCarrito);
miniContainer.addEventListener("mouseover", showMiniCarrito);
miniContainer.addEventListener("mouseout", hideMiniCarrito);

// Función para mostrar el mini-carrito
function showMiniCarrito() {
    miniContainer.style.display = "block";
    renderMiniCarrito();
}

// Función para ocultar el mini-carrito
function hideMiniCarrito() {
    miniContainer.style.display = "none";
}

// Función de renderización del mini-carrito
function renderMiniCarrito() {
    // Limpia el mini-cart antes de ser renderizado
    miniContainer.innerHTML = "";

    // Contenedor para los items del carrito
    const itemsContainer = document.createElement("div");

    // Variable para guardar el total
    let total = 0;

    // Bucle por los productos en el carrito
    for (const productId in carrito) {
        const item = carrito[productId];
        total += item.price * item.cantidad;

        // Contenedor del item en el mini-cart
        const itemContainer = document.createElement("div");
        itemContainer.className = "mini-cart-item d-flex align-items-center";

        // Imagen del producto
        const itemImage = document.createElement("img");
        itemImage.src = item.image;  // Accede a la URL de la imagen del JSON
        itemImage.alt = item.name;
        itemImage.className = "mini-cart-image img-thumbnail me-2"; // Añade clases de Bootstrap

        // Nombre y cantidad del producto
        const itemName = document.createElement("span");
        itemName.textContent = `${item.name} (x${item.cantidad})`;
        itemName.className = "mini-cart-name";

        // Precio del item
        const itemPrice = document.createElement("span");
        itemPrice.textContent = `U$ ${(item.price * item.cantidad).toFixed(2)}`;
        itemPrice.className = "mini-cart-price ms-auto";

        // Añade la imagen, el nombre y el precio al contenedor del item
        itemContainer.appendChild(itemImage);
        itemContainer.appendChild(itemName);
        itemContainer.appendChild(itemPrice);

        // Añade el itemContainer al itemsContainer
        itemsContainer.appendChild(itemContainer);
    }

    // Añade el contenedor de items al mini-cart
    miniContainer.appendChild(itemsContainer);

    // Sección de subtotal
    const totalContainer = document.createElement("div");
    totalContainer.className = "mini-cart-total d-flex justify-content-between align-items-center mt-3 text-dark";

    const totalLabel = document.createElement("span");
    totalLabel.textContent = "Total: U$ ";

    const totalAmount = document.createElement("span");
    totalAmount.textContent = total.toFixed(2);

    totalContainer.appendChild(totalLabel);
    totalContainer.appendChild(totalAmount);

    // Botón de checkout
    const checkoutBtn = document.createElement("button");
    checkoutBtn.className = "btn btn-primary btn-sm w-100 mt-2";
    checkoutBtn.textContent = "Finalizar la compra";
    checkoutBtn.addEventListener("click", checkout);

    // Añade el subtotal y el botón de checkout al mini-cart
    miniContainer.appendChild(totalContainer);
    miniContainer.appendChild(checkoutBtn);
}