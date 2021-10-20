import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import InMemoryApp from './InMemoryApp';

const initialData = [
    {
        id: 123,
        text: "Text John about bank statements",
        isCompleted: true,
        priority: 0,
    },
    {
        id: 456,
        text: "Eat lunch",
        isCompleted: false,
        priority: 3,
    },
    {
        id: 789,
        text: "Call mom",
        isCompleted: true,
        priority: 2,
    }
];

ReactDOM.render(
  <React.StrictMode>
    <InMemoryApp initialData={initialData}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
