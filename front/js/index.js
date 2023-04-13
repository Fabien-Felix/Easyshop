async function displayProduct() {                                       // Fonction asynchrone 

    await fetch("http://localhost:3000/api/products")                   // Api

    .then(response => response.json())
    
    .then(function(products){                                           // Fonction "products" ajouté
        
        for (let i = 0; i < products.length; i++){                      // Création de boucle 
            
        document.querySelector(".items").innerHTML +=                   // Id "item" + rajoute de concaténation
                `<a href="./product.html?id=${products[i]._id}">          
                       <article>
                        <img src=${products[i].imageUrl} alt=${products[i].altTxt}>
                        <h3 class="productName">${products[i].name}</h3>
                        <p class="productDescription">${products[i].description}</p>
                        <p class="productColor">${products[i].colors}</p>
                        <p class="productPrice">${products[i].price} €</p>
                    </article>
                </a>`;
        }
    })
    
                    
    .catch(function(error){                                             // Montre une erreur 
        console.log('erreur est survenue')
    })
}

displayProduct ()                                                       // Résultat

