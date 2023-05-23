import React, { useEffect } from 'react'

function useOnClickOutside(ref, handler) {
  useEffect(() =>{
    
    console.log("ref",ref)

    const listener = (e) =>{
      if(!ref.current || ref.current.contains(e.target)){//모달창이 없거나 
        //모달창이 안닫히는 경우
        console.log("123",e.target);
        return;
      }
      //모달창이 닫히는경우 () =>{setModalOpen(false)}
      handler(e);
    }
    document.addEventListener("mousedown" , listener);
    document.addEventListener("touchstart" , listener);
  },[ref , handler])
}




export default useOnClickOutside;