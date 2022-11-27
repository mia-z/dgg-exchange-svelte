import "./styles/index.css";
import "./styles/global.scss";
import "flowbite/dist/flowbite.css";
import Root from "./Root.svelte";

const app = new Root({
    target: document.getElementById("app")
});

export default app;
