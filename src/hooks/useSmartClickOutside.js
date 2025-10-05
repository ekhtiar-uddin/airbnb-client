import { useEffect, useRef } from "react";

// Reusable outside-click hook that can be shared by dropdowns/modals/popovers
// Options:
// - when: boolean to enable/disable the listener
// - onClose: function to execute when a valid outside empty-area click occurs
// - ignoreSelector: CSS selector string of interactive elements that should NOT trigger close
export default function useSmartClickOutside({
  when = true,
  onClose,
  ignoreSelector = "a,button,input,textarea,select,[role=button],[role=link]",
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!when) return;
    if (!onClose) return;

    const handleDocumentClick = (event) => {
      const target = event.target;

      // If click is inside the container, do nothing
      if (containerRef.current && containerRef.current.contains(target)) {
        return;
      }

      // If click is on an interactive element (outside), allow its action and do not close
      if (
        typeof target.closest === "function" &&
        target.closest(ignoreSelector)
      ) {
        return;
      }

      onClose();
    };

    document.addEventListener("click", handleDocumentClick, true);
    return () =>
      document.removeEventListener("click", handleDocumentClick, true);
  }, [when, onClose, ignoreSelector]);

  return containerRef;
}

