'use strict';

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

// Variable para controlar si el mouse está sobre el carrito o el mini-carrito
let isHovering = false;

// Evento para mostrar el mini-carrito cuando el mouse está sobre el carritoWrapper
carritoWrapper.addEventListener("mouseover", () => {
    isHovering = true;
    showMiniCarrito();
});

// Evento para ocultar el mini-carrito cuando el mouse sale de carritoWrapper y miniContainer
carritoWrapper.addEventListener("mouseout", () => {
    setTimeout(() => {
        if (!isHovering) hideMiniCarrito();
    }, 100); // Delay para permitir transición
});

// Evento para mantener visible el mini-carrito cuando el mouse está sobre miniContainer
miniContainer.addEventListener("mouseover", () => {
    isHovering = true;
});

// Evento para ocultar el mini-carrito cuando el mouse sale de miniContainer
miniContainer.addEventListener("mouseout", () => {
    isHovering = false;
    setTimeout(() => {
        if (!isHovering) hideMiniCarrito();
    }, 100); // Delay para evitar ocultar inmediatamente
});

// Función para mostrar el mini-carrito
function showMiniCarrito() {
    if (window.matchMedia("(min-width: 992px)").matches) {
        miniContainer.style.display = "block";
        renderMiniCarrito();
    }
}

// Función para ocultar el mini-carrito
function hideMiniCarrito() {
    miniContainer.style.display = "none";
}

// Listener para ajustar la visibilidad según el tamaño de la pantalla
function updateMiniCarritoVisibility() {
    if (!window.matchMedia("(min-width: 992px)").matches) {
        miniContainer.style.display = "none"; // Ocultar en tamaños menores
    }
}

// Llama a la función al cargar la página y en cada cambio de tamaño
window.addEventListener("resize", updateMiniCarritoVisibility);
updateMiniCarritoVisibility();

// Función de renderización del mini-carrito
function renderMiniCarrito() {
    miniContainer.innerHTML = ""; // Limpia el mini-carrito antes de renderizarlo

    const itemsContainer = document.createElement("div");
    let total = 0;

    for (const productId in carrito) {
        const item = carrito[productId];
        total += item.price * item.cantidad;

        const itemContainer = document.createElement("div");
        itemContainer.className = "mini-cart-item d-flex align-items-center";

        const itemImage = document.createElement("img");
        itemImage.src = item.image;
        itemImage.alt = item.name;
        itemImage.className = "mini-cart-image img-thumbnail me-2";

        const itemName = document.createElement("span");
        itemName.textContent = `${item.name} (x${item.cantidad})`;
        itemName.className = "mini-cart-name";

        const itemPrice = document.createElement("span");
        itemPrice.textContent = `U$ ${(item.price * item.cantidad).toFixed(2)}`;
        itemPrice.className = "mini-cart-price ms-auto";

        itemContainer.appendChild(itemImage);
        itemContainer.appendChild(itemName);
        itemContainer.appendChild(itemPrice);
        itemsContainer.appendChild(itemContainer);
    }

    miniContainer.appendChild(itemsContainer);

    const totalContainer = document.createElement("div");
    totalContainer.className =
        "mini-cart-total d-flex justify-content-between align-items-center mt-3 text-dark";

    const totalLabel = document.createElement("span");
    totalLabel.textContent = "Total: U$ ";

    const totalAmount = document.createElement("span");
    totalAmount.textContent = total.toFixed(2);

    totalContainer.appendChild(totalLabel);
    totalContainer.appendChild(totalAmount);

    const checkoutBtn = document.createElement("button");
    checkoutBtn.className = "btn btn-primary btn-sm w-100 mt-2";
    checkoutBtn.textContent = "Finalizar la compra";
    checkoutBtn.addEventListener("click", checkout);

    miniContainer.appendChild(totalContainer);
    miniContainer.appendChild(checkoutBtn);
}
