//  Se declara el tipo "Jugada" para limitar el valor de los datos.
type Jugada = "piedra" | "papel" | "tijeras";

// El tipo "Game" se declara para contener los datos de la partida.
type Game = {
	computerPlay: Jugada;
	myPlay: Jugada;
};

const state = {
	data: {
		//? Es la jugada que se está procesando en el momento de la partida.
		currentGame: {
			computerPlay: "", // Almacena la selección de la máquina
			myPlay: "", // Almacena la selección del usuario
		},
		//? Es el historial de jugadas registradas entre usuario y computadora.
		history: {
			computer: "0",
			player: "0",
			result: "",
		},
	},
	listeners: [],

	init() {
		//? Recupera la data almacenada en localStorage.
		const localData = JSON.parse(localStorage.getItem("game-state-cache"));
		//? Si no se encuentran data, frena el proceso.
		if (!localData) {
			return;
		} else {
			//? Si encuentra data, sobreescribe la data del state.
			this.setState(localData);
		}
	},

	getState() {
		return this.data;
	},

	setState(newState: any) {
		this.data = newState; // Sobreescribe la data.
		for (const callback of this.listeners) {
			callback(); // Ejecuta los listeners suscritos a los cambios en el state.
		}
		//? Almacena en localStorage una copia de los datos actualizados.
		localStorage.setItem("game-state-cache", JSON.stringify(newState));
	},

	//? Recibe y setea la jugada del usuario y la computadora.
	setMoves(myMove, computerMove) {
		const currentState = this.getState();
		currentState.currentGame.myPlay = myMove;
		currentState.currentGame.computerPlay = computerMove;

		this.whoWins(myMove, computerMove);

		this.setState(currentState);
	},
	//? Dependiendo del resultado, el helper indica si ganó el usuario o la computadora.
	whoWins(myPlay: Jugada, computerPlay: Jugada) {
		const currentState = this.getState();
		if (
			(myPlay == "piedra" && computerPlay == "tijeras") ||
			(myPlay == "tijeras" && computerPlay == "papel") ||
			(myPlay == "papel" && computerPlay == "piedra")
		) {
			currentState.history.player++;
			currentState.history.result = "Ganaste!";
		} else if (myPlay == computerPlay) {
			currentState.history.result = "Empate";
		} else {
			currentState.history.computer++;
			currentState.history.result = "Perdiste";
		}
	},

	//? Recibe la función callback que luego va a ser ejecutada cuando el state sea actualizado.
	subscribe(callback: (any) => any) {
		this.listeners.push(callback);
	},
};

export { state };
