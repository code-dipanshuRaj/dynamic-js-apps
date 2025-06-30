document.addEventListener("DOMContentLoaded", () => {

  let products = [
    {
      id: 1,name: "Product 1",price: 5.99,
    },
    {
      id: 2,name: "Product 2",price: 45.99,
    },
    {
      id: 3,name: "Product 3",price: 32.99,
    },
    {
      id: 4,name: "Product 4",price: 10.99,
    },
  ];

  const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
  
  const productList = document.getElementById("product-items");
  const cartList = document.getElementById("cartContainer");
  const cartTotal = document.getElementById("cart-total");
  const errorMessage = document.getElementById("error-message");
  const totalAmount = document.getElementById("total-amount");
  const checkoutButton = document.getElementById("checkout-button");

  products.forEach( product => {
    const productItem = document.createElement("div");
    productItem.innerHTML = `
      <div class="flex justify-between items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg p-2">
        <span class="p-2">${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id="${product.id}" type="submit" class="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded">Add to Cart</button>
      </div>
    `;
    productList.appendChild(productItem);
  });

  renderCart(cart);

  productList.addEventListener("click", (e) =>{
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find(p => p.id === productId);
      console.log(product);
      addToCart(product);
    }
  });

  function addToCart(product) {
    const existingProduct = cart.find(p => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart(cart);
  }

  function renderCart(cart) {
    if (cart.length === 0) {
      cartList.innerHTML = "<p id='error-message' class='p-2'>Your cart is empty</p>";
      totalAmount.innerText = "$0.00";
      cartTotal.classList.add("hidden");
      return;
    }
    cartList.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <div class="flex justify-between items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg p-2">
          <span class="p-2">${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</span>
          <button data-id="${item.id}" type="submit" class="bg-red-500 hover:bg-red-700 text-white p-2 rounded">Remove</button>
        </div>
      `;
      cartList.appendChild(cartItem);
      total += item.price * item.quantity;
    });
    totalAmount.innerText = `$${total.toFixed(2)}`;
    localStorage.setItem("cart", JSON.stringify(cart));
    cartTotal.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  cartList.addEventListener("click", (e) => {
    if (e.target.classList.contains("bg-red-500")) {
      const id = parseInt(e.target.getAttribute("data-id"));
      removeFromCart(id);
    }
  });

  checkoutButton.addEventListener("click", () => {
    if (cart.length === 0) {
      errorMessage.innerText = "Your cart is empty!";
      errorMessage.classList.remove("hidden");
      return;
    }
    errorMessage.classList.add("hidden");
    // Proceed to checkout
    alert("Proceeding to checkout...");
    renderCart([]);
    localStorage.removeItem("cart");
    console.log(cart);
  });

  function removeFromCart(id) {
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
      cart[itemIndex].quantity -= 1;
      if (cart[itemIndex].quantity === 0) {
        cart.splice(itemIndex,1);
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart(cart);
  }
});