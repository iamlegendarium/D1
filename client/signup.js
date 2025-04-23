function signupBtn(event) {
    event.preventDefault();
  let url = "https://d1-vz08.onrender.com/register";

  const firstName = document.getElementById("fName").value;
  const lastName = document.getElementById("lName").value;
  const email = document.getElementById("emailF").value;
  const password = document.getElementById("passwordF").value;

  const data = {
    firstName,
    lastName,
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
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}
