import { initHomePage } from "./pages/welcome";
import { initInstructionPage } from "./pages/instrucciones";
import { initPlayPage } from "./pages/jugada";
import { initTimeoutPage } from "./pages/timeout";
import { initResultsPage } from "./pages/resultado";
import { initGreetingsPage } from "./pages/greetings";

const BASE_PATH = "/dwf-m5-desafio";

const routes = [
	{
		path: /\/welcome/,
		component: initHomePage,
	},
	{
		path: /\/instrucciones/,
		component: initInstructionPage,
	},
	{
		path: /\/jugada/,
		component: initPlayPage,
	},
	{
		path: /\/timeout/,
		component: initTimeoutPage,
	},
	{
		path: /\/resultado/,
		component: initResultsPage,
	},
	{
		path: /\/greetings/,
		component: initGreetingsPage,
	},
];

//? Comprueba si la URL forma parte del host de Github Pages.
function isGithubPages() {
	return location.host.includes("github.io");
}

function goTo(path, containerEl?) {
	//? Si la se cumple, añade el prefijo correspondiente al deploy.
	//? Sino, devuelve el path tomando como directorio la raíz.
	const completePath = isGithubPages() ? BASE_PATH + path : path;

	history.pushState({}, "", completePath);
	handleRoute(completePath, containerEl);
}

function handleRoute(route: string, containerEl?) {
	console.log("La ruta recibida por handleRoute es: ", route);

	//? De esta forma permite quitar el BASE_PATH cuando no sea necesario.
	const newRoute = isGithubPages ? route.replace(BASE_PATH, "") : route;

	for (const r of routes) {
		if (r.path.test(newRoute)) {
			const el: any = r.component({ goTo: goTo });

			if (containerEl.firstChild) {
				containerEl.firstChild.remove();
			}

			containerEl.appendChild(el);
		}
	}
}
function initRouter(containerEl: Element) {
	//? Si la ruta es "/" redirige a la pantalla "/welcome".
	if (location.pathname == "/") {
		window.addEventListener("load", () => {
			goTo("/welcome", containerEl);
		});
	}

	handleRoute(location.pathname, containerEl);
}

export { initRouter, goTo };
