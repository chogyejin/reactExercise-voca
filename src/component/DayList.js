import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';

export default function DayList() {
  const [days, setDays] = useState([]);
  const [count, setCount] = useState(0);

  //useEffect 첫번째 인자 함수, 두번재 배열(의존성 배열, 최초 한 번은 빈 배열로)
  useEffect(() => {
    console.log('change');
  });

  function onClick() {
    setCount(count + 1);
  }
  return (
    <>
      <ul className="list_day">
        {days.map((day) => (
          <li key={day.id}>
            <Link to={`/day/${day.day}`}>Day {day.day}</Link>
          </li>
        ))}
      </ul>
      <button onClick={onClick}>{count}</button>
    </>
  );
}
