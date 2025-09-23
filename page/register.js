export function RegisterPage(navigate) {
  const container = document.createElement("div");
  container.className = "auth-container";

  container.innerHTML = `
    <div class="auth-card">
      <h2>SIGN UP</h2>
      <form>
        
          <input type="text" placeholder="Firstname" required>
          <input type="text" placeholder="Lastname" required>
        <input type="text" placeholder="Contact Number" required>
        <input type="email" placeholder="Email" required>
          <div class="password-wrapper">
          <input type="password" id="passwordInput" placeholder="Password" required>
          <span id="togglePassword" class="toggle-password">
            <!-- default icon: eye -->
            <svg xmlns="http://www.w3.org/2000/svg" id="eyeOpen" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="22" height="22">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <!-- hidden icon: eye-slash -->
            <svg xmlns="http://www.w3.org/2000/svg" id="eyeClosed" style="display:none;" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="22" height="22">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7 
                0.51-1.624 1.496-3.07 2.8-4.182m3.824-2.386A9.956 
                9.956 0 0112 5c4.477 0 8.268 2.943 9.542 
                7-.438 1.396-1.2 2.63-2.21 3.618M15 12a3 3 0 
                11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M3 3l18 18" />
            </svg>
          </span>
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <a href="#" id="goLogin">Sign In</a></p>
    </div>
    <div class="auth-image">
      <img src="./assets/shopping.png" alt="Shopping Image">
    </div>
  `;

  
  container.querySelector("#goLogin").addEventListener("click", (e) => {
    e.preventDefault();
    navigate("login");
  });

 

  const passwordInput = container.querySelector("#passwordInput");
  const eyeOpen = container.querySelector("#eyeOpen");
  const eyeClosed = container.querySelector("#eyeClosed");

  container.querySelector("#togglePassword").addEventListener("click", () => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeOpen.style.display = "none";
      eyeClosed.style.display = "block";
    } else {
      passwordInput.type = "password";
      eyeOpen.style.display = "block";
      eyeClosed.style.display = "none";
    }
  });


  
  return container;
}
