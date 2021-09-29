import logo from './logo.svg';
import './App.css';
import ConnectionCheck from './connectionCheck';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
        <ConnectionCheck />
      </header>
    </div>
  );
}

export default App;
