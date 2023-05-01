
// Récupére l'id dans l'url
let params = new URLSearchParams(document.location.search);
let id = params.get("id");
// console.log({id})                                                        


async function displayProduct() {                                        

    await fetch("http://localhost:3000/api/products/" + id )            
    
    .then(response => response.json())
    
    // Fonction "products" + rajouté le concaténation
    .then((products) => {                                                 
       

        document.querySelector(".item__img").innerHTML +=               
                `<img src=${products.imageUrl} alt=${products.altTxt}>`;
        
        document.getElementById("title").innerHTML +=
                `${products.name}`;
       
        document.getElementById("price").innerHTML +=
                `${products.price}`;
        
        document.querySelector(".item__content__description").innerHTML += 
                `<p id="description">
                    ${products.description}
                </p>`;


        // Boucle crée pour la répititon des couleurs
        for (let selectColor of products.colors) {                       
            document.getElementById("colors").innerHTML +=  
                `<option value=${selectColor}>${selectColor}</option>`;
        }

         // console.log(products)
        
    })

    .catch((error) => {
        console.log('erreur est survenue ' + error.message);
    });
}
displayProduct();                                                  


// Boucle crée pour avoir la couleur, le prix et la quantité   (récupérer les valeurs)
function addValue () {                                        
    
    const getColor = document.getElementById("colors").value;
    const getPrice = document.getElementById("price").value;
    const getQuantity = document.getElementById("quantity").value;

    let getKanap = [id, getColor, getPrice, getQuantity]; 
    console.table(getKanap);
    
    // Crée "localStorage" pour stocker les produits à chaque ajout

    // let ArKanap = localStorage.getItem("ArKanap");         
    // if (ArKanap === null) {
    //     // let getKanap = [id, getColor, getPrice, getQuantity];  
    //     let JsonKanap = JSON.stringify(getKanap);
    //     window.localStorage.setItem("ArKanap", JsonKanap);
        
    // } else {
    //     let parseKanap = JSON.parse(ArKanap);
    //     parseKanap.push(id, getColor, getPrice, getQuantity);
    //     let JsonParseKanap = JSON.stringify(parseKanap);
    //     localStorage.setItem("ArKanap", JsonParseKanap);
    // }
    
    //=======================================================//
    //================== Seceond method =====================//

    let ArKanap = localStorage.getItem("ArKanap");
    let JsonKanap = JSON.parse(ArKanap);

    if (JsonKanap === null) {
        // let getKanap = [id, getColor, getPrice, getQuantity];
        // Creer et ajoute le produit
        let JsonKanap = [];
        JsonKanap.push(getKanap);

        JSON.stringify(getKanap);
        window.localStorage.setItem("ArKanap", JSON.stringify(JsonKanap));
    } else {
        let parseKanap = JSON.parse(ArKanap);
        parseKanap.push(getKanap);
        let JsonParseKanap = JSON.stringify(parseKanap);
        localStorage.setItem("ArKanap", JsonParseKanap);
    }


    // localStorage.clear()                                     // permet de clear
    console.log(localStorage);  
    JSON.stringify(addValue);

}

let addToCart = document.getElementById("addToCart");
addToCart.addEventListener("click", function(event){
    event.preventDefault();
    addValue();
});




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



//===Validation ===//

const button = document.querySelector("#addToCart")
button.addEventListener("click", handleClick)


function handleClick() {
    const getColor = document.getElementById("colors").value;
    const getQuantity = document.getElementById("quantity").value;

    // if (isOrderInvalid(getColor, getQuantity)) return
    // saveorder(getColor, getQuantity)
    redirectToCart()
    console.log(handleClick)
}

// function redirectToCart() {
//     window.location.href = "cart.html"
// }

 








//============================================================================================//
//===================================Deuxième méthode=========================================//

// Récuperer la couleur choisie
// function colorValue() {
//     let color = document.querySelector(`#colors`);
//     return color.value;
// };

// // Récuperer la quantité choisie
// function qtyValue() {
//     let qty = document.querySelector(`#quantity`);
//     return qty.value;
// };



// const addToCartHTMLElement = (id, getColor, getQuantity) => {
//     let itemsLocalStorage = getCart();

//     // si le panier n'existe pas, crée un objet dans un tableau
//     if (itemsLocalStorage.length == 0) {
//         itemsLocalStorage = [{id: id, getColor: getColor, getQuantity: getQuantity}]

//     // si il existe
//     } else {
//         let found = false
//         //incrémenter la quantité choisie à la quantité du panier
//         for (let i = 0; i < itemsLocalStorage.length; i++) {
//             if (id === itemsLocalStorage[i].id && getColor === itemsLocalStorage[i].getColor) {
//                 found = true;
//                 itemsLocalStorage[i].getQuantity += getQuantity;
//             }
//         }
//         // S'ils n'existent pas, créer un nouvel objet item dans le tableau du panier
//         if (found == false) {
//             let item = {id: id, getcolor: getcolor, getQuantity: getQuantity};
//             itemsLocalStorage.push(item); 
//         }
//     }

//     localStorage.setItem(`selectedProduct`, JSON.stringify(itemsLocalStorage));
//     alert(`Produit(s) ajouté(s) au panier !`);
// }


// Bouton d'ajout au panier 

// const addToCart = document.getElementById("addToCart");

// addToCart.addEventListener("click", () => {
//     let getcolor = addValue();
//     let getQuantity = parseInt(addValue());
//     addToCartHTMLElement(id, getcolor, getQuantity);
// });


