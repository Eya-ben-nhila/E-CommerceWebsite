// cart.js
document.addEventListener('DOMContentLoaded', async () => {
  if (!localStorage.getItem('token')) {
    window.location.href = '/login.html';
    return;
  }

  try {
    const response = await fetch('/api/cart', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    const cart = await response.json();
    renderCart(cart);
    
    // Checkout handler
    document.querySelector('.checkout-btn').addEventListener('click', async () => {
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      window.location.href = '/order-confirmation.html';
    });
    
  } catch (error) {
    console.error("Cart error:", error);
  }
});

function renderCart(cart) {
  const container = document.querySelector('.cart-items');
  if (!cart.items.length) {
    container.innerHTML = '<p>Your cart is empty</p>';
    return;
  }

  container.innerHTML = cart.items.map(item => `
    <div class="cart-item">
      <img src="${item.product.image}" width="80">
      <div>
        <h4>${item.product.name}</h4>
        <p>Size: ${item.size} | Qty: 
          <button onclick="updateQuantity('${item._id}', -1)">-</button>
          ${item.quantity}
          <button onclick="updateQuantity('${item._id}', 1)">+</button>
        </p>
      </div>
      <div class="price">$${(item.product.price * item.quantity).toFixed(2)}</div>
      <button onclick="removeItem('${item._id}')">×</button>
    </div>
  `).join('');

  // Update totals
  document.querySelector('.subtotal').textContent = 
    `$${cart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0).toFixed(2)}`;
}

// These would work via event delegation
async function updateQuantity(itemId, change) {
  await fetch(`/api/cart/${itemId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ change })
  });
  location.reload();
}

async function removeItem(itemId) {
  await fetch(`/api/cart/${itemId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  location.reload();
}