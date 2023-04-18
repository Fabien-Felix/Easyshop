
let params = new URLSearchParams(document.location.search);
let id = params.get("id");
// console.log({id})                                                        // Id identifié sur la console 


async function displayProduct() {                                        // Fonction asynchrone 

    await fetch("http://localhost:3000/api/products/" + id )             // Api + 
    
    .then(response => response.json())

    .then((products) => {                                                // Fonction "products" + rajouté le concaténation 
        // console.log(products)

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
        
        for (let selectColor of products.colors) {                       // Boucle crée pour la répititon des couleurs
            document.getElementById("colors").innerHTML +=  
                `<option value=${selectColor}>${selectColor}</option>`;
        }
        
    })

    .catch((error) => {
        console.log('erreur est survenue ' + error.message);
    });
}
displayProduct();                                                     // Résultat 


function addValue () {                                        // Boucle crée pour avoir la couleur, le prix et la quantité
    
    const getColor = document.getElementById("colors").value;
    const getPrice = document.getElementById("price").value;
    const getQuantity = document.getElementById("quantity").value;


    let ArKanap = localStorage.getItem("ArKanap");            // Crée "localStorage" pour stocker les produits à chaque ajout
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
    // localStorage(clear)   
    console.log(localStorage);

}
addValue ();


// const button = document.querySelector("#addToCart")
// button.addEventListener("click", (e) => {
//     const color = document.querySelector("#colors").value 
// })
