import './App.css';
import TaskList from './TaskList';
import Header from './Header'
import {useState} from 'react'

function App(props) {
    const [showCompleted, setShowCompleted] = useState(false);
    function toggleShowCompleted(item){
        setShowCompleted(!showCompleted)
        console.log("Toggled showing Completed vs Uncompleted")
    }
    return (
        <div className="App">
            <Header onShowBtnClick={toggleShowCompleted} showCompleted={showCompleted} onDelCompletedClick={props.deleteCompleted}/>
            {/*TODO: Pass showCompleted to TaskList and use filter to only display Completed Tasks*/}
            <TaskList data={props.data} />
        </div>
    );
}

export default App;
