import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Filter from './components/Filter';
import List from './components/List';
import styles from './index.module.scss';
import { useState } from 'react';

function Home() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <Header onSearch={handleSearch} />
      <div className={styles.home__content}>
        <Filter setSelectedCategory={setSelectedCategory} />
        <List searchQuery={searchQuery} selectedCategory={selectedCategory} />
      </div>
      <Footer />
    </>
  );
}

export default Home;
