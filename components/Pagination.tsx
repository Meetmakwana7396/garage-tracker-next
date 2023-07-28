import helper from '@/libs/helper';
import { FC, useEffect, useState } from 'react';

interface IPagination {
    meta: any;
    prevNextPage: (arg: string) => void;
    page: (arg: string) => void;
    goToPage: (arg: string) => void;
    prevNextPage1?: (arg: number) => void;
}

const Pagination: FC<IPagination> = ({ meta, prevNextPage, page, goToPage, prevNextPage1 }) => {
    const [perPage, setPerPage] = useState<string>('100');
    const [pageNo, setPageNo] = useState(meta?.current_page || '1');

    useEffect(() => {
        setPageNo(pageNo && pageNo < 1 ? 1 : pageNo > meta?.last_page ? meta?.last_page : pageNo);
    }, [pageNo, meta?.last_page]);

    useEffect(() => {
        setPageNo(meta?.current_page || '1');
        setPerPage(meta?.per_page || '100');
    }, [meta]);


    return (
        <>
            <div className="flex gap-2 py-5 sm:items-center">
                {meta?.last_page > 1 && (
                    <div className="flex gap-2">
                        <div className="">
                            <button
                                type="button"
                                className="btn btn-primary"
                                disabled={meta?.current_page === meta?.first_page}
                                onClick={() => {
                                    prevNextPage1
                                        ? prevNextPage1(pageNo > 1 ? pageNo - 1 : 1)
                                        : prevNextPage(meta?.previous_page_url);
                                }}
                            >
                                Previous
                            </button>
                        </div>
                        <div className="">
                            <button
                                type="button"
                                className="btn btn-primary"
                                disabled={meta?.current_page === meta?.last_page}
                                onClick={() => {
                                    prevNextPage1
                                        ? prevNextPage1(pageNo < meta?.last_page ? pageNo + 1 : meta?.last_page)
                                        : prevNextPage(meta?.next_page_url);
                                }}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
                <div className="ml-auto flex flex-col items-end gap-2 sm:flex-row sm:items-center">
                    <select
                        value={perPage}
                        className="form-select w-fit pr-7"
                        onChange={(e) => {
                            setPerPage(e.target.value);
                            page(e.target.value);
                        }}
                    >
                        {helper.perPageOption.map((option) => {
                            return (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            );
                        })}
                    </select>

                    {meta?.last_page > 1 && (
                        <>
                            <div className="flex">
                                <input
                                    type="number"
                                    className="form-input max-w-[60px] rounded-r-none"
                                    value={pageNo}
                                    onChange={(e) => {
                                        e.target.value !== '0' ? setPageNo(parseInt(e.target.value)) : '';
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            goToPage(pageNo.toString());
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    className="btn btn-primary rounded-l-none"
                                    onClick={() => goToPage(pageNo.toString())}
                                >
                                    Go
                                </button>
                            </div>
                            <div>
                                {meta?.current_page} of {meta?.last_page} page(s)
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Pagination;
