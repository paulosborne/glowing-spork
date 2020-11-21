import React from 'react';
import { observer } from 'mobx-react';
import { useRootStore } from '../../hooks';
import { format, parse, getMonth } from 'date-fns';

const MonthNavigator = observer(() => {
  const { date, setDate } = useRootStore();
  const months = Array(12)
    .fill(0)
    .map((_, i) =>
      parse(`${date.getFullYear()}-${i + 1}`, 'yyyy-L', new Date()),
    );

  return (
    <div className="w-full border-b border-b-400">
      <div className="flex w-full justify-evenly divide-x divide-gray-400">
        {months.map(d => (
          <div
            key={format(d, 'MM')}
            onClick={() => setDate(d)}
            className={`${
              getMonth(date) === getMonth(d)
                ? 'bg-gradient-to-b   from-blue-600 via-blue-700 to-blue-700 text-white font-medium'
                : 'bg-gradient-to-b  from-gray-200 via-gray-300 to-gray-400 text-black'
            } flex-grow-1 flex-1 cursor-pointer  text-center py-2`}>
            <div className="hidden sm:block">{format(d, 'MMM')}</div>
            <div className="sm:hidden">{format(d, 'LLLLL')}</div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default MonthNavigator;
