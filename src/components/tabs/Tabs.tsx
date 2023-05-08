import { useCallback, useEffect, useState } from "react";
import { PaginationObjType, RepoType, TabsType } from "../../Types";
import { List } from "../list";
import './styles.css';
import { useParams } from "react-router-dom";
import { Pagination } from "../paginaton";

const Tabs = ({ tabsConfig, defaultIndex }: TabsType) => {
    const [selectedIndex, setSelectedIndex] = useState(defaultIndex ?? 0);
    const handleClick = (index: number, topic: string) => {
        setSelectedIndex(index)
        fetchData(topic.toLowerCase(), sortBy, order)
    };


    const [repos, setRepos] = useState<RepoType[]>([]);
    const [pagination, setPagination] = useState<PaginationObjType>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [sortBy, setSortBy] = useState<string>('stars');
    const [order, setOrder] = useState<string>('desc');
    const [page, setPage] = useState<number>(1)

    const createPaginationObj = useCallback((total_count: number, page: number) => {
        const lastPage = Math.ceil(total_count / 30);
        const currentPage = page;
        return { currentPage, lastPage };
    }, []);


    
    const fetchData = useCallback(async(topic: string, sortBy: string, order: string, forPage?: number) => {
        setIsLoading(true)
        let url = `https://api.github.com/search/repositories?q=${topic}&sort=${sortBy}&order=${order}`;
        if (forPage) {
            url += `&page=${forPage}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        setRepos(data.items);
        setPagination(createPaginationObj(data.total_count, forPage ? forPage : page))
        setIsLoading(false)
    }, [createPaginationObj, page])
    
    useEffect(() => {
        fetchData(tabsConfig[selectedIndex].label.toLowerCase(), sortBy, order)
    }, [fetchData, order, selectedIndex, sortBy, tabsConfig]);

    const getDataOnSpecificPage = (page: number) => {
        fetchData(tabsConfig[selectedIndex].label.toLowerCase(), sortBy, order, page)
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
                        {pagination && <Pagination pagination={pagination} callback={(page)=>getDataOnSpecificPage(page)} />}
                    </section>
                ))}
            </div >
        </div>
    );
};

export default Tabs;