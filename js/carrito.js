'use strict'

// Variable para agregar los productos al carrito
let carrito = {};

// Funcion para cargar el carrito del localStorange
function cargarCarritoDeLocalStorage() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
}

// Funcion para salvar el carrito en localStorange
function guardarCarritoNoLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Cargar el carrito cuando incia la pagina
cargarCarritoDeLocalStorage();
renderCartModal();

// Función que abre el carrito
document.querySelector(".carrito").addEventListener("click", openCarrito);
/**
 * function openCarrito() {
    if (!document.getElementById("modal-back")) {
        const modalBackground = document.createElement("div");
        modalBackground.className = "modal-back";

        modalBackground.innerHTML = 
            <div class="card-modal">
                <div class="modal-encabezado">
                    <h2>Carrito</h2>
                    <button id="cierreModal" type="button" class="btn btn-primary">X</button>
                </div>
                <div class="linea"></div>
                <div class="card-carrito px-5" id="cartItemsContainer"></div>
                <div class="botones">
                    <button type="button" class="btn btn-primary mt-lg-3 mx-auto" onclick="checkout()">Comprar</button>
                    <button type="button" class="btn btn-primary mt-lg-3 mx-auto" onclick="clearCart()">Quitar Carrito</button>
                </div>
            </div>
        ;

        document.body.appendChild(modalBackground);
        document.getElementById("cierreModal").addEventListener("click", closeCarrito);
    }
    renderCartModal();
}
    
 */

// Función que abre el carrito
document.querySelector(".carrito").addEventListener("click", openCarrito);

function openCarrito() {
    if (!document.getElementById("modal-back")) {
        const modalBackground = document.createElement("div");
        modalBackground.className = "modal-back";
        modalBackground.id = "modal-back";

        const cardModal = document.createElement("div");
        cardModal.className = "card-modal";

        const modalHeader = document.createElement("div");
        modalHeader.className = "modal-encabezado";

        const modalTitle = document.createElement("h2");
        modalTitle.textContent = "Carrito";

        const closeModalButton = document.createElement("button");
        closeModalButton.id = "cierreModal";
        closeModalButton.type = "button";
        closeModalButton.className = "btn btn-primary";
        closeModalButton.textContent = "X";
        closeModalButton.addEventListener("click", closeCarrito);

        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeModalButton);

        const linea = document.createElement("div");
        linea.className = "linea";

        const cartItemsContainer = document.createElement("div");
        cartItemsContainer.className = "card-carrito px-5";
        cartItemsContainer.id = "cartItemsContainer";

        const botones = document.createElement("div");
        botones.className = "botones";

        const comprarButton = document.createElement("button");
        comprarButton.type = "button";
        comprarButton.className = "btn btn-primary mt-lg-3 mx-auto";
        comprarButton.textContent = "Comprar";
        comprarButton.addEventListener("click", checkout);

        const clearButton = document.createElement("button");
        clearButton.type = "button";
        clearButton.className = "btn btn-primary mt-lg-3 mx-auto";
        clearButton.textContent = "Quitar Carrito";
        clearButton.addEventListener("click", clearCart);

        botones.appendChild(comprarButton);
        botones.appendChild(clearButton);

        cardModal.appendChild(modalHeader);
        cardModal.appendChild(linea);
        cardModal.appendChild(cartItemsContainer);
        cardModal.appendChild(botones);

        modalBackground.appendChild(cardModal);

        document.body.appendChild(modalBackground);
    }
    renderCartModal();
}

// Cierre del modal
function closeCarrito() {
    const modal = document.querySelector(".modal-back");
    if (modal) {
        modal.remove();
    }
}

/**
 * function renderCartModal() {
    const carritoContainer = document.getElementById("cartItemsContainer");
    if (carritoContainer) {
        carritoContainer.innerHTML = "";

        let total = 0;
        let totalItems = 0;

        for (const productoId in carrito) {
            const item = carrito[productoId];
            const itemTotal = item.price * item.cantidad;
            total += itemTotal;
            totalItems += item.cantidad;

            const carritoItem = document.createElement("div");
            carritoItem.classList.add("card", "mb-3");
            carritoItem.innerHTML = 
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${item.image}" alt="${item.name}" class="img-fluid img-stl">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h3 class="card-title">${item.name}</h3>
                            <span class="card-text text-body-secondary">Restan ${item.stock} en stock</span>
                            <span class="card-text text-body-secondary">Cantidad: ${item.cantidad}</span>
                            <span class="h3 text-center fw-semibold my-lg-5">U$${itemTotal.toLocaleString()}</span>
                        </div>
                        <div class="button-card">
                            <button type="button" class="btn btn-primary mt-lg-3 mx-auto" onclick="checkoutItem(${productoId})">Agregar mas</button>
                            <button type="button" class="btn btn-primary mt-lg-3 mx-auto" onclick="removeFromCart(${productoId})">Borrar</button>
                        </div>
                    </div>
                </div>
            ;

            carritoContainer.appendChild(carritoItem);
        }

        // agregar la cantidade total de itens y el valor total
        const totalContainer = document.createElement("div");
        totalContainer.className = "total-info d-flex justify-content-between mt-3";
        
        const totalItemsLabel = document.createElement("span");
        totalItemsLabel.textContent = Total de itens: ${totalItems};

        const totalAmountLabel = document.createElement("span");
        totalAmountLabel.textContent = Total a pagar: U$ ${total.toFixed(2)};

        totalContainer.appendChild(totalItemsLabel);
        totalContainer.appendChild(totalAmountLabel);

        carritoContainer.appendChild(totalContainer);
    }
}
 */

// Funcion para renderizar los items del carrito
function renderCartModal() {
    const carritoContainer = document.getElementById("cartItemsContainer");
    if (carritoContainer) {
        carritoContainer.textContent = "";

        let total = 0;
        let totalItems = 0;

        for (const productoId in carrito) {
            const item = carrito[productoId];
            const itemTotal = item.price * item.cantidad;
            total += itemTotal;
            totalItems += item.cantidad;

            const carritoItem = document.createElement("div");
            carritoItem.className = "card mb-3";

            const row = document.createElement("div");
            row.className = "row g-0";

            const colImg = document.createElement("div");
            colImg.className = "col-md-4 align-content-center";

            const img = document.createElement("img");
            img.src = item.image;
            img.alt = item.name;
            img.className = "img-fluid mt-auto";

            colImg.appendChild(img);

            const colDetails = document.createElement("div");
            colDetails.className = "col-md-8";

            const cardBody = document.createElement("div");
            cardBody.className = "card-body";

            const title = document.createElement("h3");
            title.className = "card-title";
            title.textContent = item.name;

            // Aquí están los cambios sugeridos
            const stockInfo = document.createElement("span");
            stockInfo.className = "card-text text-body-secondary p-1";
            stockInfo.textContent = `Restan ${item.stock} en stock`;

            const quantityInfo = document.createElement("span");
            quantityInfo.className = "card-text text-body-secondary";
            quantityInfo.textContent = `Cantidad: ${item.cantidad}`;

            const priceInfo = document.createElement("span");
            priceInfo.className = "h3 text-center fw-semibold my-lg-5";
            priceInfo.textContent = `U$${itemTotal.toLocaleString()}`;

            // Nuevo contenedor para stock y cantidad
            const stockCantidadContainer = document.createElement("div");
            stockCantidadContainer.className = "d-flex justify-content-between my-2"; // Clase para organizar el diseño flexible
            stockCantidadContainer.appendChild(stockInfo);
            stockCantidadContainer.appendChild(quantityInfo);

            // Añade los elementos al cardBody
            cardBody.appendChild(title);
            cardBody.appendChild(stockCantidadContainer); // Añade el nuevo contenedor
            cardBody.appendChild(priceInfo);

            // Ajusta los botones
            const buttonCard = document.createElement("div");
            buttonCard.className = "button-card d-flex justify-content-around mt-1 mb-3"; // Clase para organizar los botones

            const addButton = document.createElement("button");
            addButton.type = "button";
            addButton.className = "btn btn-primary mx-auto";
            addButton.textContent = "Agregar más";
            addButton.addEventListener("click", function () {
                checkoutItem(productoId);
            });

            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.className = "btn btn-danger mx-auto";
            deleteButton.textContent = "Borrar";
            deleteButton.addEventListener("click", function () {
                removeFromCart(productoId);
            });

            buttonCard.appendChild(addButton);
            buttonCard.appendChild(deleteButton);

            // Ensambla el modal
            colDetails.appendChild(cardBody);
            colDetails.appendChild(buttonCard);
            row.appendChild(colImg);
            row.appendChild(colDetails);
            carritoItem.appendChild(row);
            carritoContainer.appendChild(carritoItem);
        }

        // Renderizar total
        const totalContainer = document.createElement("div");
        totalContainer.className = "total-info d-flex justify-content-between mt-3";

        const totalItemsLabel = document.createElement("span");
        totalItemsLabel.textContent = `Total de ítems: ${totalItems}`;

        const totalAmountLabel = document.createElement("span");
        totalAmountLabel.textContent = `Total a pagar: U$${total.toFixed(2)}`;

        totalContainer.appendChild(totalItemsLabel);
        totalContainer.appendChild(totalAmountLabel);

        carritoContainer.appendChild(totalContainer);
    }
}

// Función para agregar un producto al carrito
function agregarAlCarrito(productId) {
    const producto = productosGlobal.find(p => p.id === productId);
    if (!producto) return;

    if (carrito[productId]) {
        if (carrito[productId].cantidad < producto.stock) {
            carrito[productId].cantidad++;
            alert(`El producto "${producto.name}" fue agregado al carrito con éxito!`);
        } else {
            alert("Estoque insuficiente!");
        }
    } else {
        carrito[productId] = { ...producto, cantidad: 1 };
        alert(`El producto "${producto.name}" fue agregado al carrito con éxito!`);
    }
    //Salvar o carrinho atualizado no localStorage
    guardarCarritoNoLocalStorage();
}
// Función para aumentar la cantidad de un producto
function checkoutItem(productoId) {
    const producto = carrito[productoId];
    
    // Verifica se a quantidade do produto no carrinho já atingiu o limite do estoque
    if (producto && producto.cantidad < producto.stock) {
        producto.cantidad++;
        guardarCarritoNoLocalStorage();
        renderCartModal();
    } else {
        alert("Não é possível adicionar mais deste produto. Estoque insuficiente!");
    }
}

// Función para eliminar un producto del carrito
function removeFromCart(productoId) {
    if (carrito[productoId]) {
        carrito[productoId].cantidad--;
        if (carrito[productoId].cantidad === 0) {
            delete carrito[productoId];
        }
        guardarCarritoNoLocalStorage();
        renderCartModal();
    }
}

// Función para vaciar el carrito
function clearCart() {
    carrito = {};
    guardarCarritoNoLocalStorage();
    renderCartModal();
}

// Función de checkout
function checkout() {
    if (Object.keys(carrito).length > 0) {
        alert("Gracias por tu compra!");
        clearCart();
    } else {
        alert("Tu carrito está vacío");
    }
}

