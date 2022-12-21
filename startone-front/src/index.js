import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Router from "./router";

import axios from "axios"

axios.defaults.baseURL = "http://localhost:3000/api"
// axios.defaults.headers.common['Authorization'] = "BEARER TOKEN"
// axios.defaults.headers.post['Content-Type'] = 'application/json'
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

axios.interceptors.request.use(request => {
    return request
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    return response.data
}, error => {
    console.log(error)
    // if (error.response.status === 500)
    //     return (<Error500></Error500>)
    return Promise.reject(error.response)
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
