import SyntaxHighlighter from 'react-syntax-highlighter';
import { rainbow } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

const CopyButton = ({ target }) => {
  const handleCopy = async () => {
    if (target) {
      try {
        await navigator.clipboard.writeText(target);
        alert('copied');
      } catch (error) {
        alert(`fail to copy: ${error}`);
      }
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute right-0.5 m-2 p-0.5 bg-white rounded-lg text-black"
    >
      copy
    </button>
  );
};

export default function CodeBlock({ children }) {
  return (
    <div className="relative">
      <CopyButton target={children} />
      <SyntaxHighlighter showLineNumbers style={rainbow}>
        {children}
      </SyntaxHighlighter>
    </div>
  );
}
