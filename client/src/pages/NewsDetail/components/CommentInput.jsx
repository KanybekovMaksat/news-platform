import { useState, FC } from 'react';
import styles from '../index.module.scss';
import { useTypedSelector } from '../../../helpers/hooks/useTypedRedux';
import { selectAuth } from '../../../redux/slices/authSlice';
import { useCreateCommentMutation } from '../../../redux/http/post.api';

const CommentInput = ({ newsId }) => {
    const [createComment, { isLoading }] = useCreateCommentMutation();
    const { id } = useTypedSelector(selectAuth);
    const [comment, setComment] = useState({
        text: '',
        userId: id,
        newsId: newsId,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setComment((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createComment(comment);
    };


    return (
        <div className={styles.comment__input}>
            <form onSubmit={handleSubmit}>
                <input
                    name="text"
                    type="text"
                    value={comment.text}
                    onChange={handleChange}
                    placeholder="Напишите комментарий"
                />
                <input type="submit" value="Ответить" />
            </form>
        </div>
    );
};

export default CommentInput;
