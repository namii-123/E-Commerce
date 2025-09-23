export function DashboardPage(navigate) {
  const container = document.createElement("div");
  container.className = "dashboard-container";

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
      <div class="product-card">
        <img src="./assets/headphone.jpg" alt="Headphone">
        <h3>Headphone</h3>
        <p>526.00</p>
        <div class="button-group">
          <button class="buy-btn">Buy Now</button>
          <button class="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
      <div class="product-card">
        <img src="./assets/laptop.png" alt="HP Laptop">
        <h3>HP Laptop</h3>
        <p>20 000.00</p>
        <div class="button-group">
          <button class="buy-btn">Buy Now</button>
          <button class="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
      <div class="product-card">
        <img src="./assets/mouse.jpg" alt="Bluetooth Mouse">
        <h3>Bluetooth Mouse</h3>
        <p>280.00</p>
        <div class="button-group">
          <button class="buy-btn">Buy Now</button>
          <button class="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
      <div class="product-card">
        <img src="./assets/stand.jpg" alt="Laptop Stand">
        <h3>Laptop Stand</h3>
        <p>150.00</p>
        <div class="button-group">
          <button class="buy-btn">Buy Now</button>
          <button class="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
    </section>
  `;

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
        case 'signout':
          navigate('login');
          break;
      }
    });
  });

  return container;
}