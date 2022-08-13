let carts = document.querySelectorAll('.add-cart');
let products = [
    {
        name: "Chicken chilli",
        tag: "chicken chilli",
        price: 100,
        inCart: 0
    },
    {
        name: "Paneer Kathi Roll",
        tag: "paneer kathi roll",
        price: 70,
        inCart: 0
    },
    {
        name: "Manchurian",
        tag: "manchurian",
        price: 60,
        inCart: 0
    },
    {
        name: "Fish Finger",
        tag: "fish",
        price: 110,
        inCart: 0
    }
];
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadcartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {

    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}
function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');

    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost);

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}
function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');
    console.log(cartItems);
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class ="product">
                <span>${item.name}</span>
            </div>
            <div class="price">Rs.${item.price}.00</div>
            <div class ="quantity">
                <span>${item.inCart}</span>
            </div>
            <div class ="total">
               Rs.${item.inCart * item.price}.00
            </div>
            `           
        });
        productContainer.innerHTML += `
        <div class ="basketTotalContainer">
            <h4 class="basketTotalTitle">
                To Pay:__________________________________________________Rs.${cartCost}.00
            </h4>
        </div> `
    }
}

onLoadcartNumbers();
displayCart();