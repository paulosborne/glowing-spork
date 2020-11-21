import React from 'react';
import { observer } from 'mobx-react';
import { useRootStore } from '../../hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import ClubPicker from '../ClubPicker/ClubPicker';

const Header = observer(() => {
  const { clubs, date, setDate } = useRootStore();

  return (
    <header className="flex flex-col sm:flex-row bg-gray-800 p-3 shadow-sm w-full">
      <div>
        <div className="flex pr-3">
          <div className="mr-3">
            <button onClick={() => clubs.clearSelected()}>
              <FontAwesomeIcon icon={faHome} color="white" />
            </button>
          </div>
          <div className="text-white pr-2">Date:</div>
          <DatePicker
            className="rounded"
            selected={date}
            onChange={date => setDate(date)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
          />
        </div>
      </div>
      <div>
        <div className="flex">
          <div className="text-white pr-2">Club:</div>
          <ClubPicker />
        </div>
      </div>
    </header>
  );
});

export default Header;
