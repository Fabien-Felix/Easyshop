
let params = new URLSearchParams(document.location.search);
let id = params.get("id");
console.log({id})




fetch("http://localhost:3000/api/products/" + id )
    .then(response => response.json())

    .then((products) => {
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
        
                
                
        document.getElementById("colors").innerHTML += 
                `<option value=${products.colors}>vert</option>
                <option value="blanc">blanc</option>`
        
    })

    .catch((error) => {
        console.log('erreur est survenue')
    });

