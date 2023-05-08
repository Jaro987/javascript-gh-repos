import { useEffect, useState } from "react";
import { RepoType, TabsType } from "../../Types";
import { List } from "../list";
import './styles.css';


const Tabs = ({ tabsConfig, defaultIndex }: TabsType) => {
    const [selectedIndex, setSelectedIndex] = useState(defaultIndex ?? 0);
    const handleClick = (index: number, topic: string) => {
        setSelectedIndex(index)
        fetchData(topic.toLowerCase(), sortBy, order)
    };


    const [repos, setRepos] = useState<RepoType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [sortBy, setSortBy] = useState<string>('stars');
    const [order, setOrder] = useState<string>('desc');


    useEffect(() => {
        fetchData(tabsConfig[selectedIndex].label.toLowerCase(), sortBy, order)
    }, [order, selectedIndex, sortBy, tabsConfig])

    async function fetchData(topic: string, sortBy: string, order: string) {
        setIsLoading(true)
        const url = `https://api.github.com/search/repositories?q=${topic}&sort=${sortBy}&order=${order}`;
        const response = await fetch(url);
        const data = await response.json();
        setRepos(data.items);
        setIsLoading(false)
    }


    const SortBy = () => {
        return (
            <label htmlFor="sort"> Sort by:
                <select name="sort" id="sort" onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
                    <option value="stars">Stars</option>
                    <option value="forks">Forks</option>
                </select>
            </label>
        )
    }

    const OrderBy = () => {
        return (
            <label htmlFor="order"> Order:
                <select name="order" id="order" onChange={(e) => setOrder(e.target.value)} value={order}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </label>
        )
    }

    const Controls = () => {
        return (
            <div className='controls'>
                <SortBy />
                <OrderBy />
            </div>
        )
    }

    return (
        <div className='wrapper'>
            <div role="tablist" aria-orientation="horizontal" className='tablist'>
                {tabsConfig.map((tab, index) => (
                    <button
                        className='tab'
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
                        <Controls />
                        <List repos={repos} isLoading={isLoading} />
                    </section>
                ))}
            </div >
        </div>
    );
};

export default Tabs;