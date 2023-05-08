import { PaginationIconProps } from "../Types";

function ChevronRight({ onClick, fill, cursor }: PaginationIconProps) {
    return (
        <div onClick={onClick}>
            <svg width="64px" height="64px" viewBox="0 0 24 24" fill={fill} transform="matrix(1, 0, 0, 1, 0, 0)" cursor={cursor}>
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <title></title>
                    <g id="Complete">
                        <g id="F-Chevron">
                            <polyline fill="none" id="Right" points="8.5 5 15.5 12 8.5 19" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline>
                        </g>
                    </g>
                </g>
            </svg>
        </div>
    )
}

export default ChevronRight;