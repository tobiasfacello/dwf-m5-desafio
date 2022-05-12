import { state } from "../../state";

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
		<hand-component class="hand" type="tijeras" hand="tijeras"></hand-component>
		<hand-component class="hand" type="piedra" hand="piedra"></hand-component>
		<hand-component class="hand" type="papel" hand="papel"></hand-component>
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

		@media (min-width: 960px) {
			.div-container {
				padding: 0;
			}
		}

        .rps-container {
            display: flex;
            width: 100%;
            justify-content: space-evenly;
			align-items: end;
        }

        @media (min-width: 960px) {
            .rps-container {
                width: 30%;
            }
        }
    `;

	divEl.appendChild(style);

	const root = document.querySelector(".root");

	const rpsContainer = divEl.querySelector(".rps-container").children;
	for (const play of rpsContainer) {
		play.addEventListener("click", (e) => {
			e.preventDefault();
			const myPlay = play.getAttribute("type");
			const computerPlay = ["piedra", "papel", "tijeras"][
				Math.trunc(Math.random() * 3)
			];
			console.log(myPlay, computerPlay);
			state.setMoves(myPlay, computerPlay);

			const style = document.createElement("style");

			style.textContent = `
			.div-container {
				height: 101vh;
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
				align-items: start;
			}

			.myPlay-container {
				display: flex;
				align-items: end;
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
			<hand-component class="computer-hand" type="${computerPlay}" hand="${computerPlay}"></hand-component>
			</div>
			<div class="myPlay-container">
			<hand-component class="player-hand" type="${myPlay}" hand="${myPlay}"></hand-component>
			</div>
			`;

			const playerHand = divEl.querySelector(".player-hand");
			const playerHandImg =
				playerHand.shadowRoot.querySelector(".hand-img");
			playerHandImg.setAttribute(
				"style",
				`
				height: 100%;
				width: 200px;
			`
			);

			const computerHand = divEl.querySelector(".computer-hand");
			const computerHandImg =
				computerHand.shadowRoot.querySelector(".hand-img");

			computerHandImg.setAttribute(
				"style",
				`
				height: 100%;
				width: 200px;
				transform: rotate(180deg);
			`
			);

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

	return divEl;
}
