import { useState, useEffect, useRef } from 'react';
import style from './DateAndTimePickers.module.scss';

export default function DateAndTimePickers({
  isChallenge,
  time,
  getDate,
  cb,
  isEdit,
}) {
  console.log(
    '🚀 ~ file: DateAndTimePickers.jsx ~ line 11 ~ isChallenge',
    isChallenge,
  );
  const [selectedDate, setSelectedDate] = useState('');

  const inputEl = useRef(null);

  useEffect(() => {
    if (isEdit) setSelectedDate(time);
  }, [isEdit, time]);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Enter') {
        inputEl.current.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEdit]);

  const handleDateChange = date => {
    setSelectedDate(date.target.value);
  };

  return (
    <div className={style.DateAndTimePickers__form}>
      <input
        ref={inputEl}
        // isChallenge
        className={
          selectedDate && isChallenge
            ? `${style.DateAndTimePickers__input}  ${style.active}   ${style.isChallenge} `
            : style.DateAndTimePickers__input
        }
        type="datetime-local"
        name="dateCreate"
        required
        step="0"
        min="2021-06-01T08:00"
        max="2022-06-30T21:00"
        value={isEdit ? selectedDate : time}
        onChange={handleDateChange}
        onBlur={() => {
          getDate('time', selectedDate, cb);
        }}
      />
    </div>
  );
}
