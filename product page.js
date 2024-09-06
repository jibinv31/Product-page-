// Product Array
const products = [
    { id: 1, name: 'Headphone', price: 25.00, image: 'images/product3.jpg', description: 'High-quality over-ear wireless headphones.' },
    { id: 2, name: 'Mouse', price: 15.00, image: 'images/product2.jpg', description: 'Ergonomic wireless mouse with smooth scrolling.' },
    { id: 3, name: 'Laptop', price: 30.00, image: 'images/product1.jpg', description: 'Slim, modern laptop with high processing power.' },
    { id: 4, name: 'Smartphone', price: 20.00, image: 'images/product4.jpg', description: 'Latest smartphone with long battery life.' }
];

let cart = [];
let selectedProduct = null;

// Function to display products
function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear previous content
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button onclick="viewDetails(${product.id})">View Details</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Function to view product details in a modal
function viewDetails(productId) {
    const product = products.find(p => p.id === productId);
    selectedProduct = product;

    document.getElementById('modal-product-name').innerText = product.name;
    document.getElementById('modal-product-image').src = product.image;
    document.getElementById('modal-product-price').innerText = `Price: $${product.price.toFixed(2)}`;
    document.getElementById('modal-product-description').innerText = product.description;

    document.getElementById('product-modal').style.display = 'block';
}

// Function to add product to cart from modal
function addToCartFromModal() {
    cart.push(selectedProduct);
    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
    closeModal();
}

// Function to close modal
function closeModal() {
    document.getElementById('product-modal').style.display = 'none';
}

// Function to display cart items
function displayCartItems() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = ''; // Clear previous content
    let total = 0;

    cart.forEach((item, index) => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `${item.name} - $${item.price.toFixed(2)} <button onclick="removeFromCart(${index})">Remove</button>`;
        cartItemsDiv.appendChild(cartItemDiv);
        total += item.price;
    });

    document.getElementById('total-cost').innerText = total.toFixed(2);
}

// Function to remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    displayCartItems(); // Refresh cart
}

// Function to handle checkout
function checkout() {
    alert('Thank you for your purchase!');
    cart = [];
    localStorage.removeItem('cart');
    displayCartItems(); // Refresh cart after checkout
}

// Function to switch to product view
function showProducts() {
    document.getElementById('product-list').style.display = 'flex';
    document.getElementById('cart').style.display = 'none';
    displayProducts(); // Ensure products are displayed
}

// Function to switch to cart view
function showCart() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('product-list').style.display = 'none';
    document.getElementById('cart').style.display = 'block';
    displayCartItems(); // Ensure cart is displayed
}

// Show products by default on page load
showProducts();
