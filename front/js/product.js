
// Récuperer l'id

const qStr = window.location.search;

const urlParams = new URLSearchParams(qStr);

const id = urlParams.get('id');

const apiUrl = 'http://localhost:3000/api/products/' + id;

// Si il y a un id, appeler l'api pour chercher les informations du produit d'id

fetch(apiUrl)
    .then((response) => response.json()
    .then((product) => {
            
        // Afficher les images
        let img = document.querySelector('.item__img');
        img.innerHTML = `<img src='${product.imageUrl}' alt='${product.altTxt}'>`;
            
        // Afficher les noms
        let name = document.querySelector('#title');
        name.innerHTML = `${product.name}`;
            
        // Afficher les prix
        let price = document.querySelector('#price');
        price.innerHTML = `${product.price}`;

        // Afficher les descriptions
        let desc = document.querySelector('#description');
        desc.innerHTML = `${product.description}`;

        // Afficher les couleurs
        const parser = new DOMParser();
        const colors = document.querySelector('#colors');
        
        for (i = 0; i < product.colors.length; i++) {
            let productsColors = 
                `<option value='${product.colors[i]}'>${product.colors[i]}</option>`;
            const displayColors = parser.parseFromString(productsColors, "text/html");
            colors.appendChild(displayColors.body.firstChild);
        }
    }))
    
    .catch((err) => 
        document.querySelector('.item').innerText = `Le produit est introuvable !`);


//======================================================================================//
//============================== Récuperer les valeurs du HTML==========================//

// Récuperer la couleur choisie
function colorValue() {
    let color = document.querySelector(`#colors`);
    return color.value;
};

// Récuperer la quantité choisie
function qtyValue() {
    let qty = document.querySelector(`#quantity`);
    return qty.value;
};

// Fonction ajouter un produit dans le localStorage
    const addToCartHTMLElement = (id, color, qty) => {
    
        // Si la couleur est vide --> Erreur
        if (color == "" && qty == "0") {
            return alert(`Veuillez choisir une couleur et une quantité entre 1 et 40`)
        }

        if (color == "") {
            return alert(`Veuillez choisir une couleur`);
        }

        // Si la quantité n'est pas entre 1 et 100 --> Erreur 
        if (qty <= 0 || qty >= 40) {
            return alert(`Veuillez choisir une quantité entre 1 et 40`)
        }

        let itemsLocalStorage = getCart();
        // Si le panier n'existe pas, le créer dans objet dans un tableau
        if (itemsLocalStorage.length == 0) {
            itemsLocalStorage = [{id: id, color: color, qty: qty}];
        
        // Si le panier existe
        } else {
            let found = false;
            // Si l'id et la couleur de l'item existe déjà dans le tableau du panier, incrémenter la quantité choisie à la quantité du panier
            for (let i = 0; i < itemsLocalStorage.length; i++) {
                if (id === itemsLocalStorage[i].id && color === itemsLocalStorage[i].color) {
                    found = true;
                    itemsLocalStorage[i].qty += qty;
                }
            }
            // S'ils n'existent pas, créer un nouvel objet item dans le tableau du panier
            if (found == false) {
                let item = {id: id, color: color, qty: qty};
                itemsLocalStorage.push(item); 
            }
        }
        
        localStorage.setItem(`selectedProduct`, JSON.stringify(itemsLocalStorage));
        alert(`Produits ajoutés !`);
    }

// Fonction pour récupérer le panier dans le localStorage
const getCart = () => {   
    let itemsLocalStorage = [];
    if (localStorage.getItem(`selectedProduct`) != null) { 
        itemsLocalStorage = JSON.parse(localStorage.getItem(`selectedProduct`));
    }
    return itemsLocalStorage;
}

// Bouton d'ajout au panier
const addToCart = document.querySelector(`#addToCart`);

// Lors du 'click' on écoute la couleur et la quantité du produit sélectionné et si elles sont valides, les ajouter au panier
addToCart.addEventListener(`click`, () => {
    let color = colorValue();
    let qty = parseInt(qtyValue());
    addToCartHTMLElement(id, color, qty);
});





// // Récupére l'id dans l'url
// let params = new URLSearchParams(document.location.search);
// let id = params.get("id");
// // console.log({id})                                                        


// async function displayProduct() {                                        

//     await fetch("http://localhost:3000/api/products/" + id )            
    
//     .then(response => response.json())
    
//     // Fonction "products" + rajouté le concaténation
//     .then((products) => {                                                 
       

//         document.querySelector(".item__img").innerHTML +=               
//                 `<img src=${products.imageUrl} alt=${products.altTxt}>`;
        
//         document.getElementById("title").innerHTML +=
//                 `${products.name}`;
       
//         document.getElementById("price").innerHTML +=
//                 `${products.price}`;
        
//         document.querySelector(".item__content__description").innerHTML += 
//                 `<p id="description">
//                     ${products.description}
//                 </p>`;


//         // Boucle crée pour la répititon des couleurs
//         for (let selectColor of products.colors) {                       
//             document.getElementById("colors").innerHTML +=  
//                 `<option value=${selectColor}>${selectColor}</option>`;
//         }

//          // console.log(products)
        
//     })

//     .catch((error) => {
//         console.log('erreur est survenue ' + error.message);
//     });
// }
// displayProduct();                                                  


// // Boucle crée pour avoir la couleur, le prix et la quantité   (récupérer les valeurs)
// function addValue () {                                        
    
//     const getColor = document.getElementById("colors").value;
//     const getPrice = document.getElementById("price").value;
//     const getQuantity = document.getElementById("quantity").value;

//     let getKanap = [id, getColor, getPrice, getQuantity]; 
//     console.table(getKanap);
    
//     // Crée "localStorage" pour stocker les produits à chaque ajout

//     let ArKanap = localStorage.getItem("ArKanap");         
//     if (ArKanap === null) {
//         // let getKanap = [id, getColor, getPrice, getQuantity];  
//         let JsonKanap = JSON.stringify(getKanap);
//         window.localStorage.setItem("ArKanap", JsonKanap);
        
//     } else {
//         let parseKanap = JSON.parse(ArKanap);
//         parseKanap.push(id, getColor, getPrice, getQuantity);
//         let JsonParseKanap = JSON.stringify(parseKanap);
//         localStorage.setItem("ArKanap", JsonParseKanap);
//     }
    
//     //=======================================================//
//     //================== Seceond method =====================//

//     // let ArKanap = localStorage.getItem("ArKanap");
//     // let JsonKanap = JSON.parse(ArKanap);

//     // if (JsonKanap === null) {
//     //     // let getKanap = [id, getColor, getPrice, getQuantity];
//     //     // Creer et ajoute le produit
//     //     let JsonKanap = [];
//     //     JsonKanap.push(getKanap);

//     //     JSON.stringify(getKanap);
//     //     window.localStorage.setItem("ArKanap", JSON.stringify(JsonKanap));
//     // } else {
//     //     let parseKanap = JSON.parse(ArKanap);
//     //     parseKanap.push(getKanap);
//     //     let JsonParseKanap = JSON.stringify(parseKanap);
//     //     localStorage.setItem("ArKanap", JsonParseKanap);
//     // }


//     // localStorage.clear()                                     // permet de clear
//     console.log(localStorage);  
//     JSON.stringify(addValue);

// }

// // let addToCart = document.getElementById("addToCart");
// // addToCart.addEventListener("click", function(event){
// //     event.preventDefault();
// //     addValue();
// // });



// //=== Bouton ajouter  ===//

// const button = document.querySelector("#addToCart")
// button.addEventListener("click", handleClick)


// function handleClick() {
//     const getColor = document.getElementById("colors").value;
//     const getQuantity = document.getElementById("quantity").value;

//     // if (isOrderInvalid(getColor, getQuantity)) return
//     // saveorder(getColor, getQuantity)
//     redirectToCart()
//     console.log(handleClick)
// }

// // function redirectToCart() {
// //     window.location.href = "cart.html"
// // }

 

