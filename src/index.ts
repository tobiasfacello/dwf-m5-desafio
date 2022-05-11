import { state } from "./state";
import { initRouter } from "./router";

//* Components
import "./components/title-component";
import "./components/text-component";
import "./components/timer-component";
import "./components/score-component";

function main() {
	const rootEl = document.querySelector(".root");
	state.init();
	initRouter(rootEl);
}

main();
