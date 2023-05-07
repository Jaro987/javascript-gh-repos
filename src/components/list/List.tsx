import { RepoType } from "../../Types";
import { Card } from "../card";
import './styles.css'

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
        return (
            <div className='grid'>
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