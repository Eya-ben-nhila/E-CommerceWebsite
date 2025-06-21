// Sample user data (in a real app, this would come from your backend)
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "password123"
  }
];

// Login functionality
document.addEventListener('DOMContentLoaded', function() {
  // Login form
  if (document.getElementById('login-form')) {
    document.getElementById('login-form').addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        // In a real app, you would set authentication tokens here
        localStorage.setItem('currentUser', JSON.stringify(user));
        showToast('Login successful!');
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1000);
      } else {
        showToast('Invalid email or password', 'error');
      }
    });
  }
  
  // Registration form
  if (document.getElementById('register-form')) {
    document.getElementById('register-form').addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      
      if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
      }
      
      if (password.length < 8) {
        showToast('Password must be at least 8 characters', 'error');
        return;
      }
      
      // Check if user already exists
      if (users.some(u => u.email === email)) {
        showToast('Email already registered', 'error');
        return;
      }
      
      // Add new user (in a real app, this would go to your backend)
      const newUser = {
        id: users.length + 1,
        name,
        email,
        password
      };
      users.push(newUser);
      
      // Log the user in
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      showToast('Registration successful!');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    });
  }
});

// Show toast notification
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}

// Add toast styles dynamically if not already added
if (!document.getElementById('toast-styles')) {
  const style = document.createElement('style');
  style.id = 'toast-styles';
  style.textContent = `
    .toast {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background-color: var(--dark);
      color: white;
      padding: 12px 24px;
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-lg);
      z-index: 1000;
      opacity: 0;
      transition: all 0.3s ease;
    }
    
    .toast.success {
      background-color: #10b981;
    }
    
    .toast.error {
      background-color: #ef4444;
    }
    
    .toast.show {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
  `;
  document.head.appendChild(style);
}