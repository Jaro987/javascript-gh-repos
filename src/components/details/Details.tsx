import { useEffect, useState } from "react";
import { OwnerType, RepoType } from "../../Types";
import { useParams } from "react-router-dom";
import { Fork, Star, OpenIssues } from "../../icons";
import { AvatarComponent } from "../avatarComponent";

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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadingLang, setIsLoadingLang] = useState<boolean>(false);
    const [isLoadingContributors, setIsLoadingContributors] = useState<boolean>(false);

    const { owner, name } = useParams();
    useEffect(() => {
        owner && name && fetchData(owner, name)
    }, [owner, name])

    async function fetchData(owner: string, name: string) {
        setIsLoading(true)
        const url = `https://api.github.com/repos/${owner}/${name}`;
        const response = await fetch(url);
        const data = await response.json();
        setRepo(data);
        setIsLoading(false)
    }

    async function getLanguages(languagesUrl: string) {
        setIsLoadingLang(true)
        const response = await fetch(languagesUrl);
        const data = await response.json();
        setLanguages(data)
        setIsLoadingLang(false)
        return data;
    }

    useEffect(() => {
        repo && getLanguages(repo.languages_url);
    }, [repo, repo?.id])

    async function getContributors(contributorsUrl: string) {
        setIsLoadingLang(true)
        const response = await fetch(contributorsUrl);
        const data = await response.json();
        const upToTenContributors = data.length > 10 ? data.slice(0, 10) : data;
        setContributors(upToTenContributors);
        setIsLoadingContributors(false)
        return data;
    }

    useEffect(() => {
        repo && getContributors(repo.contributors_url);
    }, [repo, repo?.id])

    const RenderText = ({ text }: RenderTextType) => {
        return <div>{text}</div>
    }
    const RenderRepoDetails = ({ repo }: RenderRepoDetailsType) => {
        return (
            <div style={{ maxWidth: '600px', margin: 'auto' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
                    <AvatarComponent user={repo.owner} size={100}/>
                    <div className='info'>
                        <h1>{repo.name}</h1>
                    </div>
                </div>
                <hr />
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-evenly' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', columnGap: '10px', alignItems: 'center' }}>
                        <Fork />
                        {repo.forks_count}</div>
                    <div style={{ display: 'flex', flexDirection: 'row', columnGap: '10px', alignItems: 'center' }}>
                        <Star />
                        {repo.stargazers_count}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', columnGap: '10px', alignItems: 'center' }}>
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
                    {/*language loader */}
                    <ul>{languages && Object.keys(languages).map((language) => <li key={language}>{language} </li>)}</ul>
                </div>
                <hr />
                <div>
                    <h2>Contributors</h2>
                    {/*add grid to show image and name */}
                    <div className='contributors-grid'>
                        {contributors && contributors.map((contributor) => {
                            return (
                                <AvatarComponent key={contributor.id} user={contributor} shape="circle"/>
                            )
                        })}
                    </div>
                </div>


            </div>
        )
    }

    return (
        isLoading ? <RenderText text='loading' /> : repo ? <RenderRepoDetails repo={repo} /> : <RenderText text='error' />
    );
}

export default Details;

