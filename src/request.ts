import axios from "axios";


const request = axios.create({
	baseURL: 'https://123.207.27.133:5001'
	// baseURL: 'http://127.0.0.1:8000'
})


export default request
