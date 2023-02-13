const username = document.getElementById("username-input").value;
  const password = document.getElementById("password-input").value;
  if (username == "") {
    alert("Porfavor un nombre de usuario");
    return;
  }
  if (password == "") {
    alert("Porfavor digite una contraseña");
    return;
  }