import { useState } from 'react';

export default function Word({ word: w }) {
  const [word, setWord] = useState(w);
  const [isShow, setIsShow] = useState(false);
  const [isDone, setIsDone] = useState(word.isDone);

  function toggleShow() {
    setIsShow(!isShow);
  }

  function toggleDone() {
    //fetch 첫번째 인자 주소, 두번째 인자 {method, headers, body}
    //setIsDone(!isDone);
    fetch(`http://localhost:3001/words/${word.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...word,
        isDone: !isDone,
      }),
    }).then((res) => {
      if (res.ok) {
        setIsDone(!isDone);
      }
    });
  }

  function del() {
    if (window.confirm('삭제하시겠습니까?')) {
      fetch(`http://localhost:3001/words/${word.id}`, {
        method: 'DELETE',
      })
        //state 값이 변화하여 다시 렌더링
        .then((res) => {
          if (res.ok) {
            setWord({ id: 0 });
            console.log(res);
          }
        });
    }
  }

  //id가 0이면 렌더링 하지 않음
  if (word.id === 0) {
    return null;
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
        <button className="btn_del" onClick={del}>
          삭제
        </button>
      </td>
    </tr>
  );
}

//Create : POST
//Read : GET
//Update : PUT
//Delete : DELETE
