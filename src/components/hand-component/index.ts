const hands = {
	tijeras: require("url:../../images/tijeras.png"),
	piedra: require("url:../../images/piedra.png"),
	papel: require("url:../../images/papel.png"),
};

class HandComponent extends HTMLElement {
	shadow = this.attachShadow({ mode: "open" });
	constructor() {
		super();

		const style = document.createElement("style");
		style.textContent = `
		.play-button {
			border: none;
			background-color: rgba(1, 1, 1, 0);
		}

		@media (min-width: 960px) {
			.play-button img:active {
				border-radius: 10px;
				// box-shadow: 0 0 15px rgba(102,126,234,1);
			}
		}

		.hand-img {
			height: 100%;
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

		this.render();
		this.shadow.appendChild(style);
	}

	connectedCallback() {}

	addListeners() {
		this.addEventListener("click", () => {
			const event = new CustomEvent("selectHand", {
				detail: {
					handPlay: this.getAttribute("hand"),
				},
			});
			this.dispatchEvent(event);
		});
	}

	render() {
		const typeAttr = this.getAttribute("type");
		const handAttr = this.getAttribute("hand");
		this.shadow.innerHTML = `
		<div class="play-button" type="${typeAttr}"><img class="hand-img" src="${hands[handAttr]}"></div>
		`;
	}
}

customElements.define("hand-component", HandComponent);
