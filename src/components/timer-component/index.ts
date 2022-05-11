class TimerComponent extends HTMLElement {
	shadow = this.attachShadow({ mode: "open" });
	constructor() {
		super();

		this.countdown();
	}

	render(timeLeft) {
		this.shadow.innerHTML = `
        <div class="seconds-container">
            <h2 class="seconds">${timeLeft}</h2>
        </div>
        `;

		const style = document.createElement("style");
		style.textContent = `
        .seconds-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 200px;
            height: 200px;
            margin-top: 50px;
            background-color: rgba(0,0,0, 0.1);
            border: 20px solid #eee;
            animation: progress;
            animation-duration: 1000ms;
            border-radius: 200px;
        }

        .seconds {
            font-size: 70px;
            font-family: "Poppins", sans-serif;
            font-weight: Bold;
            color: #fff;
        }

        @keyframes progress {
            0% {
                border-color: #FA709A;
            }
            25% {
                border-color: #EC957A;
            }
            50% {
                border-color: #FEE140;
            }
            100% {
                border-color: #FA709A;
            }
        }
        `;
		this.shadow.appendChild(style);
	}

	countdown() {
		let counter = 3;
		const intervals = setInterval(() => {
			if (counter >= 0) {
				this.render(counter);
				counter--;
			} else {
				clearInterval(intervals);
			}
		}, 1000);
	}
}
customElements.define("timer-component", TimerComponent);
