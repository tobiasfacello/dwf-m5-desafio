import { goTo } from "../../router";
import { state } from "../../state";

//! Images
const tijerasImg = require("url:../../images/tijeras.png");
const piedraImg = require("url:../../images/piedra.png");
const papelImg = require("url:../../images/papel.png");

export function initHomePage(containerEl) {
	const divEl = document.createElement("div");
	divEl.classList.add("div-container");

	divEl.innerHTML = `
    <div class="title-container">
    <title-component>Piedra, Papel ó Tijeras</title-component>
    </div>
    <button class="start-button" path="/instrucciones">Empezar</button>
    <div class="rps-container">
        <img class="hand-img" src="${tijerasImg}">
        <img class="hand-img" src="${piedraImg}">    
        <img class="hand-img" src="${papelImg}">
    </div>
    `;

	const style = document.createElement("style");
	style.textContent = `

        .div-container {
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            padding: 0 30px;
        }

        .start-button {
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

        .rps-container {
            display: flex;
            width: 100%;
            justify-content: space-evenly;
        }

        @media (min-width: 960px) {
            .rps-container {
                width: 30%;
            }
        }

        .hand-img {
            width: 100px;
        }
    `;

	divEl.appendChild(style);

	const root = document.querySelector(".root");

	const buttonEl = divEl.querySelector(".start-button");

	buttonEl.addEventListener("click", (e) => {
		const target = e.target as any;
		const route = target.getAttribute("path");
		goTo(route, root);
	});

	return divEl;
}
