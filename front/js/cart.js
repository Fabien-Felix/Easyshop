async function displayProduct() {

    await fetch("http://localhost:3000/api/products")

    .then(response => response.json())

    .then((products) => {
        
    }) 
}




function pushkanap() {               
    
    localStorage.getItem("Arkanap")

    document.getElementById("cart__items").innerHTML += 
            `<article class="cart__item" data-id="${products._id}" data-color="${products.colors}">
            <div class="cart__item__img">
              <img src="${products.imageUrl}" alt="${products.altTxt}">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>Nom du produit</h2> 
                <p>Vert</p>
                <p>42,00 €</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="40" value="42">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          </article>`

} 