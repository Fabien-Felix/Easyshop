fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then(data => {
        console.log(data)
        return addProducts(data)
    })

    // altTxt: "Photo d'un canapé bleu, deux places"
    // colors: (3) ['Blue', 'White', 'Black']
    // description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    // imageUrl: "http://localhost:3000/images/kanap01.jpeg"
    // name: "Kanap Sinopé"
    // price: 1849
    // _id: "107fb5b75607497b96722bda5b504926"

function addProducts(donnees) {
    const id = donnees[0]._id
    const imageUrl = donnees[0].imageUrl
    const altTxt = donnees[0].altTxt
    const image = makeImage(imageUrl, altTxt)

    const anchor = makeAnchor(id)
    const article = makeArticle()
    article.appendChild(image)
    appendChildren(anchor, article)
}

function makeAnchor(id) {
    const anchor = document.createElement("a")
    anchor.href = "./product.html?id=" + id
    return anchor
}

function appendChildren(anchor, article) {
    const items = document.querySelector("#items")
    items.appendChild(anchor)
    anchor.appendChild(article)
}

function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}

function makeArticle() {
    const article = document.createElement("article")
    const h3 = makeH3()
    const p = makeParagraph()
    // article.appendChild(image)
    // article.appendChild(h3)
    // article.appendChild(p)
    console.log(article)
    return article
}

function makeH3() {

}
function makeParagraph() {

}


