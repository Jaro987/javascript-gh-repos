import { RepoType } from "../../Types";
import { Card } from "../card";

type ListType = {
    repos: RepoType[];
    isLoading: boolean;
}

const List = ({ repos, isLoading }: ListType) => {

    type RenderTextType = {
        text: string
    }
    const RenderText = ({ text }: RenderTextType) => {
        return <div>{text}</div>
    }

    const RenderReposList = () => {
        return (<div style={{ display: 'flex', flexDirection: 'column' }}>
            {repos.map((repo) => {
                return (
                    <Card repo={repo} />
                )
            })}
        </div>
        )
    }
    return (
        isLoading ? <RenderText text='loading' /> : repos ? <RenderReposList /> : <RenderText text='error' />
    );
};
export default List;