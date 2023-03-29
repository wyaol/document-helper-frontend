import {useEffect, useState} from 'react'
import request from "./request";
import './App.css'
import DocumentAdd from "./views/DocumentAdd";

function App() {
    return (
        <div className="App">
            <DocumentAdd/>
        </div>
    )
}

export default App
