type TabContentType = {
    topic: string;
}

const TabContent = ({ topic }: TabContentType) => {
    return (
        <div>
            {topic}
        </div>
    );
};
export default TabContent;