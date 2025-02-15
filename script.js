let cart = [];
let cartTotal = 0;

// Load cart from localStorage
function loadCart() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCart();
  }
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Add item to cart
function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  updateCart();
}

// Remove item from cart
function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  updateCart();
}

// Update cart display
function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  const cartCount = document.getElementById('cart-count');

  cartItems.innerHTML = '';
  cartTotal = 0;

  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <span>${item.name} (${item.quantity})</span>
      <span>$${(item.price * item.quantity).toFixed(2)}</span>
      <button onclick="removeFromCart('${item.name}')">Remove</button>
    `;
    cartItems.appendChild(cartItem);
    cartTotal += item.price * item.quantity;
  });

  cartTotalElement.textContent = cartTotal.toFixed(2);
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  saveCart();
}

// Clear cart
function clearCart() {
  cart = [];
  updateCart();
}

// Toggle cart visibility
function toggleCart() {
  const cartElement = document.getElementById('cart');
  cartElement.classList.toggle('active');
}

// Load cart on page load
window.onload = loadCart;