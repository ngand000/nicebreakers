import {StorageImage} from "@aws-amplify/ui-react-storage";

export default function ImageWithCaption({id, imageNum, caption, imgType}) {

    return (
        <div>
            <StorageImage style={{width: "25vmin", height: "25vmin", margin: "2vh 2vw 2vh 2vw"}} imgKey={id + "img" + imageNum + "." + imgType} accessLevel={'guest'} alt={"image" + imageNum} onStorageGetError={(error) => console.error(error)}/>
            <p>{caption}</p>
        </div>
    )
}