document.addEventListener("DOMContentLoaded", () => {
    const cart = [];
    const cartElement = document.getElementById("cart");
    const totalElement = document.getElementById("total");
  
    function updateCart() {
      cartElement.innerHTML = "";
      let total = 0;
  
      cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - ${item.price}€ (x${item.quantity})`;
        
        const removeButton = document.createElement("button");
        removeButton.textContent = "Retirer";
        removeButton.onclick = () => {
          cart.splice(index, 1);
          updateCart();
        };
  
        li.appendChild(removeButton);
        cartElement.appendChild(li);
        total += item.price * item.quantity;
      });
  
      totalElement.textContent = `Total : ${total}€`;
    }
  
    document.querySelectorAll(".add-to-cart").forEach(button => {
      button.addEventListener("click", (event) => {
        const productElement = event.target.parentElement;
        const productId = productElement.dataset.id;
        const productName = productElement.dataset.name;
        const productPrice = parseFloat(productElement.dataset.price);
  
        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
          existingProduct.quantity++;
        } else {
          cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
        }
  
        updateCart();
      });
    });
  });