import { state } from "../../state";

//! Images
const tijeras = require("url:../../images/tijeras.png");
const piedra = require("url:../../images/piedra.png");
const papel = require("url:../../images/papel.png");

export function initPlayPage(containerEl) {
	let counter = 3;

	const intervals = setInterval(() => {
		counter--;
		if (counter < -1) {
			clearInterval(intervals);
			containerEl.goTo("/timeout", root);
		}
	}, 1000);

	const divEl = document.createElement("div");
	divEl.classList.add("div-container");

	divEl.innerHTML = `   
	<timer-component></timer-component>
    <div class="rps-container">
		<button class="play-button play-tijeras" type="tijeras"><img class="hand-img" src="${tijeras}"></button>
        <button class="play-button play-piedra" type="piedra"><img class="hand-img" src="${piedra}"></button>
        <button class="play-button play-papel" type="papel"><img class="hand-img" src="${papel}"></button>
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

		.play-button {
			border: none;
			background-color: rgba(1, 1, 1, 0);
		}

		@media (min-width: 960px) {
			.play-button img:hover {
				border-radius: 10px;
				box-shadow: 0 0 15px rgba(102,126,234,1);
			}
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

		.hand-img:active {
			backgroud-color: #fff;
		}

		@media (min-width: 960px) {
			.hand-img {
				width: 150px;
			}
		}
    `;

	divEl.appendChild(style);

	const root = document.querySelector(".root");

	const rpsContainer = divEl.querySelector(".rps-container").children;
	for (const play of rpsContainer) {
		play.addEventListener("click", () => {
			console.log(play.getAttribute("type"));
			const myPlay = play.getAttribute("type");
			const computerPlay = ["piedra", "papel", "tijeras"][
				Math.trunc(Math.random() * 3)
			];
			console.log(myPlay, computerPlay);
			state.setMoves(myPlay, computerPlay);

			const style = document.createElement("style");

			style.textContent = `
			.div-container {
				height: 100vh;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
            	background: linear-gradient(109.6deg, rgba(33,25,180,1) 11.2%, rgba(253,29,29,1) 55.2%, rgba(252,176,69,1) 91.1%);
				background-size: 600% 600%;
				animation: gradient 3s ease infinite;
			}

			.computerPlay-container {
				height: 100vh;
			}
			.myPlay-container {
				display: flex;
				align-items: flex-end;
				height: 100vh;
			}

			@keyframes gradient {
				0% {
					background-position: 0% 50%;
				}
				50% {
					background-position: 100% 50%;
				}
				100% {
					background-position: 0% 50%;
				}
			}

			@keyframes shadow {
				0% {
					box-shadow: 0 0 100px #fff;
				}
				50% {
					box-shadow: 0 0 300px #fff;
				}
				100% {
					box-shadow: 0 0 100px #fff;
				}
			}
			`;

			divEl.innerHTML = `
			<div class="computerPlay-container">
			<img class="selected-hand-img" style="transform: rotate(180deg); width: 200px;" src="${require(`url:../../images/${computerPlay}.png`)}">
			</div>
			<div class="myPlay-container">
			<img class="selected-hand-img" style="width: 200px;" src="${require(`url:../../images/${myPlay}.png`)}">
			</div>
			`;

			divEl.appendChild(style);

			let counterResult = 0.7;
			const intervalResultAppearance = setInterval(() => {
				counterResult--;
				if (counterResult < 0) {
					clearInterval(intervals);
					clearInterval(intervalResultAppearance);
					containerEl.goTo("/resultado", root);
				}
			}, 1000);
		});
	}

	const buttonTijeras: any = divEl.querySelector(".play-tijeras");
	const buttonPiedra: any = divEl.querySelector(".play-piedra");
	const buttonPapel: any = divEl.querySelector(".play-papel");

	buttonTijeras.addEventListener("click", () => {
		buttonTijeras.style = `
			position: relative;
			bottom: 50px;
			transform: scale(1.5);
		`;

		buttonPiedra.style = `
			position: relative;
			top: 50px;
			opacity: 0.5;
		`;

		buttonPapel.style = `
			position: relative;
			top: 50px;
			opacity: 0.5;
		`;
	});

	buttonPiedra.addEventListener("click", () => {
		buttonPiedra.style = `
			position: relative;
			bottom: 50px;
			transform: scale(1.5);
		`;

		buttonTijeras.style = `
			position: relative;
			top: 50px;
			opacity: 0.5;
		`;

		buttonPapel.style = `
			position: relative;
			top: 50px;
			opacity: 0.5;
		`;
	});

	buttonPapel.addEventListener("click", () => {
		buttonPapel.style = `
			position: relative;
			bottom: 50px;
			transform: scale(1.5);
		`;

		buttonTijeras.style = `
			position: relative;
			top: 50px;
			opacity: 0.5;
		`;

		buttonPiedra.style = `
			position: relative;
			top: 50px;
			opacity: 0.5;
		`;
	});

	return divEl;
}
