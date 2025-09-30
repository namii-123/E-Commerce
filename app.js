import { LoginPage } from "./page/login.js";
import { RegisterPage } from "./page/register.js";
import { DashboardPage } from "./page/dashboard.js";
import { ProfilePage } from "./page/profile.js";
import { CartPage } from "./page/cart.js"; 

function navigate(page) {
  const root = document.getElementById("app");
  root.innerHTML = "";

  if (page === "login") root.appendChild(LoginPage(navigate));
  if (page === "register") root.appendChild(RegisterPage(navigate));
  if (page === "dashboard") root.appendChild(DashboardPage(navigate));
  if (page === "profile") root.appendChild(ProfilePage(navigate));
  if (page === "cart") root.appendChild(CartPage(navigate)); 
}

navigate("login");