import { goTo } from "../../router";
import { state } from "../../state";

//! Images
const winnerImg = require("url:../../images/winner.png");
const loserImg = require("url:../../images/loser.png");
const drawImg = require("url:../../images/draw.png");

export function initResultsPage(containerEl) {
	const divEl = document.createElement("div");
	divEl.classList.add("div-container");

	function getResult() {
		const currentState = state.getState();
		return currentState.history.result;
	}

	function getImgResult() {
		const currentState = state.getState();
		if (currentState.history.result == "Ganaste!") {
			return winnerImg;
		} else if (currentState.history.result == "Perdiste") {
			return loserImg;
		} else {
			return drawImg;
		}
	}

	divEl.innerHTML = `
    <img class="result-img" src="${getImgResult()}">
    <h2 class="result-title">${getResult()}</h2>
    <score-component></score-component>
    <div class="button-container">
        <button class="restart-button" path="/instrucciones">Volver a jugar</button>
        <button class="quit-button" path="/greetings">Salir</button>
    </div>
    `;

	const style = document.createElement("style");
	style.textContent = `

        .div-container {
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
            padding: 0 30px;
        }

        .result-img {
            width: 100px;
        }

        .result-title {
            margin: 0;
            font-family: "Koulen", sans-serif;
            font-size: 50px;
            font-weight: 400;
            color: #fff;
            text-shadow: 0 0 10px #fff;
        }

        .restart-button,
        .quit-button {
            height: 80px;
            min-width: 315px;
            margin: 5px;
            font-family: "Poppins", sans-serif;
            font-size: 30px;
            font-weight: Bold;
            text-align: center;
            background-size: 200% auto;
            background-image: linear-gradient(to right, #93A5CF 0%, #E4EFE9 100%);
            color: white;            
            border: none;
            border-radius: 5px;
          }

          .quit-button {
            background-image: linear-gradient(to right, #D31027 0%, #EA384D  51%, #D31027  100%);
          }

          
          .restart-button:active,
          .quit-button:active {
              box-shadow: 0 0 5px #fff;              
            }
            
            .restart-button:hover,
            .quit-button:hover {
              text-shadow: 0 0 10px #fff;
            }
    `;

	divEl.appendChild(style);

	const root = document.querySelector(".root");

	const restartButtonEl = divEl.querySelector(".restart-button");
	restartButtonEl.addEventListener("click", () => {
		const path = restartButtonEl.getAttribute("path");
		goTo(path, root);
	});

	const quitButtonEl = divEl.querySelector(".quit-button");
	quitButtonEl.addEventListener("click", () => {
		const path = quitButtonEl.getAttribute("path");
		goTo(path, root);
	});

	return divEl;
}
