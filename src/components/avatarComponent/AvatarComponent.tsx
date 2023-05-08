import { OwnerType } from "../../Types";
import './styles.css';

type AvatarComponentType = {
    user: OwnerType;
    size?: number;
    shape?: 'square' | 'circle';
}

const AvatarComponent = ({ user, size=50, shape='square' }: AvatarComponentType) => {
    return (
        <div className='avatar-wrapper' style={{width: `${size * 1.5}px`}}>
            <img src={user.avatar_url} alt={user.login} height={`${size}px`} width={`${size}px`} style={{borderRadius: shape==='circle' ? size : '0px'}} />
            <div style={{whiteSpace: 'initial', wordWrap: 'break-word'}}>{user.login}</div>
        </div>
    )
}

export default AvatarComponent;