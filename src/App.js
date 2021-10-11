import logo from './logo.svg';
import './App.css';
import Task from './Task';

function App() {
  return (
    <div className="App">
      <Task text={"hello there"} isCompleted={false} />
    </div>
  );
}

export default App;
