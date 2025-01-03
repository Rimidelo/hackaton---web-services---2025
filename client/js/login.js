document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    if (result.success) {
      alert('Login successful!');
      window.location.href = '/pages/dashboard.html';
    } else {
      alert('Error: ' + result.message);
    }
  });
