import {useSearchParams} from "react-router-dom";

const PostPage = (props) => {
    const [postParams, setPostParams] = useSearchParams()

    return (
        <div>
            <p> Look at a post here </p>
            <p> {"id: " + postParams.get('id')}</p>
        </div>
    )
}

export default PostPage;