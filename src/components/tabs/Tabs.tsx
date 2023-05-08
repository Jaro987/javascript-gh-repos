import { useCallback, useEffect, useState } from "react";
import { RepoType, TabsType } from "../../Types";
import { List } from "../list";
import { Pagination } from "../paginaton";
import { useRepos } from "../../hooks";
import './styles.css';

const Tabs = ({ tabsConfig, defaultIndex }: TabsType) => {

    const { getRepos, isLoading, pagination } = useRepos();

    const [selectedIndex, setSelectedIndex] = useState(defaultIndex ?? 0);
    const handleClick = (index: number) => {
        setSelectedIndex(index)
        fetchData();
    };

    const [repos, setRepos] = useState<RepoType[]>([]);
    const [sortBy, setSortBy] = useState<string>('stars');
    const [order, setOrder] = useState<string>('desc');

    const fetchData = useCallback( async(page?: number) => {
        const repos = await getRepos(tabsConfig[selectedIndex].label.toLowerCase(), sortBy, order, page);
        setRepos(repos);
    }, [selectedIndex, sortBy, order]);

    useEffect( () => {
        fetchData();
      }, [fetchData]);


    const getDataOnSpecificPage = (page: number) => {
        fetchData(page);
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
    };

    return (
        <div className='wrapper'>
            <div role="tablist" aria-orientation="horizontal" className='tablist'>
                {tabsConfig.map((tab, index) => (
                    <button
                        className='tab'
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
                        <Controls />
                        <List repos={repos} isLoading={isLoading} />
                        {pagination &&
                            <Pagination
                                pagination={pagination}
                                callback={(page) => getDataOnSpecificPage(page)}
                            />}
                    </section>
                ))}
            </div >
        </div>
    );
};

export default Tabs;