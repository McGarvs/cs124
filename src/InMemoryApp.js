import App from './App';

function InMemoryApp(props) {
    return <App data={props.initialData}/>
}

export default InMemoryApp;