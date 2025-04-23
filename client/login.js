function loginBtn() {
  let url = "https://d1-vz08.onrender.com/login";

  const email = document.getElementById("emailF").value;
  const password = document.getElementById("passwordF").value;

  const data = {
    email,
    password,
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    if (data.status) {
      alert(data.message);
      localStorage.setItem('token', data.token);
      window.location.href = 'dashboard.html';
    } else {
      alert('Login failed!');
    }
  })
  .catch(err => {
    console.error('Login error:', err);
  });
}