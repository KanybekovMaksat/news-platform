import { FC } from 'react';
import styles from '../index.module.scss';
import { NewsType } from '../../../types/type';
import NewsCard from '../../../components/NewsCard';
import { useGetAllPostsQuery } from '../../../redux/http/post.api';
import { SkeletonNewsItem } from '../../../components/SkeletonNews';

interface ListPropsInterface {
  selectedCategory: string;
  searchQuery: string;
}
const List: FC<ListPropsInterface> = ({ selectedCategory, searchQuery }) => {
  const { data: news, isLoading, isError } = useGetAllPostsQuery({});

  const render = () => {
    const filteredNews =
      selectedCategory.length === 0
        ? news
        : news &&
          news.filter((item: NewsType) =>
            selectedCategory.includes(item.categoryId)
          );

    return filteredNews
      .filter((item: NewsType) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map((item: NewsType) => <NewsCard data={item} key={item._id} />);
  };

  return (
    <div className={styles.home__list} style={{ width: '850px' }}>
      {news
        ? news.length !== 0
          ? render()
          : 'Постов нет!'
        : [...new Array(4)].map((_, index) => <SkeletonNewsItem key={index} />)}
    </div>
  );
};

export default List;
