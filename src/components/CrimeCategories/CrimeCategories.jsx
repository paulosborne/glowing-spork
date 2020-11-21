import React from 'react';
import { observer } from 'mobx-react';

import { useRootStore } from '../../hooks';

const CrimeCategories = observer(() => {
  const { crimes } = useRootStore();

  const handleChange = ({ target: { value } }) => {
    const category = crimes.getCategory(value);
    category.toggle();
  };

  return (
    <div className="bg-white sm:flex sm:flex-col">
      <div className="px-2 py-2">Categories</div>
      <div>
        {crimes.categoryList.map(category => (
          <div key={category.url} className="px-2">
            <label className="text-sm" htmlFor={category.url}>
              <input
                type="checkbox"
                id={category.url}
                value={category.url}
                className="mr-2"
                checked={category.selected}
                onChange={handleChange}
              />
              {category.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
});

export default CrimeCategories;
