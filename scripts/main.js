import { loadComponents } from "./utils/componentLoader.js";
import { initAllObservers } from "./utils/observers.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadComponents();
  initAllObservers();
});
