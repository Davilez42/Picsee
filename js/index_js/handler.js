async function handleCredentialResponse(response) {
  console.log(response);
  const resp = await fetch("http://localhost:5000/api/v1/auth_plataform", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(response),
  });
  if (resp.ok) {
    const data = await resp.json();
    window.sessionStorage.setItem("loggedUser", JSON.stringify(data));
    window.location.href = "./index.html";
  }
}
