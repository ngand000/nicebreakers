import './UploadButton.css'
import React from 'react';

// button to go to the proper upload page
export default function UploadButton({uploadType}) {

    return (<a href={uploadType} className={"uploadButtonFilterStyle"}>
        Upload
    </a>)
}