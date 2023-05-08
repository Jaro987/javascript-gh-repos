import { RepoType } from "../../Types";
import { Fork, Star } from "../../icons";
import { useNavigate } from "react-router-dom";
import { AvatarComponent } from "../avatarComponent";
import './styles.css'

type CardType = {
    repo: RepoType;
}

const Card = ({ repo }: CardType) => {
    const navigate = useNavigate();
    const owner = repo.owner.login;
    const name = repo.name;
    return (
        <div key={repo.id} className='card' onClick={()=>navigate(`${owner}/${name}`)}>
            <AvatarComponent user={repo.owner} size={75} shape='circle' />
            <div className='info'>
                <h3>{repo.name}</h3>
                <div className={`row spaceEvenly`}>
                    <div className='row'>
                        <Fork />
                        {repo.forks_count}</div>
                    <div className='row'>
                        <Star />
                        {repo.stargazers_count}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;