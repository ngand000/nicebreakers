import './UploadButton.css'

// button to go to the upload page
export default function UploadButton() {

    return (<a href="/upload" className={"uploadButtonFilterStyle"} style={{backgroundColor: "rgb(148, 148, 242)"}}>
        Upload
    </a>)
}