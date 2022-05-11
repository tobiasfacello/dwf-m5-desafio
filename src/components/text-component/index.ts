class TextComponent extends HTMLElement {
	shadow = this.attachShadow({ mode: "open" });
	constructor() {
		super();
		this.render();

		const style = document.createElement("style");
		style.textContent = `
        .text {
            margin: 20px 0;
            font-family: "Poppins", sans,serif;
            font-size: 40px;
            font-weight: 500;
            text-align: center;
            color: #eee;
        }

        @media (min-width: 960px) {
            .text {
                width: 450px;
            }
        }
        `;

		this.shadow.appendChild(style);
	}

	render() {
		this.shadowRoot.innerHTML = `
        <p class="text">${this.textContent}</p>
        `;
	}
}

customElements.define("text-component", TextComponent);
