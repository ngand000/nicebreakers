import './UploadButton.css'
import React from 'react';

// button to go to the proper upload page
export default function UploadButton({uploadType}) {

    return (<a href={"/upload/" + uploadType} className={"uploadButtonFilterStyle"} style={{backgroundColor: "rgb(148, 148, 242)"}}>
        Upload
    </a>)
}