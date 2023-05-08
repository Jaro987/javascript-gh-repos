import { LegacyRef, ReactElement, forwardRef } from "react";
import { PaginationObjType } from "../../Types";
import { ChevronLeft, ChevronRight, PushLeft, PushRight } from "../../icons";
import './styles.css'

type PaginationType = {
    callback: (page: number) => void;
    pagination: PaginationObjType;
}

const Pagination = forwardRef(({ callback, pagination }: PaginationType, ref: LegacyRef<HTMLDivElement>): ReactElement => {
    const numbersToRender = (): Array<string> => {
        const NUMBER_OF_VISIBLE_PAGES = 5;
        const halfOfVisiblePagesInt = parseInt(`${NUMBER_OF_VISIBLE_PAGES / 2}`);
        const start = currentPage - halfOfVisiblePagesInt;
        const end = currentPage + halfOfVisiblePagesInt;
        if (lastPage < NUMBER_OF_VISIBLE_PAGES) {
            return Array.from({ length: lastPage }, (value, index) => (index + 1).toString());
        }

        if (start <= 1) {
            const pages = Array.from({ length: NUMBER_OF_VISIBLE_PAGES }, (value, index) => (index + 1).toString());
            NUMBER_OF_VISIBLE_PAGES < lastPage && pages.push('...');
            return pages;
        }
        if (end >= lastPage) {
            const pages = Array.from({ length: lastPage }, (value, index) => (index + 1).toString()).slice(
                -NUMBER_OF_VISIBLE_PAGES
            );
            NUMBER_OF_VISIBLE_PAGES < lastPage && pages.unshift('...');
            return pages;
        }
        const pages = Array.from({ length: NUMBER_OF_VISIBLE_PAGES }, (value, index) => (index + start).toString());
        pages.push('...');
        pages.unshift('...');
        return pages;
    };
    const { currentPage, lastPage } = pagination;
    const pages = numbersToRender();
    const disabledLeftArrows = currentPage === 1;
    const disabledRightArrows = currentPage === lastPage;
    const fillArrows = (isDisabled: boolean) => (isDisabled ? 'lightgray' : 'black');
    const cursorArrows = (isDisabled: boolean) => (isDisabled ? 'not-allowed' : 'pointer');

    return (
        <div className='pagiantion-container' ref={ref}>
            <PushLeft
                onClick={() => (disabledLeftArrows ? undefined : callback(1))}
                fill={fillArrows(disabledLeftArrows)}
                cursor={cursorArrows(disabledLeftArrows)}
            />
            <ChevronLeft
                onClick={() => (disabledLeftArrows ? undefined : callback(currentPage - 1))}
                fill={fillArrows(disabledLeftArrows)}
                cursor={cursorArrows(disabledLeftArrows)}
            />
            {pages.map((pageNumber: string, i: number) => {
                const selectedCurrent = pageNumber === currentPage.toString();
                return (
                    <div className={`page ${selectedCurrent && "selectedPage"}`} style={{ cursor: !isNaN(parseInt(pageNumber)) ? "pointer" : "default"}}
                        key={i}
                        onClick={() =>
                            isNaN(parseInt(pageNumber)) || selectedCurrent ? undefined : callback(parseInt(pageNumber))
                        }
                    >
                        {pageNumber}
                    </div>
                );
            })}
            <ChevronRight
                onClick={() => (disabledRightArrows ? undefined : callback(currentPage + 1))}
                fill={fillArrows(disabledRightArrows)}
                cursor={cursorArrows(disabledRightArrows)}
            />
            <PushRight
                    onClick={() => (disabledRightArrows ? undefined : callback(lastPage))}
                    fill={fillArrows(disabledRightArrows)}
                    cursor={cursorArrows(disabledRightArrows)}
            />
        </div>
    )
})

export default Pagination;