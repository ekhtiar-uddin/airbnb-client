import { useEffect, useState } from "react";

const useRightOffset = (contentWidth = 1120) => {
  const [rightOffset, setRightOffset] = useState(0);

  useEffect(() => {
    const calculateOffset = () => {
      const screenWidth = window.innerWidth;
      const offset = Math.max(0, (screenWidth - contentWidth) / 2);
      setRightOffset(offset);
    };

    calculateOffset();
    window.addEventListener("resize", calculateOffset);
    return () => window.removeEventListener("resize", calculateOffset);
  }, [contentWidth]);

  return rightOffset;
};

export default useRightOffset;
