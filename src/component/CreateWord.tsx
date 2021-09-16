import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import useFetch from '../hooks/useFetch';
import { IDay } from './DayList';

export default function CreateWord() {
  const days: IDay[] = useFetch('http://localhost:3001/days');
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  //제네릭 사용하여 Ref 타입 명시, 여기선 input, select 태그임
  //current 속성은 값을 변경해도 상태를 변경할 때 처럼 React 컴포넌트가 다시 렌더링되지 않는다
  const engRef = useRef<HTMLInputElement>(null);
  const korRef = useRef<HTMLInputElement>(null);
  const dayRef = useRef<HTMLSelectElement>(null);

  function onSubmit(e: React.FormEvent) {
    //form 안에 submit 역할을 하는 버튼을 눌렀어도 새로 실행하지 않도록
    e.preventDefault();

    //isLoading이 true면(로딩 중이면) 실행하지 않고, false일 때 로직 실행

    if (!isLoading && dayRef.current && engRef.current && korRef.current) {
      const day = dayRef.current.value;
      const eng = engRef.current.value;
      const kor = korRef.current.value;
      setIsLoading(true);
      fetch(`http://localhost:3001/words`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          day,
          eng,
          kor,
          isDone: false,
        }),
      }).then((res) => {
        if (res.ok) {
          alert('생성이 완료 되었습니다!');
          history.push(`/day/${day}`);
          setIsLoading(false);
        }
      });
    }
  }

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
