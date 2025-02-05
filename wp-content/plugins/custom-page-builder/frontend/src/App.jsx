import { useState, memo } from "react";
import viteLogo from "/vite.svg";
import "./App.css";

const Logo = memo(({ href, src, alt }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    <img src={src} className="logo" alt={alt} />
  </a>
));

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <header className="header">
        <Logo href="https://vitejs.dev" src={viteLogo} alt="Vite Logo" />
        <<Logo href="https://react.dev" src={reactLogo} alt="React Logo" />        />
      </header>

      <main>
        <h1>🚀 Vite + React 🚀</h1>
        <div className="card">
          <button
            onClick={() => setCount((c) => c + 1)}
            aria-label="Increase count"
          >
            Count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR.
          </p>
        </div>
      </main>

      <footer>
        <p className="read-the-docs">Click on the Vite and React logos to learn more.</p>
      </footer>
    </>
  );
}

export default App;