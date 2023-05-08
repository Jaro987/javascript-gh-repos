import { useEffect, useState } from "react";
import { OwnerType, RepoType } from "../../Types";
import { useParams } from "react-router-dom";
import { Fork, Star, OpenIssues } from "../../icons";
import { AvatarComponent } from "../avatarComponent";
import { Loader } from "../loader";
import { useRepos } from "../../hooks";

import './styles.css';

type RenderRepoDetailsType = {
    repo: RepoType
}

type RenderTextType = {
    text: string
}

const Details = () => {
    const [repo, setRepo] = useState<RepoType>();
    const [languages, setLanguages] = useState<Record<string, number>>({});
    const [contributors, setContributors] = useState<OwnerType[]>();
    const [isLoadingLang, setIsLoadingLang] = useState<boolean>(false);
    const [isLoadingContributors, setIsLoadingContributors] = useState<boolean>(false);
    const { getOwnersRepo, isLoading } = useRepos();

    const { owner, name } = useParams();
    useEffect(() => {
        owner && name && fetchData(owner, name)
    }, [owner, name])

    const fetchData = async (owner: string, name: string) => {
        const data = await getOwnersRepo(owner, name);
        setRepo(data);
    }

    useEffect(() => {
        (async () => {
            setIsLoadingLang(true);
            const langResponse = repo && await fetch(repo.languages_url);
            const languages = langResponse && await langResponse.json();
            setLanguages(languages);
            setIsLoadingLang(false);

            setIsLoadingContributors(true);
            const contributorsResponse = repo && await fetch(repo.contributors_url);
            const contributors = contributorsResponse && await contributorsResponse.json();
            const upToTenContributors = contributors.length > 10 ? contributors.slice(0, 10) : contributors;
            setContributors(upToTenContributors);
            setIsLoadingContributors(false);
        })();
    }, [repo, repo?.id])

    const RenderText = ({ text }: RenderTextType) => {
        return <div>{text}</div>
    }
    const RenderRepoDetails = ({ repo }: RenderRepoDetailsType) => {
        return (
            <div className="repo-details-wrapper">
                <div className="avatar-and-title">
                    <AvatarComponent user={repo.owner} size={100} />
                    <h1>{repo.name}</h1>
                </div>
                <hr />
                <div className="significant-numbers-wrapper">
                    <div className="significant-number">
                        <Fork />
                        {repo.forks_count}</div>
                    <div className="significant-number">
                        <Star />
                        {repo.stargazers_count}
                    </div>
                    <div className="significant-number">
                        <OpenIssues />
                        {repo.open_issues_count}
                    </div>
                </div>
                <hr />
                <div>
                    <h2>Description</h2>
                    <p>{repo.description}</p>
                </div>
                <hr />
                <div>
                    <h2>Languages</h2>
                    {isLoadingLang ? <Loader /> :
                        <ul>{languages && Object.keys(languages).map((language) => <li key={language}>{language} </li>)}</ul>}
                </div>
                <hr />
                <div>
                    <h2>Contributors</h2>
                    <div className='contributors-grid'>
                        {isLoadingContributors ? <Loader /> : contributors?.map((contributor) => {
                            return (
                                <AvatarComponent key={contributor.id} user={contributor} shape="circle" />
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }

    return (
        isLoading ? <Loader /> : repo ? <RenderRepoDetails repo={repo} /> : <RenderText text='error' />
    );
}

export default Details;

