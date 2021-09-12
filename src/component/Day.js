import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';
import Word from './Word';

export default function Day() {
  //useparams 훅을 이용해 id와 라우트를 매치
  const { day } = useParams();
  const [words, setWords] = useState([]);
  // const wordList = dummy.words.filter((word) => word.day === Number(day));

  useEffect(() => {
    fetch(`http://localhost:3001/words?day=${day}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setWords(data);
      });
  }, [day]);

  return (
    <>
      <h2>Day {day}</h2>
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
