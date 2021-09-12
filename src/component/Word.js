import { useState } from 'react';

export default function Word({ word }) {
  const [isShow, setIsShow] = useState(false);
  const [isDone, setIsDone] = useState(word.isDone);

  function toggleShow() {
    setIsShow(!isShow);
  }

  function toggleDone() {
    setIsDone(!isDone);
  }

  return (
    <tr className={isDone ? 'off' : ''} key={word.id}>
      <td>
        <input type="checkbox" checked={isDone} onChange={toggleDone}></input>
      </td>
      <td>{word.eng}</td>
      <td>{isShow && word.kor}</td>
      <td>
        <button onClick={toggleShow}>뜻 {isShow ? '숨기기' : '보기'}</button>
      </td>
      <td>
        <button className="btn_del">삭제</button>
      </td>
    </tr>
  );
}
