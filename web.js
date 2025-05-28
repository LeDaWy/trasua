function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("active");
}
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
  const found = cart.find((item) => item.name === name);
  if (found) {
    found.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");

  if (!cartItems || !cartTotal || !cartCount) return;

  cartItems.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    count += item.quantity;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      ${item.name} x${item.quantity} - ${(
      item.price * item.quantity
    ).toLocaleString()} đ
      <button onclick="removeFromCart(${index})" style="margin-left: 10px; background-color: red; color: white; border: none; border-radius: 4px; cursor: pointer;">❌</button>
    `;

    cartItems.appendChild(div);
  });

  cartTotal.textContent = total.toLocaleString();
  cartCount.textContent = count;
}

function removeFromCart(index) {
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1); // Xóa 1 phần tử tại vị trí index
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
  }
}

function toggleCart() {
  const cartBox = document.getElementById("cart");
  if (!cartBox) return;
  cartBox.style.display = cartBox.style.display === "none" ? "block" : "none";
}

window.onload = updateCartUI;
function goToCheckout() {
  if (cart.length === 0) {
    alert("🛑 Giỏ hàng đang trống!");
    return;
  }
  // Lưu giỏ hàng vào localStorage để trang thanh toán lấy được
  localStorage.setItem("cart", JSON.stringify(cart));

  // Chuyển sang trang thanh toán
  window.location.href = "thanhtoan.html";
}

//=====================Thanh T
// ====== ĐĂNG KÝ =========================================================
const registerForm = document.querySelector(".register-form");
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const number = document.getElementById("number").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const errorMessage = document.getElementById("register-error");

    if (password !== confirmPassword) {
      errorMessage.textContent = "❌ Mật khẩu xác nhận không khớp!";
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((u) => u.number === number)) {
      errorMessage.textContent = "❌ Số điện thoại đã được đăng ký!";
      return;
    }

    users.push({ number, password });
    localStorage.setItem("users", JSON.stringify(users));
    errorMessage.textContent = "";
    alert("✅ Đăng ký thành công!");
    window.location.href = "dangnhap.html";
  });
}

// ====== ĐĂNG NHẬP ======
const loginForm = document.querySelector(".login-form");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const number = document.getElementById("number").value.trim();
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("login-error");

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.number === number && u.password === password
    );

    if (user) {
      errorMessage.textContent = "";
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      alert("✅ Đăng nhập thành công!");
      window.location.href = "diachi.html";
    } else {
      errorMessage.textContent = "❌ Sai số điện thoại hoặc mật khẩu!";
    }
  });
}

//--------------Phần Địa Chỉ
function saveAddress() {
  const address = document.getElementById("address").value.trim();
  const user = JSON.parse(localStorage.getItem("loggedInUser")) || {};

  user.address = address;
  localStorage.setItem("loggedInUser", JSON.stringify(user));

  window.location.href = "html.html"; // hoặc trang bạn muốn chuyển đến
}

//-----------------Tài Khoản
const user = JSON.parse(localStorage.getItem("loggedInUser"));
      if (user) {
        document.getElementById("user-number").textContent =
          user.number || "Chưa có";
        document.getElementById("user-address").textContent =
          user.address || "Chưa nhập";
      } else {
        document.body.innerHTML = "<p>Chưa đăng nhập</p>";
      }
