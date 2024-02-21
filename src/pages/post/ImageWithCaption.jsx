import {StorageImage} from "@aws-amplify/ui-react-storage";

export default function ImageWithCaption({id, imageNum, caption}) {

    return (
        <div>
            <StorageImage imgKey={id + "img" + imageNum + ".png"} accessLevel={'guest'} alt={"image" + imageNum} onStorageGetError={(error) => console.error(error)}/>
            <p>{caption}</p>
        </div>
    )
}