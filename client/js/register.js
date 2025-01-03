document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !username || !password) {
      alert('All fields are required!');
      return;
    }

    if (!validateEmail(email)) {
      alert('Invalid email format!');
      return;
    }

    if (!validatePassword(password)) {
      alert('Password must be at least 8 characters, including one uppercase letter, one lowercase letter, and one number.');
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password }),
      });

      const result = await response.json();
      if (result.success) {
        alert('Registration successful! You can now log in.');
        window.location.href = '/pages/login.html'; // Redirect to login page
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Something went wrong. Please try again later.');
    }
  });

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }
