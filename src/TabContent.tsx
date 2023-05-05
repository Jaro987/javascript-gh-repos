import { useEffect, useState } from "react";

type TabContentType = {
    topic: string;
}

const TabContent = ({ topic }: TabContentType) => {
    const url = `https://api.github.com/search/repositories?q=${topic}&sort=stars&order=desc`;
    const [result, setResult] = useState([]);

    useEffect(() => {
        async function fetchData() {
          const response = (await fetch(url));
          const data = await response.json();
          setResult(data);
        }
        fetchData();
      }, [url]);
    return (
        <div>
            {JSON.stringify(result)}
        </div>
    );
};
export default TabContent;