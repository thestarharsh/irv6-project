"use client";

import { useState } from "react";

export default function ClientComponent() {
  console.log("Rendering ClientComponent client component");
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Client Component</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
