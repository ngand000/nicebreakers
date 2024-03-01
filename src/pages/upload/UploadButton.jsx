import './UploadButton.css'
import React from 'react';
import {useNavigate} from "react-router-dom"
// button to go to the proper upload page
export default function UploadButton({uploadType}) {
    const navigate = useNavigate()
    return (<div className={"uploadButtonFilterStyle"} onClick={() => {navigate(uploadType)}}>
        Upload
    </div>)
}