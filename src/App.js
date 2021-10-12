import logo from './logo.svg';
import './App.css';
import TaskList from './TaskList';
import Header from './Header'

function App(props) {
  return (
    <div className="App">
      <Header/>
        <TaskList data={props.data} />
    </div>
  );
}

export default App;
