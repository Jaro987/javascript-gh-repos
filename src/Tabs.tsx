import { useState } from "react";
import { TabsType } from "./Types";
import TabContent from "./TabContent";



const Tabs = ({ tabsConfig, defaultIndex }: TabsType) => {
    const [selectedIndex, setSelectedIndex] = useState(defaultIndex ?? 0);
    const handleClick = (index: number) => setSelectedIndex(index);

    return (
        <>
            <div role="tablist" aria-orientation="horizontal">
                {tabsConfig.map((tab, index) => (
                    <button
                        key={`tab-${index}`}
                        onFocus={() => setSelectedIndex(index)}
                        tabIndex={selectedIndex === index ? 0 : -1}
                        onClick={() => handleClick(index)}
                        role="tab"
                        aria-controls={`panel-id-${index}`}
                        aria-selected={selectedIndex === index}
                        id={`tab-id-${index}`}>
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div >
            <div className="tabpanel-wrapper">
                {tabsConfig.map((tab, index) => (
                    <section
                        key={`tabpanel-${index}`}
                        hidden={selectedIndex !== index}
                        role="tabpanel"
                        aria-labelledby={`tab-id${index}`}
                        id={`panel-id-${index}`}>
                        <TabContent topic={tab.label.toLowerCase()} />
                    </section>
                ))}
            </div>
        </>
    );
};

export default Tabs;