class TitleComponent extends HTMLElement {
	shadow = this.attachShadow({ mode: "open" });
	constructor() {
		super();

		this.render();

		const style = document.createElement("style");
		style.textContent = `

        .title {
            width: 300px;
            padding: 5px;
            font-family: "Poppins", sans-serif;
            font-size: 75px;
            font-weight: Bold;
            text-align: center;
            line-height: 90px;
            border-radius: 10px;
            background-image: linear-gradient(180deg, #FA709A 0%, #FEE140 100%);
            background-size: 100%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent; 
            -moz-background-clip: text;
            -moz-text-fill-color: transparent;
            animation: shadow 3s ease infinite;
        }

        @keyframes shadow {
            0% {
                box-shadow: 0 0 10px #fff;
            }
            50% {
                box-shadow: 0 0 100px #fff;
            }
            100% {
                box-shadow: 0 0 10px #fff;
            }
        }
        `;

		this.shadow.appendChild(style);
	}

	render() {
		this.shadow.innerHTML = `
        <h1 class="title">${this.textContent}</h1>
        `;
	}
}

customElements.define("title-component", TitleComponent);
