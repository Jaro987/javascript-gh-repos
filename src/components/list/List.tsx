import { useEffect, useState,  } from "react";
import { RepoType } from "../../Types";
import { Fork } from "../../icons";
import { Star } from "../../icons";

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
                    <div key={repo.id} style={{ display: 'flex', flexDirection: 'row', padding: '10px', border: '1px solid gray', borderRadius: '10px', margin: '10px' }}>
                        <div style={{ padding: '20px' }}>
                            <img src={repo.owner.avatar_url} alt={repo.owner.login} height={'50px'} width={'50px'} />
                            <div>{repo.owner.login}</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <h3>{repo.name}</h3>
                            <div style={{ display: 'flex', flexDirection: 'row', minWidth: '00px', justifyContent: 'space-evenly' }}>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Fork />
                                    {repo.forks_count}</div>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Star />
                                    {repo.stargazers_count}</div>

                            </div>
                        </div>
                    </div>
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