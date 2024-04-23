import { useGetCategoryQuery } from '../../../redux/http/post.api';
import styles from '../index.module.scss';
import { useState } from 'react';

const Filter = ({ setSelectedCategory }: any) => {
  const { data: categories } = useGetCategoryQuery({});

  const [selectedCheckbox, setSelectedCheckbox] = useState<string[]>([]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCheckbox((prevSelectedCheckbox) => {
      if (prevSelectedCheckbox.includes(categoryId)) {
        return prevSelectedCheckbox.filter((id) => id !== categoryId);
      } else {
        return [...prevSelectedCheckbox, categoryId];
      }
    });
  };

  const handleApplyFilter = () => {
    if (selectedCheckbox.length === 0) {
      setSelectedCategory([]);
    } else {
      setSelectedCategory(selectedCheckbox);
    }
  };

  return (
    <div className={styles.home__filter}>
      <p className={styles.home__filter_title}>Фильтрация</p>
      {categories &&
        categories.map(
          (
            category: any 
          ) => (
            <div className={styles.home__filter_box} key={category.id}> {/* Установите ключ здесь */}
              <div>
                <input
                  type="checkbox"
                  id={category.id}
                  onChange={() => handleCategoryChange(category.id)}
                  checked={selectedCheckbox.includes(category.id)}
                />
                <label htmlFor={category.id}>{category.name}</label>
              </div>
            </div>
          )
        )}

      <button className={styles.home__filter_btn} onClick={handleApplyFilter}>
        Применить
      </button>
    </div>
  );
};

export default Filter;
