
let params = new URLSearchParams(document.location.search);
let id = params.get("id");
console.log({id})                                                        // Id identifié sur la console 


async function displayProduct() {                                        // Fonction asynchrone 

    await fetch("http://localhost:3000/api/products/" + id )             // Api + 
    
    .then(response => response.json())

    .then((products) => {                                                // Fonction "products" + rajouté le concaténation 
        console.log(products)

        document.querySelector(".item__img").innerHTML +=               
                `<img src=${products.imageUrl} alt=${products.altTxt}>`
        
        document.getElementById("title").innerHTML +=
                `${products.name}`
       
        document.getElementById("price").innerHTML +=
                `${products.price}`
        
        document.querySelector(".item__content__description").innerHTML += 
                `<p id="description">
                    ${products.description}
                </p>`
        
        for (let selectColor of products.colors) {                       // Boucle crée pour la répititon des couleurs
            document.getElementById("colors").innerHTML +=  
                `<option value=${selectColor}>${selectColor}</option>`;
        }
        
    })

    .catch((error) => {
        console.log('erreur est survenue ' + error.message);
    });
}
displayProduct()                                                          // Résultat 


function getValue () {
    
    const getColor = document.getElementById("colors").value;
    const getPrice = document.getElementById("price").value;
    const getQuantity = document.getElementById("quantity").value;

    const objProduct = [getColor, getPrice, getQuantity];
    console.log(objProduct);

    let objProductLinea = JSON.stringify(objProduct);
    window.localStorage.setItem("objProductLinea", objProduct);
    console.log(localStorage);
}
getValue ()


// const button = document.querySelector("#addToCart")
// button.addEventListener("click", (e) => {
//     const color = document.querySelector("#colors").value 
// })
