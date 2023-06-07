import './App.css';
import Password from './components/password';

function App() {
  return (
    <div className="App">
      <div className="form">
        <h1>Password Generator</h1>
        <p>
          Create strong and secure passwords to keep your account safe online.
        </p>
        <Password />
      </div>
    </div>
  );
}

export default App;
