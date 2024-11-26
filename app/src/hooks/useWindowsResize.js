import { useEffect } from "react";

const useWindowResize = (callback) => {
  useEffect(() => {
    window.addEventListener("resize", callback);

    return () => {
      window.removeEventListener("resize", callback);
    };
  }, [callback]);
};

export default useWindowResize;
