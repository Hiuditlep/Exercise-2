import { renderApp, attachRootListener } from "./reactive-engine.js";
import { DataFeed } from "./state-machine.js";

const root = document.getElementById("app");
attachRootListener(root);
renderApp(DataFeed, root);
