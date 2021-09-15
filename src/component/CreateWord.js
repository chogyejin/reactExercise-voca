import { useRef } from 'react';
import { useHistory } from 'react-router';
import { useState } from 'react/cjs/react.development';
import useFetch from '../hooks/useFetch';

export default function CreateWord() {
  const days = useFetch('http://localhost:3001/days');
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(e) {
    //form 안에 submit 역할을 하는 버튼을 눌렀어도 새로 실행하지 않도록
    e.preventDefault();

    //isLoading이 true면(로딩 중이면) 실행하지 않고, false일 때 로직 실행
    if (!isLoading) {
      setIsLoading(true);
      fetch(`http://localhost:3001/words/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          day: dayRef.current.value,
          eng: engRef.current.value,
          kor: korRef.current.value,
          isDone: false,
        }),
      }).then((res) => {
        if (res.ok) {
          alert('생성이 완료 되었습니다!');
          history.push(`/day/${dayRef.current.value}`);
          setIsLoading(false);
        }
      });
    }
  }

  const engRef = useRef(null);
  const korRef = useRef(null);
  const dayRef = useRef(null);
  return (
    <form onSubmit={onSubmit}>
      <div className="input_area">
        <label>Eng</label>
        <input type="text" placeholder="computer" ref={engRef} />
      </div>
      <div className="input_area">
        <label>Kor</label>
        <input type="text" placeholder="컴퓨터" ref={korRef} />
      </div>
      <div className="input_area">
        <label>Day</label>
        <select ref={dayRef}>
          {days.map((day) => (
            <option key={day.id} value={day.day}>
              {day.day}
            </option>
          ))}
        </select>
      </div>
      <button
        style={{
          opacity: isLoading ? 0.3 : 1,
        }}>
        {isLoading ? '저장 중..' : '저장'}
      </button>
    </form>
  );
}
