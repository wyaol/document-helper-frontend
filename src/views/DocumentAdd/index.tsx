import {useEffect, useState} from "react";
import request from "../../request";
import './index.css'

export default function DocumentAdd() {
	const [outlines, setOutlines] = useState()
	const [selectedFiles, setSelectedFiles] = useState([]);

	useEffect(() => {
		request.get('/outlines/').then(response => {
			setOutlines(response.data['outlines'])
		})
	}, [])

	const submit = () => {
		const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('outlines', selectedFiles[i]);
    }

		request.post('/outlines/', formData).then(response => {
			setOutlines(response.data['outlines'])
			alert('add success')
		})
	}

	const deleteAll = () => {
		request.delete('/outlines/').then(response => {
			setOutlines(response.data['outlines'])
			alert('delete success')
		})
	}

	const revert = (documentId) => {
		request.post('/outlines/revert/' + documentId).then(response => {
			setOutlines(response.data['outlines'])
		})
	}

  const handleFileSelect = (event) => {
    setSelectedFiles(event.target.files);
  };

	const renderDocumentArea = (areaName, outlines) => (
		<>
			<h1>{areaName}</h1>
			<div className="document-area">
				{outlines?.map((outline, index) => (
					<div className="document-and-button" key={index}>
						<textarea name="" id="" cols="30" rows="10" disabled={true}>
							{JSON.stringify(outline)}
						</textarea>
						<button onClick={() => revert(outline.id)}>回滚到等待开始的</button>
					</div>
				))}
			</div>
		</>
	)

	const renderDocumentAreaWithOutButton = (areaName, outlines) => (
		<>
			<h1>{areaName}</h1>
			<div className="document-area">
				{outlines?.map((outline, index) => (
					<div className="document-and-button" key={index}>
						<textarea name="" id="" cols="30" rows="10" disabled={true}>
							{JSON.stringify(outline)}
						</textarea>
					</div>
				))}
			</div>
		</>
	)


	return (
		<>
			<div className="container">
				<div className="form">
					<input type="file" multiple onChange={handleFileSelect}/>
					<button onClick={submit}>提交</button>
					<button onClick={deleteAll}>删除全部</button>
				</div>
				<div>
					<div>
						{renderDocumentAreaWithOutButton('等待开始的', outlines?.ready)}
					</div>
					<div>
						{renderDocumentArea('进行中的', outlines?.progressing)}
					</div>
					<div>
						{renderDocumentArea('已结束的', outlines?.done)}
					</div>
				</div>
			</div>
		</>
	)
}
