// dashboard.js
import { updateCartCount, addToCart, saveCart, cart } from './cart.js'; // Import cart array

export function DashboardPage(navigate) {
  const container = document.createElement("div");
  container.className = "dashboard-container";

  // Store the last clicked product card
  let lastClickedProductCard = null;

  container.innerHTML = `
    <header class="dashboard-header">
      <div class="logo">🛒 ShoppingSphere</div>
      <nav>
        <input type="text" class="search-bar" placeholder="Search products...">
        <select class="category-dropdown">
          <option value="all">All</option>
          <option value="electronics">Electronics</option>
          <option value="accessories">Accessories</option>
        </select>
        <button class="cart-btn"><i class="fas fa-shopping-bag"></i> Cart</button>
        <div class="profile-dropdown">
          <button class="profile-btn" id="profile-toggle"><i class="fas fa-user-tie"></i> Profile</button>
          <div class="dropdown-menu" id="profile-menu">
            <a href="#" class="dropdown-item" data-action="dashboard">Shop</a>
            <a href="#" class="dropdown-item" data-action="profile">Profile</a>
            <a href="#" class="dropdown-item" data-action="transactions">Transactions</a>
            <a href="#" class="dropdown-item" data-action="cart">Cart</a>
            <a href="#" class="dropdown-item" data-action="signout">Sign Out</a>
          </div>
        </div>
      </nav>
    </header>

    <section class="dashboard-hero">
      <h2>Your Trusted Online Store</h2>
      <p>From browsing products to secure payments – everything you need in one place.</p>
    </section>

    <section class="product-grid">
      <div class="product-card" data-product="Headphone" data-price="526.00" data-image="./assets/headphone.jpg">
        <img src="./assets/headphone.jpg" alt="Headphone">
        <h3>Headphone</h3>
        <p>526.00</p>
        <div class="button-group">
          <button class="buy-btn">Buy Now</button>
          <button class="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
      <div class="product-card" data-product="HP Laptop" data-price="20000.00" data-image="./assets/laptop.png">
        <img src="./assets/laptop.png" alt="HP Laptop">
        <h3>HP Laptop</h3>
        <p>20 000.00</p>
        <div class="button-group">
          <button class="buy-btn">Buy Now</button>
          <button class="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
      <div class="product-card" data-product="Bluetooth Mouse" data-price="280.00" data-image="./assets/mouse.jpg">
        <img src="./assets/mouse.jpg" alt="Bluetooth Mouse">
        <h3>Bluetooth Mouse</h3>
        <p>280.00</p>
        <div class="button-group">
          <button class="buy-btn">Buy Now</button>
          <button class="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
      <div class="product-card" data-product="Laptop Stand" data-price="150.00" data-image="./assets/stand.jpg">
        <img src="./assets/stand.jpg" alt="Laptop Stand">
        <h3>Laptop Stand</h3>
        <p>150.00</p>
        <div class="button-group">
          <button class="buy-btn">Buy Now</button>
          <button class="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
    </section>

    <!-- Modal for quantity selection -->
    <div class="modal" id="quantity-modal" style="display: none;">
      <div class="modal-content">
        <h3 id="modal-product-name">Select Quantity</h3>
        <input type="number" id="quantity-input" min="1" max="100" value="1">
        <p id="modal-error" style="color: red; display: none;">Please enter a valid quantity (1-100).</p>
        <div class="modal-buttons">
          <button id="confirm-add-btn">Add to Cart</button>
          <button id="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Modal for cart contents -->
    <div class="modal" id="cart-modal" style="display: none;">
      <div class="modal-content cart-modal-content">
        <header class="cart-header">
          <h2>Your Cart</h2>
          <button class="close-btn" id="close-cart-btn">&times;</button>
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
          <h3>Total: ₱${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</h3>
          <button class="checkout-btn" ${cart.length === 0 ? 'disabled' : ''}>Proceed to Checkout</button>
        </section>
      </div>
    </div>

    <!-- Modal for payment -->
    <div class="modals" id="payment-modal" style="display: none;">
      <div class="modal-contents payment-modal-content">
        <header class="payment-header">
          <h2>Checkout</h2>
          <button class="close-btn" id="close-payment-btn">&times;</button>
        </header>
        <section class="payment-details">
          <h3>Order Summary</h3>
          <p id="payment-product-name"></p>
          <p id="payment-product-price"></p>
          <p id="payment-product-quantity">Quantity: 1</p>

          <h3>Customer Details</h3>
          <input type="text" class="customer-name" placeholder="Full Name" required>
          <input type="email" class="customer-email" placeholder="Email" required>

          <h3>Shipping Address</h3>
          <input type="text" class="address-line1" placeholder="Address Line 1" required>
          <input type="text" class="address-line2" placeholder="Address Line 2 (Optional)">
          <input type="text" class="city" placeholder="City" required>
          <input type="text" class="state" placeholder="State/Province" required>
          <input type="text" class="postal-code" placeholder="Postal Code" required>
          <input type="text" class="country" placeholder="Country" required>

          <h3>Payment Method</h3>
          <select class="payment-method" required>
            <option value="">Select Payment Method</option>
            <option value="credit-card">Credit Card</option>
            <option value="debit-card">Debit Card</option>
            <option value="paypal">PayPal</option>
          </select>
          <div class="payment-info" style="display: none;">
            <input type="text" class="card-number" placeholder="Card Number" required>
            <input type="text" class="expiry-date" placeholder="MM/YY" required>
            <input type="text" class="cvv" placeholder="CVV" required>
          </div>

          <button class="confirm-payment-btn" disabled>Confirm Payment</button>
        </section>
      </div>
    </div>
  `;

  // Profile dropdown event listeners
  const profileToggle = container.querySelector('#profile-toggle');
  const dropdownMenu = container.querySelector('#profile-menu');
  const dropdownItems = container.querySelectorAll('.dropdown-item');

  profileToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
  });

  document.addEventListener('click', () => {
    dropdownMenu.style.display = 'none';
  });

  dropdownItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const action = item.getAttribute('data-action');
      dropdownMenu.style.display = 'none';
      switch (action) {
        case 'profile':
          navigate('profile');
          break;
        case 'transactions':
          console.log('Navigate to Transactions');
          break;
        case 'cart':
          toggleCartModal(); // Toggle cart modal instead of navigating
          break;
        case 'signout':
          navigate('login');
          break;
      }
    });
  });

  // Cart functionality
  const quantityModal = container.querySelector('#quantity-modal');
  const quantityInput = container.querySelector('#quantity-input');
  const modalProductName = container.querySelector('#modal-product-name');
  const modalError = container.querySelector('#modal-error');
  const confirmAddBtn = container.querySelector('#confirm-add-btn');
  const cancelBtn = container.querySelector('#cancel-btn');
  const cartModal = container.querySelector('#cart-modal');
  const closeCartBtn = container.querySelector('#close-cart-btn');

  container.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      lastClickedProductCard = e.target.closest('.product-card'); // Store the clicked product card
      modalProductName.textContent = `Select Quantity for ${lastClickedProductCard.getAttribute('data-product')}`;
      quantityModal.style.display = 'flex';
      quantityInput.value = 1;
      modalError.style.display = 'none';
    });
  });

  confirmAddBtn.addEventListener('click', () => {
    const quantity = parseInt(quantityInput.value);
    if (quantity < 1 || quantity > 100 || isNaN(quantity)) {
      modalError.style.display = 'block';
      return;
    }

    if (!lastClickedProductCard) {
      modalError.style.display = 'block';
      modalError.textContent = 'No product selected.';
      return;
    }

    const productName = lastClickedProductCard.getAttribute('data-product');
    const productPrice = parseFloat(lastClickedProductCard.getAttribute('data-price'));
    const productImage = lastClickedProductCard.getAttribute('data-image');

    addToCart(productName, productPrice, productImage, quantity);
    updateCartCount(container);
    quantityModal.style.display = 'none';
    toggleCartModal(); // Show cart modal after adding
    alert(`${quantity} ${productName}(s) added to cart!`);
    lastClickedProductCard = null; // Reset after use
  });

  cancelBtn.addEventListener('click', () => {
    quantityModal.style.display = 'none';
    lastClickedProductCard = null; // Reset on cancel
  });

  // Buy Now functionality with payment modal
  const paymentModal = container.querySelector('#payment-modal');
  const closePaymentBtn = container.querySelector('#close-payment-btn');
  const paymentProductName = container.querySelector('#payment-product-name');
  const paymentProductPrice = container.querySelector('#payment-product-price');
  const paymentProductQuantity = container.querySelector('#payment-product-quantity');
  const paymentMethod = container.querySelector('.payment-method');
  const paymentInfo = container.querySelector('.payment-info');
  const confirmPaymentBtn = container.querySelector('.confirm-payment-btn');
  const paymentInputs = container.querySelectorAll('input[required], select[required]');

  container.querySelectorAll('.buy-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const productCard = e.target.closest('.product-card');
      const productName = productCard.getAttribute('data-product');
      const productPrice = parseFloat(productCard.getAttribute('data-price'));
      const productImage = productCard.getAttribute('data-image');

      // Add product to cart with quantity 1 by default
      addToCart(productName, productPrice, productImage, 1);
      saveCart();

      // Populate and show payment modal
      paymentProductName.textContent = `Product: ${productName}`;
      paymentProductPrice.textContent = `Price: ₱${productPrice.toFixed(2)}`;
      paymentProductQuantity.textContent = `Quantity: 1`;
      paymentModal.style.display = 'flex';
    });
  });

  closePaymentBtn.addEventListener('click', () => {
    paymentModal.style.display = 'none';
  });

  paymentMethod.addEventListener('change', () => {
    paymentInfo.style.display = paymentMethod.value ? 'block' : 'none';
    checkPaymentFormCompletion();
  });

  paymentInputs.forEach(input => {
    input.addEventListener('input', checkPaymentFormCompletion);
  });

  function checkPaymentFormCompletion() {
    const allFilled = Array.from(paymentInputs).every(input => {
      if (input.type === 'select-one' && input.value === '') return false;
      return input.value.trim() !== '';
    });
    confirmPaymentBtn.disabled = !allFilled;
  }

  confirmPaymentBtn.addEventListener('click', () => {
    const customerName = container.querySelector('.customer-name').value;
    const customerEmail = container.querySelector('.customer-email').value;
    const addressLine1 = container.querySelector('.address-line1').value;
    const addressLine2 = container.querySelector('.address-line2').value || '';
    const city = container.querySelector('.city').value;
    const state = container.querySelector('.state').value;
    const postalCode = container.querySelector('.postal-code').value;
    const country = container.querySelector('.country').value;
    const paymentMethodValue = container.querySelector('.payment-method').value;
    const cardNumber = container.querySelector('.card-number').value;
    const expiryDate = container.querySelector('.expiry-date').value;
    const cvv = container.querySelector('.cvv').value;

    alert(`Payment Confirmed!\n\nCustomer: ${customerName}\nEmail: ${customerEmail}\nAddress: ${addressLine1}, ${addressLine2}, ${city}, ${state}, ${postalCode}, ${country}\nPayment Method: ${paymentMethodValue}\nCard Number: ${cardNumber}\nExpiry: ${expiryDate}\nCVV: ${cvv}\n\n(Implementation pending)`);
    paymentModal.style.display = 'none';
    // Optionally clear form fields
    paymentInputs.forEach(input => input.value = '');
    paymentMethod.value = '';
    paymentInfo.style.display = 'none';
    confirmPaymentBtn.disabled = true;
  });

  // Cart modal functionality
  function toggleCartModal() {
    cartModal.style.display = cartModal.style.display === 'flex' ? 'none' : 'flex';
    if (cartModal.style.display === 'flex') {
      // Re-render cart items when modal is opened
      const cartItemsSection = cartModal.querySelector('.cart-items');
      cartItemsSection.innerHTML = cart.length === 0 ? '<p>Your cart is empty.</p>' : cart.map((item, index) => `
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
      `).join('');
      const totalElement = cartModal.querySelector('.cart-summary h3');
      totalElement.textContent = `Total: ₱${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}`;
      const checkoutBtn = cartModal.querySelector('.checkout-btn');
      checkoutBtn.disabled = cart.length === 0;

      // Add event listeners for quantity updates and remove buttons
      cartModal.querySelectorAll('.quantity-update').forEach(input => {
        input.addEventListener('change', (e) => {
          const index = parseInt(e.target.getAttribute('data-index'));
          const quantity = parseInt(e.target.value);
          if (quantity >= 1 && quantity <= 100) {
            cart[index].quantity = quantity;
            saveCart();
            toggleCartModal(); // Re-render modal
          } else {
            alert('Please enter a valid quantity (1-100).');
            e.target.value = cart[index].quantity;
          }
        });
      });

      cartModal.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', () => {
          const index = parseInt(button.getAttribute('data-index'));
          cart.splice(index, 1);
          saveCart();
          toggleCartModal(); // Re-render modal
        });
      });

      cartModal.querySelector('.checkout-btn')?.addEventListener('click', () => {
        alert('Proceeding to checkout (not implemented).');
      });
    }
  }

  container.querySelector('.cart-btn').addEventListener('click', toggleCartModal);
  closeCartBtn.addEventListener('click', toggleCartModal);

  // Initialize cart count
  updateCartCount(container);

  return container;
}