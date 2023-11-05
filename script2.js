document.addEventListener("DOMContentLoaded", function () {
  console.log("funciona script");
  console.log(document.getElementById("sendSSML"));
  //console.log(document.getElementById("btnPlay"));
  const sendButton = document.getElementById("sendSSML");
  sendButton.addEventListener("click", function () {
    let text = document.getElementById("textArea").value;
    console.log(text); // Expected Value: 'Data'
    let url =
      "https://europe-west1-deductive-wares-233220.cloudfunctions.net/SSML-to-audio";
    let _datos = {
      gID: "3cDe",
      ssml: text,
    };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(_datos),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error de HTTP, estado = ${response.status}`);
        }
        return response.blob();
      })
      .then((blob) => {
        const audioElement = document.createElement("audio");
        audioElement.src = URL.createObjectURL(blob);
        audioElement.controls = true;
        document.body.appendChild(audioElement);
      })
      .catch((error) => {
        console.error("Error al obtener el archivo de audio:", error);
      });
  });
});

function comprobarRespuesta() {
  // Obtener el valor seleccionado del radio button
  var seleccionado = document.querySelector(
    'input[name="flexRadioDefault"]:checked'
  ).value;
  var alertaRespuesta = document.getElementById("alertaRespuesta");
  // Comprobar si la respuesta seleccionada es la opción "a"
  if (seleccionado === "a") {
    alertaRespuesta.textContent = "¡Respuesta Correcta!";
    alertaRespuesta.classList.remove("alert-danger");
    alertaRespuesta.classList.add("alert-success");
  } else {
    alertaRespuesta.textContent = "¡Respuesta Incorrecta! Inténtalo de nuevo.";
     alertaRespuesta.classList.remove("alert-success");
    alertaRespuesta.classList.add("alert-danger");
    // Mostrar la alerta de respuesta
    alertaRespuesta.style.display = "block";
  }
}
