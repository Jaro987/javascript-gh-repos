import { useState } from "react";
import { RepoType, TabsType } from "../../Types";
import { List } from "../list";



const Tabs = ({ tabsConfig, defaultIndex }: TabsType)=> {
    const [selectedIndex, setSelectedIndex] = useState(defaultIndex ?? 0);
    const handleClick = (index: number, topic: string) => {
        
        setSelectedIndex(index)
        fetchData(topic.toLowerCase())};


    const [repos, setRepos] = useState<RepoType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // useEffect(()=>{
    //     fetchData(tabsConfig[defaultIndex].label.toLowerCase())
    // }, [defaultIndex, tabsConfig])

    async function fetchData(topic: string) {
        setIsLoading(true)
        const url = `https://api.github.com/search/repositories?q=${topic}&sort=stars&order=desc`;
        const response = await fetch(url);
        const data = await response.json();
        setRepos(data.items);
        setIsLoading(false)
    }



    return (
        <>
            <div role="tablist" aria-orientation="horizontal">
                {tabsConfig.map((tab, index) => (
                    <button
                        key={`tab-${index}`}
                        onFocus={() => setSelectedIndex(index)}
                        tabIndex={selectedIndex === index ? 0 : -1}
                        onClick={() => handleClick(index, tab.label)}
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
                        <List repos={repos} isLoading={isLoading} />
                    </section>
                ))}
            </div>
        </>
    );
};

export default Tabs;