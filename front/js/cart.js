
//============================================================//
//============== Modifier les élements du panier =============///


async function fetchCart() {

    let itemsLocalStorage = getCart();
    let qtyTotal = 0;
    let priceTotal = 0;

    if (localStorage.getItem(`selectedProduct`) != null) {
        for (let i = 0; i < itemsLocalStorage.length; i++) {
            let id = itemsLocalStorage[i].id;
            let color = itemsLocalStorage[i].color;
            let sectionCart = document.querySelector(`#cart__items`);
            let apiUrl = 'http://localhost:3000/api/products/' + id;

            // Afficher les données du produit avec fetch
            const response = await fetch(apiUrl);
            if (!response.ok) {
                let productError = `<article class="cart__item">
                <p>Oups ! Il y a eu une erreur lors de la récupération d'un élément du panier ! :(</p> </article>`;
                
                const parser = new DOMParser();
                const displayErrorProductItems = parser.parseFromString(productError, "text/html");

                sectionCart.appendChild(displayErrorProductItems.body.firstChild);
            
            } else {
                const data = await response.json();
                const parser = new DOMParser();
                    let detailProductItems = 
                        // Changer la quantité 
                        //==> Utiliser la fonction changeQty dans l'input avec l'evenement 'onchange'
                        // Supprimer un article 
                        //==> Evenement 'onclick'
                        `<article class="cart__item" data-id="${id}" data-color="${color}">
                            <div class="cart__item__img">
                                <img src="${data.imageUrl}" alt="${data.altTxt}">
                            </div>
                            
                            <div class="cart__item__content">
                                <div class="cart__item__content__description">
                                    <h2>${data.name}</h2>
                                    <p>Couleur : ${color}</p>
                                    <p data-id="price-${id}-${color}">Prix : ${data.price} €</p>
                                </div>
                                
                                <div class="cart__item__content__settings">
                                    <div class="cart__item__content__settings__quantity">
                                        <p>Qté : </p>
                                        <input type="number" class="itemQuantity" name="itemQuantity" onchange="changeQty('${id}', '${color}', '${data.price}', this.value)" min="1" max="40" value="${itemsLocalStorage[i].qty}">
                                    </div>
                                
                                    <div class="cart__item__content__settings__delete">
                                        <p class="deleteItem" onclick="deleteItem('${id}', '${color}', '${data.price}')">Supprimer</p>
                                    </div>
                                </div>
                            </div>
                        </article>`;
                    const displayDetailProductItems = parser.parseFromString(detailProductItems, "text/html");
                    sectionCart.appendChild(displayDetailProductItems.body.firstChild);
                        
                    // Afficher le prix total
                    priceTotal += data.price * itemsLocalStorage[i].qty;
                    document.querySelector('#totalPrice').innerHTML = priceTotal;

                    // Afficher la quantité totale
                    qtyTotal += parseInt(itemsLocalStorage[i].qty);
                    document.querySelector('#totalQuantity').innerHTML = qtyTotal;
            }
        }

    // Sinon affiche un message

    } else {
        document.querySelector(`h1`).innerText = `Votre panier est vide !`;
        document.querySelector('#totalQuantity').innerText = `0`;
        document.querySelector('#totalPrice').innerText = `0`;
    }
}

// Fonction pour changer la quantité
const changeQty = (id, color, price, newQty) => {
    let itemsLocalStorage = getCart();
    let item = itemsLocalStorage.find(
        (itemsLocalStorage) =>
            id === itemsLocalStorage.id && color === itemsLocalStorage.color
    );
    
    // Changer la quantité dans le localStorage
    let previousQty = item.qty;
    let newQuantity = parseInt(newQty);
    
    item.qty = newQuantity;
    localStorage.setItem(`selectedProduct`, JSON.stringify(itemsLocalStorage));
    
    // Si la quantité est inférieur à 1 ou supérieur à 40
    if (newQty <= 0 || newQty >= 41) {
        alert(`La quantité d'un produit doit être entre 1 et 40 !`)
    }

    // Changer la quantité totale
    let totalQtyBefore = parseInt(document.querySelector(`#totalQuantity`).innerHTML);
    let totalQtyAfter = totalQtyBefore - previousQty + newQuantity;
    
    document.querySelector(`#totalQuantity`).innerHTML = totalQtyAfter;

    // Changer le prix total
    let priceItem = parseInt(price);

    let totalPriceBefore = parseInt(document.querySelector(`#totalPrice`).innerHTML);
    let totalPriceAfter = totalPriceBefore - (priceItem * previousQty) + (priceItem * newQuantity);
    
    document.querySelector(`#totalPrice`).innerHTML = totalPriceAfter;
}

// Fonction pour supprimer un produit
const deleteItem = (id, color, price) => {
    let itemsLocalStorage = getCart();
    for (i = 0; i < itemsLocalStorage.length; i++) {
        if (id === itemsLocalStorage[i].id && color === itemsLocalStorage[i].color) {
            let qtyToDelete = itemsLocalStorage[i].qty;
            itemsLocalStorage.splice(i, 1);

            let itemToDelete = document.querySelector(`.cart__item[data-id="${id}"][data-color="${color}"]`);
            itemToDelete.setAttribute("style", "display:none");

            localStorage.setItem(`selectedProduct`, JSON.stringify(itemsLocalStorage));

            // Changer la quantité totale
            let totalQtyBefore = parseInt(document.querySelector(`#totalQuantity`).innerHTML);
            let totalQtyAfter = totalQtyBefore - qtyToDelete;

            document.querySelector(`#totalQuantity`).innerHTML = totalQtyAfter;

            // Changer le prix total
            let priceItem = parseInt(price);
            let totalPriceBefore = parseInt(document.querySelector(`#totalPrice`).innerHTML);
            let totalPriceAfter = totalPriceBefore - (priceItem * qtyToDelete);

            document.querySelector(`#totalPrice`).innerHTML = totalPriceAfter;

            if (itemsLocalStorage.length == 0) {
                document.querySelector(`h1`).innerText = `Panier vide !`;
                return alert(`Panier vide !`);
            }
        }
    }
}

fetchCart();




// async function displayProduct() {

//     await fetch("http://localhost:3000/api/products")

//     .then(response => response.json())

//     .then((products) => {
        
//         localStorage.getItem("Arkanap")

//         document.getElementById("cart__items").innerHTML += 
//                 `<article class="cart__item" data-id="${products._id}" data-color="${products.colors}">
//                     <div class="cart__item__img">
//                         <img src="${products.imageUrl}" alt="${products.altTxt}">
//                     </div>
//                     <div class="cart__item__content">
//                         <div class="cart__item__content__description">
//                             <h2>"${products.name}"</h2> 
//                             <p>"${products.colors}"</p>
//                             <p>"${products.price}"</p>
//                         </div>
//                         <div class="cart__item__content__settings">
//                             <div class="cart__item__content__settings__quantity">
//                                 <p>Qté : </p>
//                                 <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="40" value="${products.quantity}">
//                             </div>
//                             <div class="cart__item__content__settings__delete">
//                                 <p class="deleteItem">Supprimer</p>
//                             </div>
//                         </div>
//                     </div>
//                 </article>`
//     }) 
// }



// =====================    Function compteur produit quantités     ======================== //


// function countProduct(products, cleanProducts) {
//     let cleanProductsWithCounter = []

//     for (const cleanProduct of cleanProducts) {
//         let counter = 0
//         for (const product of products) {
//             if (cleanProduct._id === product._id && cleanProduct.lenses === product.lenses) {
//                 counter++;
//             }
//             cleanProduct.counterPrice = product.price * counter
//             cleanProduct.counter = counter

//         }
//         cleanProductsWithCounter.push(cleanProduct)
//     }

//     return cleanProductsWithCounter
// };