import { state } from "../../state";

class ScoreComponent extends HTMLElement {
	shadow = this.attachShadow({ mode: "open" });
	constructor() {
		super();

		this.render();

		const style = document.createElement("style");

		style.textContent = `
        .score-container {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
            height: 300px;
            width: 250px;
            background: linear-gradient(109.6deg, rgba(33,25,180,1) 11.2%, rgba(253,29,29,1) 55.2%, rgba(252,176,69,1) 91.1%);
			background-size: 600% 600%;
            animation: gradient 3s ease infinite;
            border-radius: 10px;
        }

        .score-title {
            font-family: "Poppins", sans-serif;
            font-size: 40px;
            font-weight: 700;
            color: #fff;
            text-shadow: 0 0 10px #fff;
        }

        .user-score,
        .computer-score {
            font-family: "Poppins", sans-serif;
            font-size: 30px;
            font-weight: 500;
            color: #eee;
            text-shadow: 0 0 10px #fff;
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

        `;

		this.shadow.appendChild(style);
	}

	getScores() {
		const currentState = state.getState();
		return [currentState.history.player, currentState.history.computer];
	}

	render() {
		this.shadow.innerHTML = `
        <div class="score-container">
            <h2 class="score-title">Score</h2>
            <p class="user-score">Jugador: ${this.getScores()[0]}</p>
            <p class="computer-score">Máquina: ${this.getScores()[1]}</p>
        </class>
        `;
	}
}
customElements.define("score-component", ScoreComponent);
