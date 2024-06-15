import { useEffect } from "react";

const useOutSideClick = (ref, cb, notElemId) => {
  useEffect(() => {
    function handlerClick(e) {
      if (ref.current && !ref.current.contains(e.target) && e.target.id != notElemId) {
        cb();
      }
    }
    document.addEventListener("mousedown", handlerClick);
    return () => document.removeEventListener("mousedown", handlerClick);
  }, [ref, cb]);
};
export default useOutSideClick;
