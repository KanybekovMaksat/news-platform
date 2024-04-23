import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import axios from 'axios';
import { NewsType } from '../../types/type';
import styles from './index.module.scss';
import CommentInput from './components/CommentInput';
import CommentView from './components/CommentView';
import { useGetCommentsQuery } from '../../redux/http/post.api';

function NewsDetail() {
  const [data, setData] = useState<NewsType | null>(null);
  const params = useParams<{ id: string }>();
  const id = params.id;

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:5000/api/news/${id}`);
    setData(response.data);
  };

  const { data: comment } = useGetCommentsQuery(id);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <div className={styles.newsdetail__content}>
          <h1 className={styles.newsdetail__title}>{data?.title}</h1>
          <p className={styles.newsdetail__description}>{data?.description}</p>
          <img
            src={data?.photo}
            alt={data?.title}
            className={styles.newsdetail__img}
          />
          <p className={styles.newsdetail__text}>{data?.text}</p>
          <div className={styles.comment__content}>
            <h3 className={styles.comment__content_title}>Комментарии</h3>
            {comment &&
              comment.map((item: any) => (
                <CommentView
                  text={item.text}
                  created={item.created}
                  userId={item.userId}
                  key={item.id}
                />
              ))}
            <CommentInput newsId={id} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default NewsDetail;
