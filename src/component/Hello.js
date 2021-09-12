import { useState } from 'react';
import UserName from './UserName';

export default function Hello({ age }) {
  const [name, setName] = useState('mike');
  const msg = age > 19 ? '성인입니다' : '미성년자입니다';

  function changeName() {
    const newName = name === 'mike' ? 'jane' : 'mike';
    console.log(name);
    setName(newName);
  }
  return (
    <div>
      <h1>state</h1>
      <h2>
        {name}({age}) : {msg}
      </h2>
      {/* namename이 전달하는 props, name은 Hello.js의 state */}
      <UserName namename={name} />
      <button onClick={changeName}>버튼</button>
    </div>
  );
}
