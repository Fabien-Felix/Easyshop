fetch("http://localhost:3000/api/products")
    .then(response => response.json())
    
    .then(function(products){
        
        for (let i = 0; i < products.length; i++){
            
        document.querySelector(".items").innerHTML += 
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
    
                    
    .catch(function(error){
        console.log('erreur est survenue')
    });













        // .then(data => {


        // console.log(data)
        // return addProducts(data)

// function addProducts(donnees) {
//     const id = donnees[0]._id
//     const imageUrl = donnees[0].imageUrl
//     const altTxt = donnees[0].altTxt
//     const image = makeImage(imageUrl, altTxt)

//     const anchor = makeAnchor(id)
//     const article = makeArticle()
//     article.appendChild(image)
//     appendChildren(anchor, article)
// }

// function makeAnchor(id) {
//     const anchor = document.createElement("a")
//     anchor.href = "./product.html?id=" + id
//     return anchor
// }

// function appendChildren(anchor, article) {
//     const items = document.querySelector("#items")
//     items.appendChild(anchor)
//     anchor.appendChild(article)
// }

// function makeImage(imageUrl, altTxt) {
//     const image = document.createElement("img")
//     image.src = imageUrl
//     image.alt = altTxt
//     return image
// }

// function makeArticle() {
//     const article = document.createElement("article")
//     const h3 = makeH3()
//     const p = makeParagraph()
//     // article.appendChild(image)
//     // article.appendChild(h3)
//     // article.appendChild(p)
//     console.log(article)
//     return article
// }

// function makeH3() {

// }
// function makeParagraph() {

// }


