//===============================================//
//================= API url =====================//

const apiUrl = 'http://localhost:3000/api/products';

// Récupération des données de l'API 

fetch(apiUrl)
    .then((response) => response.json()
    .then((product) => {
        const parser = new DOMParser();
        const items = document.querySelector('#items');

        for (i = 0; i < product.length; i ++) {
            let productsItems = 
                `<a href="./product.html?id=${product[i]._id}">
                    <article>
                        <img src="${product[i].imageUrl}" alt="${product[i].altTxt}" />
                        <h3 class="productName">${product[i].name}</h3>
                        <p class="productDescription">${product[i].description}</p>
                    </article>
                </a>`;
            const displayItems = parser.parseFromString(productsItems, "text/html");
            items.appendChild(displayItems.body.firstChild);
        }
    }))

    .catch((err) => 
        document.querySelector('#items').innerText = `Oups ! Il y a eu une erreur lors de l'affichage des produits :(`);

