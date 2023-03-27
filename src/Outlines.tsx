import {useEffect, useState} from "react";
import request from "./request";

function Outlines() {
	const [content, setContent] = useState('')
    const [outlines, setOutlines] = useState([])

    useEffect(() => {
        request.get('/outlines/').then(response => {
            setOutlines([...response.data['outlines']['ready']])
        })
    }, [])

    const submit = () => {
        request.post('/outlines/', {
            outline: content
        }).then(response => {
            setOutlines([...response.data['outlines']['ready']])
            alert('add success')
        })
    }

    return (
        <div className="App">
            <div>
                <textarea cols="30" rows="10" onChange={event => setContent(event.target.value)}>{content}</textarea>
                <button onClick={submit}>提交</button>
            </div>
            <div>
                {outlines.map(outline => {
                    return <div>
                        {JSON.stringify(outline)}
                    </div>
                })}
            </div>
        </div>
    )
}

export default Outlines
