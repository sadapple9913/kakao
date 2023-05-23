import React, { useEffect, useState } from 'react'

function useDebounce(value,delay) {
  const[debounceValue , setDebounceValue] = useState(value);


  //글자입력후 지정시간만큼 기다렸다 실행 오토배너느낌 불필요한 로딩방지
  useEffect(() =>{
    const handler = setTimeout(() =>{
      setDebounceValue(value);
    },delay);

    return () => {
      clearTimeout(handler);
    }
  
  },[value , delay]);

  return debounceValue;

}


export default useDebounce