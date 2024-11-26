'use strict'

class Detalles {
    constructor(id, name, price, stock, categoria, descriptionUno, descriptionDos, porque, respuesta, features, imageBack, image1, image2, image3, iframeUrl){
        this.id = id,
        this.name = name,
        this.price = price,
        this.stock = stock,
        this.categoria = categoria, 
        this.descriptionUno = descriptionUno,
        this.descriptionDos = descriptionDos,
        this.porque = porque,
        this.respuesta = respuesta,
        this.features = features,
        this.imageBack = imageBack,
        this.image1 = image1,
        this.image2 = image2,
        this.image3 = image3,
        this.iframeUrl = iframeUrl
    }

    toHTML(){

        //Criando el container principal
        const content = document.createElement("section")
        content.classList.add("text-white");

        //Estructura de descrption e imagens

        content.innerHTML = `
        <section class="container">
                <div class="row">
                    <h2 class="col-12 text-center fw-bold fst-italic fs-1">${this.name}</h2>
                    <div class="col-12 col-md-6 justify-content-center align-content-center">
                        <img src="${this.imageBack}" alt="${this.name}" class="img-present img-fluid">
                    </div>
                    <div class="col-12 col-md-6 description-stl">
                        <p>${this.descriptionUno}</p>
                        <p>${this.descriptionDos}</p>
                    </div>
                </div>
                <div class="mt-5 frames-insert mb-5">
                    <iframe src="https://www.youtube.com/embed/IY4x85zqoJM?si=KZe-xYFYsBafzBsq" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            </section>
            <section class="container">
                <div class="row">
                    <div class="col col-md-6">
                        <h3 class="h2">${this.porque}</h3>
                        <p class="fs-5 pt-3">${this.respuesta}</p>
                    </div>
                    <div class="d-none d-md-block image-container col col-md-6">
                        <img src="${this.image1}" alt="${this.name}" class="image1">
                        <img src="${this.image2}" alt="${this.name}" class="image2">
                        <img src="${this.image3}" alt="${this.name}" class="image3">
                    </div>
                </div>
            </section>
        `;


        // Criando as tabelas
        const tableSection = document.createElement("div");
        tableSection.classList.add("container");
        const tableContainer = document.createElement("div");
        const caracteristicasTabla = document.createElement("table");
        caracteristicasTabla.classList.add("table", "table-striped", "text-white");

        const thead = document.createElement("thead");
        thead.innerHTML = `<tr><th>Característica</th><th>Valor</th></tr>`;

        const tbody = document.createElement("tbody");
        for (let [feature, value] of Object.entries(this.features)){
            const row = document.createElement("tr");
            row.innerHTML = `<td>${feature}</td><td>${value}</td>`;
            tbody.appendChild(row);
        }
        
        caracteristicasTabla.appendChild(thead);
        caracteristicasTabla.appendChild(tbody);
        tableContainer.appendChild(caracteristicasTabla);

        //Adiciono la tabla de precio al container

        tableSection.appendChild(tableContainer)
        
        //Adicionamos el precio, medios de pago y btn de compra
        
        //container
        const divPrice = document.createElement("div")
        divPrice.classList.add("d-flex", "flex-column", "flex-lg-row", "justify-content-between", "align-items-center", "text-white");
        //precio
        const divSpan = document.createElement("div")
        divSpan.innerHTML = `<span class = "h1 fw-bold m-auto text-white"> U$ ${this.price}</span>`;
        
        //medio de pago
        const divPago = document.createElement("div");
        divPago.classList.add("payment-info", "text-center", "my-4");

        const h4 = document.createElement("h4");
        h4.classList.add("fw-bold");
        h4.innerText = "Medios de Pago";
        const pInfo = document.createElement("p");
        pInfo.classList.add("mb-2");
        pInfo.textContent = "Aceptamos los siguientes medios de pago:"

        const divIcons = document.createElement("div")
        divIcons.classList.add("d-flex", "justify-content-center", "gap-3");

        divIcons.innerHTML = `
            <i class="bi bi-credit-card fs-3" title="Tarjeta de Crédito"></i>
            <i class="bi bi-cash fs-3" title="Efectivo"></i>
            <i class="bi bi-paypal fs-3" title="PayPal"></i>
            <i class="bi bi-bank fs-3" title="Transferencia Bancaria"></i>
        `;
        
        //btn
        const divBtn = document.createElement("div")
        divBtn.innerHTML = `<button class="btn btn-compra text-white" onclick="agregarAlCarrito(${this.id})">Comprar</button>`

        //adiciono el div de medio de pago
        divPago.appendChild(h4);
        divPago.appendChild(pInfo);
        divPago.appendChild(divIcons)

        //Adiciono todo info valor, pago y btn
        divPrice.appendChild(divSpan);
        divPrice.appendChild(divPago)
        divPrice.appendChild(divBtn);
        tableSection.appendChild(divPrice);

        // Adicionando o conteúdo no main com id "detalles"
        const detallesContainer = document.getElementById("detalles");
        if (detallesContainer){
            detallesContainer.appendChild(content);
            detallesContainer.appendChild(tableSection);
        }
        else{
            console.error("Elemento com id 'detalles' não foi encontrado");
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Obter o ID do produto da URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (productId) {
        // Buscar os dados do JSON
        fetch("detalles.json")
            .then((response) => response.json())
            .then((data) => {
                // Filtrar o produto correspondente ao ID
                const producto = data.find((item) => item.id == productId);

                if (producto) {
                    // Criar uma instância de Detalles e renderizar o HTML
                    const detallesProducto = new Detalles(
                        producto.id,
                        producto.name,
                        producto.price,
                        producto.stock,
                        producto.categoria,
                        producto.descriptionUno,
                        producto.descriptionDos,
                        producto.porque,
                        producto.respuesta,
                        producto.features,
                        producto.imageBack,
                        producto.image1,
                        producto.image2,
                        producto.image3
                    );

                    detallesProducto.toHTML();
                } else {
                    console.error("Produto não encontrado!");
                }
            })
            .catch((error) => console.error("Erro ao carregar o JSON:", error));
    } else {
        console.error("ID do produto não especificado na URL.");
    }
});