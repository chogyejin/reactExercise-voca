import { useEffect, useState } from 'react';

export default function useFetch(url) {
  const [data, setData] = useState([]);

  //useEffect 첫번째 인자 함수, 두번재 배열(의존성 배열, 최초 한 번은 빈 배열로)
  //fetch 비동기통신
  //json-server --watch ./src/db/data.json --port 3001 (간단한 data 테스트용)
  useEffect(() => {
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      });
  }, [url]);
  return data;
}
