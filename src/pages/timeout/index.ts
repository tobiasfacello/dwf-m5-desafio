export function initTimeoutPage(containerEl) {
	const divEl = document.createElement("div");
	divEl.classList.add("div-container");

	divEl.innerHTML = `
	<title-component>Se te acabó el tiempo</title-component>
	<text-component>Recordá seleccionar tu movimiento!</text-component>
	<button class="return-button">Volver a jugar</button>
	`;

	const style = document.createElement("style");
	style.textContent = `
		.div-container {
			height: 100vh;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-evenly;
		}		

		@media (min-width: 960px) {
			.div-container {
				flex-direction: row;
			}
		}

		.return-button {
            height: 87px;
            min-width: 315px;
            font-family: "Poppins", sans-serif;
            font-size: 30px;
            font-weight: Bold;
            text-align: center;
            background-size: 200% auto;
            background-image: linear-gradient(to bottom, #93A5CF 0%, #E4EFE9 100%);
            color: white;            
            border: none;
            border-radius: 5px;
          }

          .start-button:active {
            box-shadow: 0 0 5px #fff;              
          }

		  .start-button:hover {
			text-shadow: 0 0 10px #fff;
		  }
	`;

	divEl.appendChild(style);

	const root = document.querySelector(".root");

	const returnEl = divEl.querySelector(".return-button");
	returnEl.addEventListener("click", () => {
		containerEl.goTo("/instrucciones", root);
	});

	return divEl;
}
