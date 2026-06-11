const productsContainer = document.getElementById('products-container');
const resultBox = document.getElementById('result-box');
const openBtn = document.getElementById('loot-btn');

const categories = [
    'laptops',
    'smartphones',
    'mobile-accessories',
    'tablets'
];

let allProducts = [];

async function getProducts() {

    productsContainer.innerHTML = '';

    for (const category of categories) {

        const response = await fetch(
            `https://dummyjson.com/products/category/${category}`
        );

        const data = await response.json();

        allProducts = [...allProducts, ...data.products];

        data.products.forEach(product => {

            const productCard = document.createElement('div');
            productCard.classList.add('product');

            productCard.innerHTML = `
                <img src="${product.thumbnail}" alt="${product.title}">
                <h2>${product.title}</h2>
                <p>${product.description.substring(0, 80)}...</p>
                <span class="price">${product.price} $</span>
            `;

            productsContainer.appendChild(productCard);
        });
    }
}

async function loadProducts() {

    for (const category of categories) {

        const response = await fetch(
            `https://dummyjson.com/products/category/${category}`
        );

        const data = await response.json();

        allProducts = [...allProducts, ...data.products];
    }

}

loadProducts();

function showProduct(product) {

    resultBox.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>${product.price} $</p>
    `;
}


function openLootBox() {

    if (allProducts.length === 0) return;

    openBtn.disabled = true;
    openBtn.textContent = 'Losowanie...';

    const animation = setInterval(() => {

        const randomProduct =
            allProducts[
                Math.floor(Math.random() * allProducts.length)
            ];

        showProduct(randomProduct);

    }, 100);

    setTimeout(() => {

        clearInterval(animation);

        const finalProduct =
            allProducts[
                Math.floor(Math.random() * allProducts.length)
            ];

        showProduct(finalProduct);

        openBtn.disabled = false;
        openBtn.textContent = 'Otwórz box (500$)';

    }, 3000);

}

if (openBtn) {
    openBtn.addEventListener('click', openLootBox);
}
if (productsContainer) {
    getProducts();
} else {
    loadProducts();
}