
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


// Boucle crée pour avoir la couleur, le prix et la quantité
function addValue () {                                        
    
    const getColor = document.getElementById("colors").value;
    const getPrice = document.getElementById("price").value;
    const getQuantity = document.getElementById("quantity").value;

    // Crée "localStorage" pour stocker les produits à chaque ajout
    let ArKanap = localStorage.getItem("ArKanap");         
    if (ArKanap === null) {
        let getKanap = [id, getColor, getPrice, getQuantity];                
        let JsonKanap = JSON.stringify(getKanap);
        window.localStorage.setItem("ArKanap", JsonKanap);
        
    } else {
        let parseKanap = JSON.parse(ArKanap);
        parseKanap.push(id, getColor, getPrice, getQuantity);
        let JsonParseKanap = JSON.stringify(parseKanap);
        localStorage.setItem("ArKanap", JsonParseKanap);
    }

    // localStorage.clear()                                     // permet de clear
    console.log(localStorage);  


    let addToCart = document.getElementById("addToCart");

    addToCart.addEventListener("click", function(){
        event.preventDefault();
    })

}
addValue ();




// const addToCart = document.getElementById("addToCart");

// addToCart.addEventListener("click", () => {
//     let getcolor = addValue();
//     let getQuantity = parseInt(addValue());
//     addToCartHTMLElement(id, getcolor, getQuantity);
// });


