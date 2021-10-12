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
            <Header onShowBtnClick={toggleShowCompleted} showCompleted={showCompleted}/>
            <TaskList data={props.data} />
        </div>
    );
}

export default App;
