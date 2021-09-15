import { useParams } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';
import useFetch from '../hooks/useFetch';
import { useHistory } from 'react-router';
import Word from './Word';

export default function Day() {
  //useparams 훅을 이용해 id와 라우트를 매치
  const { day } = useParams(); //useParams라는 객체에 day라는 키에 대해 URL의 parameter 값을 할당
  const words = useFetch(`http://localhost:3001/words?day=${day}`);
  const history = useHistory();

  function moveDay(arg) {
    if (arg === 'pre') {
      const newDay = Number(day) - 1;
      history.push(`/day/${newDay}`);
    } else {
      const newDay = Number(day) + 1;
      history.push(`/day/${newDay}`);
    }
  }

  return (
    <>
      <div>
        <h2>
          <button
            onClick={() => moveDay('pre')}
            style={{ backgroundColor: 'black' }}>
            ◀
          </button>
          &nbsp; Day {day} &nbsp;
          <button
            onClick={() => moveDay('post')}
            style={{ backgroundColor: 'black' }}>
            ▶
          </button>
        </h2>
      </div>
      {/* true && expression은 expression으로, false && expression은 false*/}
      {words.length === 0 && <span>Loading...</span>}
      <table>
        <tbody>
          {words.map((word) => (
            <Word word={word} key={word.id} />
          ))}
        </tbody>
      </table>
    </>
  );
}
