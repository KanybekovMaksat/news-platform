import React, {useState, useEffect} from 'react'
import Modal from "../../../components/Modal"
import {useCreatePostMutation, useGetAuthorPostsQuery,} from "../../../redux/http/post.api";
import { useTypedSelector} from "../../../helpers/hooks/useTypedRedux";
import {selectAuth} from "../../../redux/slices/authSlice";
import styles from "../index.module.scss";
import CloseImg from "../../../assets/images/close.svg";
import NewsCard from "../../../components/NewsCard";
import {SkeletonNewsItem} from "../../../components/SkeletonNews";

const List = () => {
    const {id} = useTypedSelector(selectAuth);
    const [modalActive, setModalActive] = useState(false)
    const [createNews, { isLoading: isCreateNewsLoading }] = useCreatePostMutation();
    const {data: news, isLoading: isLoadingPosts, isError } = useGetAuthorPostsQuery(id)

    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        photo: "",
        title: "",
        description: "",
        text: "",
        categoryId:"",
        userId:id,
    });
    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/category'); // Replace with the actual API endpoint
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createNews(formData).unwrap();
        setModalActive(false);

    };


    return (
        <div>
            <div className={styles.personal__block}>
                    <h3 className={styles.personal__title}>Мои публикации</h3>
                    <button onClick={() => setModalActive(true)}>Новая публикация</button>
            </div>

            <Modal active={modalActive} setActive={setModalActive}>
                <button onClick={() => setModalActive(false)} className = {styles.post__close}><img src={CloseImg} alt="X"/></button>
                <form className={styles.post__form} onSubmit={handleSubmit}>
                    <div className={styles.post__box}>
                        <label htmlFor="photo" className={styles.post__label}>
                            Обложка новости
                        </label>
                        <input
                            type="text"
                            className="post__input"
                            id="photo"
                            name="photo"
                            value={formData.photo}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.post__box}>
                        <label htmlFor="title" className={styles.post__label}>
                            Заголовок
                        </label>
                        <input
                            type="text"
                            className="post__input"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.post__box}>
                        <label htmlFor="description" className={styles.post__label}>
                            Краткое описание
                        </label>
                        <input
                            type="text"
                            className="post__input"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.post__box}>
                        <label htmlFor="text" className={styles.post__label}>
                            Текст новости
                        </label>
                        <textarea
                            id="text"
                            name="text"
                            cols="30"
                            rows="10"
                            value={formData.text}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className={styles.post__box}>
                        <label htmlFor="category" className={styles.post__label}>
                            Выбрать категорию
                        </label>
                        <select
                            id="categoryId"
                            name="categoryId"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option disabled selected>Не выбрано</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className={styles.post__btn} type="submit">Создать</button>
                </form>

            </Modal>

            {news ? (
                news.map((post) => (
                    <NewsCard data={post} btn={true} key={post.id} />
                ))
            ) : (
                [...new Array(4)].map((_, index) => (
                    <SkeletonNewsItem key={index} />
                ))
            )}

        </div>

    )
}
export default List
