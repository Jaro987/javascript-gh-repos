import { RepoType } from "../../Types";
import { Fork, Star } from "../../icons";

type CardType = {
    repo: RepoType;
}

const Card = ({ repo }: CardType) => {
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
    );
};

export default Card;