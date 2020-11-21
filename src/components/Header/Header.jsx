import React from 'react';
import { observer } from 'mobx-react';
import { useRootStore } from '../../hooks';

import DatePicker from 'react-datepicker';

const Header = observer(() => {
  const { date, setDate } = useRootStore();

  const CurrentDate = ({ value, onClick }) => (
    <div className="leading-tight text-right">
      <div className="text-white font-medium text-xl">{value}</div>
      <div
        className="underline text-sm cursor-pointer text-blue-500"
        onClick={onClick}>
        Change Year
      </div>
    </div>
  );

  return (
    <div>
      <header className="flex flex-col sm:flex-row items-center bg-gray-800 p-3 shadow w-full">
        <div className="flex-1 text-xl text-white font-medium">
          Premier League Crime Visualiser
        </div>
        <div>
          <DatePicker
            className="rounded"
            selected={date}
            onChange={date => setDate(date)}
            dateFormat="yyyy"
            showYearPicker
            customInput={<CurrentDate />}
            withPortal
          />
        </div>
      </header>
    </div>
  );
});

export default Header;
