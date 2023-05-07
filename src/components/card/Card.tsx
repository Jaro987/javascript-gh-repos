import { RepoType } from "../../Types";
import { Fork, Star } from "../../icons";
import './styles.css'

type CardType = {
    repo: RepoType;
}

const Card = ({ repo }: CardType) => {
    return (
        <div key={repo.id} className='card'>
            <div className='owner'>
                <img src={repo.owner.avatar_url} alt={repo.owner.login} height={'50px'} width={'50px'} />
                <div>{repo.owner.login}</div>
            </div>
            <div className='info'>
                <h3>{repo.name}</h3>
                <div className={`row spaceEvenly`}>
                    <div className='row'>
                        <Fork />
                        {repo.forks_count}</div>
                    <div className='row'>
                        <Star />
                        {repo.stargazers_count}</div>

                </div>
            </div>
        </div>
    );
};

export default Card;