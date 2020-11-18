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
    <div className="p-3 hidden sm:flex sm:flex-col h-screen">
      <div>Crime Categories</div>
      <div>
        {crimes.categoryList.map(category => (
          <div key={category.url}>
            <label className="text-xs" htmlFor={category.url}>
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
