import { useEffect, useRef, useState } from "react";

export default function TabComponent() {
  const [activeTab, setActiveTab] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const tabsRef = useRef([]);
  const containerRef = useRef(null);

  const tabs = [
    { id: "panel-1", label: "First Tab" },
    { id: "panel-2", label: "Second Tab" },
    { id: "panel-3", label: "Third Tab" },
  ];

  const panels = [
    {
      title: "First tab panel",
      content:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas dolores voluptate temporibus, atque ab eos, delectus at ad hic voluptatem veritatis iure, nulla voluptates quod nobis doloremque eaque! Perferendis, soluta.",
    },
    {
      title: "Second tab panel",
      content:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas dolores voluptate temporibus, atque ab eos, delectus at ad hic voluptatem veritatis iure, nulla voluptates quod nobis doloremque eaque! Perferendis, soluta.",
    },
    {
      title: "Third tab panel",
      content:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas dolores voluptate temporibus, atque ab eos, delectus at ad hic voluptatem veritatis iure, nulla voluptates quod nobis doloremque eaque! Perferendis, soluta.",
    },
  ];

  useEffect(() => {
    updateIndicator(activeTab);
  }, [activeTab]);

  const updateIndicator = (index) => {
    if (tabsRef.current[index] && containerRef.current) {
      const tab = tabsRef.current[index];
      const container = containerRef.current;
      const width = tab.getBoundingClientRect().width;
      const left =
        tab.getBoundingClientRect().left -
        container.getBoundingClientRect().left;
      setIndicatorStyle({ width, left });
    }
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="min-h-screen flex items-center bg-gradient-to-br from-purple-200 to-indigo-400">
      <div className="max-w-3xl mx-auto px-8 sm:px-0 w-full">
        <div className="sm:w-7/12 sm:mx-auto">
          <div
            role="tablist"
            aria-label="tabs"
            ref={containerRef}
            className="relative w-max mx-auto h-12 grid grid-cols-3 items-center px-[3px] rounded-full bg-gray-900/20 overflow-hidden shadow-2xl shadow-900/20 transition"
          >
            <div
              className="absolute indicator h-11 my-auto top-0 bottom-0 rounded-full bg-white shadow-md transition-all duration-300"
              style={{
                width: `${indicatorStyle.width}px`,
                left: `${indicatorStyle.left}px`,
              }}
            />
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                ref={(el) => (tabsRef.current[index] = el)}
                role="tab"
                aria-selected={activeTab === index}
                aria-controls={tab.id}
                id={`tab-${index + 1}`}
                tabIndex={activeTab === index ? 0 : -1}
                onClick={() => handleTabClick(index)}
                className="relative block h-10 px-6 tab rounded-full"
              >
                <span className="text-gray-800">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 relative rounded-3xl bg-purple-50">
            {panels.map((panel, index) => (
              <div
                key={tabs[index].id}
                role="tabpanel"
                id={tabs[index].id}
                className={`tab-panel p-6 transition duration-300 ${
                  activeTab === index
                    ? "relative visible opacity-100"
                    : "absolute top-0 invisible opacity-0"
                }`}
              >
                <h2 className="text-xl font-semibold text-gray-800">
                  {panel.title}
                </h2>
                <p className="mt-4 text-gray-600">{panel.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
