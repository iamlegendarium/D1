document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
  
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode payload
      const email = payload.email;
  
    //   document.getElementById('welcomeMsg').textContent = `Welcome, ${email}`;
    // Inject into the HTML
    document.getElementById('userEmail').textContent = email;
    } else {
      // Redirect if token not found
      window.location.href = 'login.html';
    }
  });
  