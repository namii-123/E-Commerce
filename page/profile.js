export function ProfilePage(navigate) {
  const container = document.createElement("div");
  container.className = "profile-container";

  container.innerHTML = `
    <div class="profile-main">
      <header class="dashboard-header">
        <div class="logo">🛒 ShoppingSphere</div>
        <nav>
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

      <section class="profile-card-header">
        <div class="profile-info">
          <img src="./assets/user.jpg" alt="Profile Picture" class="profile-avatar">
          <div>
            <h2 class="profile-name">Donna May Magsucang</h2>
            <p class="profile-email">donnamaymagsucang@gmail.com</p>
          </div>
        </div>
        <button class="edit-btn">Edit</button>
      </section>

      <section class="profile-details">
        <div class="detail-box">
          <span class="label">Address:</span>
          <span class="value">Proper Valencia, Carcar City, Cebu</span>
        </div>
        <div class="detail-box">
          <span class="label">Contact Number:</span>
          <span class="value">09509664522</span>
        </div>
        <div class="detail-box">
          <span class="label">Gender:</span>
          <span class="value">Female</span>
        </div>
      </section>
    </div>
  `;

  
  const profileToggle = container.querySelector("#profile-toggle");
  const profileMenu = container.querySelector("#profile-menu");

  profileToggle.addEventListener("click", () => {
    profileMenu.classList.toggle("show"); 
  });

  const items = container.querySelectorAll(".dropdown-item");
  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const action = item.getAttribute("data-action");

      if (action === "dashboard") {
        navigate("dashboard"); 
      } else if (action === "profile") {
        navigate("profile"); 
      } else if (action === "transactions") {
        navigate("transactions");
      } else if (action === "signout") {
        navigate("signout");
      }
    });
  });

  return container;
}
