import { PaginationIconProps } from "../Types";

function ChevronLeft({ onClick, fill, cursor }: PaginationIconProps) {
    return (
        <div onClick={onClick}>
            <svg width="64px" height="64px" viewBox="0 0 24 24" fill={fill} transform="matrix(-1, 0, 0, 1, 0, 0)" cursor={cursor}>
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <polyline fill="none" id="Right" points="8.5 5 15.5 12 8.5 19" stroke={fill} stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline>
                </g>
            </svg>
        </div>
    )
}

export default ChevronLeft;