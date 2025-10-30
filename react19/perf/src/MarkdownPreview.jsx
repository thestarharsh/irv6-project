import { memo } from "react";
const JANK_DELAY = 200;

const MarkdownPreview = memo(({ render, options }) => {
  const expensiveRender = () => {
    const start = performance.now();
    while (performance.now() - start < JANK_DELAY) {}
    return null;
  };

  return (
    <div>
      <h1>Last Render: {Date.now()}</h1>
      <div
        className="markdown-preview"
        dangerouslySetInnerHTML={{ __html: render(options.text) }}
        style={{ color: options.theme }}
      ></div>
      {expensiveRender()}
    </div>
  );
});

export default MarkdownPreview;
