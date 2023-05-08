import { PaginationIconProps } from "../Types";
import { ReactComponent as PushRightIcon } from "./push-right.svg";

function PushRight({ onClick, fill, cursor }: PaginationIconProps) {
    return (
        <div onClick={onClick}>
            <svg width="64px" height="64px" viewBox="0 0 24 24" fill={fill} transform="matrix(-1, 0, 0, 1, 0, 0)" cursor={cursor}>
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <polyline fill="none" id="Down" points="17.9 5 10.9 12 17.9 19" stroke={fill} stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline>
                    <line fill="none" stroke={fill} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="6.1" x2="6.1" y1="5" y2="19"></line>
                </g>
            </svg>
        </div>
    )
}

export default PushRight;