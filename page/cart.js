// cart.js
export let cart = JSON.parse(localStorage.getItem('cart')) || []; // Export the cart variable

export function updateCartCount(container) {
  const cartBtn = container.querySelector('.cart-btn');
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  cartBtn.innerHTML = `<i class="fas fa-shopping-bag"></i> Cart (${itemCount})`;
}

export function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productName, productPrice, productImage, quantity) {
  const existingItem = cart.find(item => item.name === productName);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: quantity,
    });
  }
  saveCart();
}

export function CartPage(navigate) {
  const container = document.createElement('div');
  container.className = 'cart-container';

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  container.innerHTML = `
    <header class="cart-header">
      <h2>Your Cart</h2>
      <button class="back-btn" id="back-btn"><i class="fas fa-arrow-left"></i> Back to Shop</button>
    </header>
    <section class="cart-items">
      ${cart.length === 0 ? '<p>Your cart is empty.</p>' : cart.map((item, index) => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover;">
          <div class="cart-item-details">
            <h3>${item.name}</h3>
            <p>Price: ₱${item.price.toFixed(2)}</p>
            <p>Quantity: 
              <input type="number" class="quantity-update" data-index="${index}" value="${item.quantity}" min="1" max="100">
            </p>
            <p>Subtotal: ₱${(item.price * item.quantity).toFixed(2)}</p>
            <button class="remove-btn" data-index="${index}">Remove</button>
          </div>
        </div>
      `).join('')}
    </section>
    <section class="cart-summary">
      <h3>Total: ₱${totalPrice.toFixed(2)}</h3>
      <button class="checkout-btn" ${cart.length === 0 ? 'disabled' : ''}>Proceed to Checkout</button>
    </section>
  `;

  container.querySelector('#back-btn').addEventListener('click', () => {
    navigate('dashboard');
  });

  container.querySelectorAll('.quantity-update').forEach(input => {
    input.addEventListener('change', (e) => {
      const index = parseInt(e.target.getAttribute('data-index'));
      const quantity = parseInt(e.target.value);
      if (quantity >= 1 && quantity <= 100) {
        cart[index].quantity = quantity;
        saveCart();
        navigate('cart');
      } else {
        alert('Please enter a valid quantity (1-100).');
        e.target.value = cart[index].quantity;
      }
    });
  });

  container.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', () => {
      const index = parseInt(button.getAttribute('data-index'));
      cart.splice(index, 1);
      saveCart();
      navigate('cart');
    });
  });

  container.querySelector('.checkout-btn')?.addEventListener('click', () => {
    alert('Proceeding to checkout (not implemented).');
  });

  return container;
}