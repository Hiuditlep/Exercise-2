import { renderApp, TaskApp, attachRootListener } from "./reactive-engine.js";

const root = document.getElementById("app");
attachRootListener(root);
renderApp(TaskApp, root);
