import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import InMemoryApp from './InMemoryApp';

const initialData = [
    {
        text: "Text John about bank statements",
        isCompleted: false,
    },
    {
        text: "Eat lunch",
        isCompleted: false,
    },
    {
        text: "Call mom",
        isCompleted: true,
    }
];

ReactDOM.render(
  <React.StrictMode>
    {/*<App initialData={initialData}/>*/}
    <InMemoryApp initialData={initialData}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
