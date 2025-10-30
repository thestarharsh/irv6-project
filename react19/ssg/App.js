import { createElement } from "react";

function App() {
  return createElement(
    "div",
    null,
    createElement("h1", null, "Hello World"),
    createElement("p", null, "This is SSG")
  );
}

export default App;
