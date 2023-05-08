import ErrorPage from "../../ErrorPage";
import { RepoType } from "../../Types";
import { Card } from "../card";
import { Loader } from "../loader";
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
            <div className='grid' >
                {repos.map((repo, index) => {
                    return (
                        <Card key={index} repo={repo} />
                    )
                })}
            </div>
        )
    }
    return (
        <div 
        className={'List-wrapper'}>
        {isLoading ? <Loader /> : repos ? <RenderReposList /> : <ErrorPage />}
        </div>
    );
};
export default List;