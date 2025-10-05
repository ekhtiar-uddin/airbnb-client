// src/hooks/useSearchTabs.js
import useSmartClickOutside from "@/hooks/useSmartClickOutside";
import { useEffect, useRef, useState } from "react";
// adjust path if needed

export default function useSearchTabs(initial = "where") {
  const tabOrder = ["where", "checkin", "checkout", "who"];

  const [activeTab, setActiveTab] = useState(initial);
  const [hoverTab, setHoverTab] = useState("");
  const [openTab, setOpenTab] = useState(null); // 'where' | 'checkin' | 'checkout' | 'who' | null

  // Derived booleans (compatibility with prior markup)
  const open = openTab === "where";
  const openCheckIn = openTab === "checkin";
  const openCheckOut = openTab === "checkout";
  const openWho = openTab === "who";

  // Sticky/compact/expand state
  const [scrollY, setScrollY] = useState(0);
  const [stickyExpand, setStickyExpand] = useState(false);
  const [stickyTab, setStickyTab] = useState("where");

  // Indicator for main search
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  // Click-outside for sticky expanded
  const expandRef = useRef(null);

  // button refs array for indicator (we use simple objects with .current so they work with ref={...})
  const btnRefs = useRef(tabOrder.map(() => ({ current: null })));
  // convenience named refs
  const whereBtnRef = btnRefs.current[0];
  const checkinBtnRef = btnRefs.current[1];
  const checkoutBtnRef = btnRefs.current[2];
  const whoBtnRef = btnRefs.current[3];

  // containerRef also handles smart click outside for all main search tabs
  const containerRef = useSmartClickOutside({
    when: !!openTab,
    onClose: () => setOpenTab(null),
  });

  // indicator update (measures DOM elements)
  useEffect(() => {
    function updateIndicator() {
      const idx = tabOrder.indexOf(activeTab);
      const leftBtn = btnRefs.current[idx]?.current;
      const rightBtn = btnRefs.current[idx]?.current;
      const container = containerRef?.current;
      if (leftBtn && rightBtn && container) {
        const cRect = container.getBoundingClientRect();
        const lRect = leftBtn.getBoundingClientRect();
        const rRect = rightBtn.getBoundingClientRect();
        setIndicator({
          left: lRect.left - cRect.left,
          width: rRect.right - lRect.left,
        });
      }
    }

    updateIndicator();
    const anyOpen = open || openCheckIn || openCheckOut || openWho;
    if (!anyOpen) return;
    window.addEventListener("resize", updateIndicator);
    window.addEventListener("scroll", updateIndicator, true);
    return () => {
      window.removeEventListener("resize", updateIndicator);
      window.removeEventListener("scroll", updateIndicator, true);
    };
    // eslint-disable-next-line
  }, [activeTab, hoverTab, openTab, open, openCheckIn, openCheckOut, openWho]);

  // scroll handler for compact/sticky switch
  // +++++++from here
  // useEffect(() => {
  //   const onScroll = () => {
  //     setScrollY(window.scrollY);
  //     if (window.scrollY <= 30 && stickyExpand) setStickyExpand(false);
  //   };
  //   window.addEventListener("scroll", onScroll);
  //   return () => window.removeEventListener("scroll", onScroll);
  // }, [stickyExpand]);

  // // click outside sticky expanded
  // useEffect(() => {
  //   if (!stickyExpand) return;
  //   const onClick = (e) => {
  //     if (expandRef.current && !expandRef.current.contains(e.target)) {
  //       setStickyExpand(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", onClick);
  //   return () => document.removeEventListener("mousedown", onClick);
  // }, [stickyExpand]);
  // +++++++to here

  useEffect(() => {
    const handleScroll = () => setScrollY(document.documentElement.scrollTop);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // handlers
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setOpenTab(tab);
  };
  const handleStickyTabClick = (tab) => setStickyTab(tab);

  return {
    // state & derived
    activeTab,
    hoverTab,
    setHoverTab,
    open,
    openCheckIn,
    openCheckOut,
    openWho,
    openTab,
    setOpenTab,
    scrollY,
    stickyExpand,
    setStickyExpand,
    stickyTab,
    setStickyTab,
    indicator,
    // refs
    expandRef,
    containerRef,
    btnRefs,
    whereBtnRef,
    checkinBtnRef,
    checkoutBtnRef,
    whoBtnRef,
    // handlers
    handleTabClick,
    handleStickyTabClick,
    setActiveTab,
  };
}
