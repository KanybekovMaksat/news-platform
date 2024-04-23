import TrashImg from "../../../assets/images/trash.svg";
import {FC} from "react";
import styles from "../index.module.scss"
import {useDeletePostMutation} from "../../../redux/http/post.api";
interface RemoveNewsProps {
    id: string;
}

const RemoveNews:FC<RemoveNewsProps> = ({ id }) => {

    let [deletePost] = useDeletePostMutation()
    return (
    <button className={styles.card__remove} onClick={() => deletePost(id)}>
        <img src={TrashImg} alt="delete"/>
    </button>
    )};

export default RemoveNews;