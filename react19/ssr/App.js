import { createElement, useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return createElement(
    "div",
    null,
    createElement("h1", null, "Hello World"),
    createElement("p", null, "This is SSR"),
    createElement(
      "button",
      { onClick: () => setCount(count + 1) },
      `Count: ${count}`
    )
  );
}

export default App;
