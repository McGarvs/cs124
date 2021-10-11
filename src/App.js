import logo from './logo.svg';
import './App.css';
import TaskList from './TaskList';

function App(props) {
  return (
    <div className="App">
      <TaskList data={props.data} />
    </div>
  );
}

export default App;
