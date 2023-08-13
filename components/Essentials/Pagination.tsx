import helper from '@/libs/helper';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

interface IPagination {
    meta: any;
    setFilters: (value: any) => void;
}

const Pagination: FC<IPagination> = ({ meta, setFilters }) => {
    const router = useRouter();
    const { asPath } = router;
    const [page, setPage] = useState<number>();
    return (
        <>
            <div className="flex gap-2 sm:items-center">
                {meta?.last_page > 1 && (
                    <div className="flex gap-2">
                        <div className="">
                            <button
                                type="button"
                                className="btn btn-primary"
                                disabled={meta?.current_page === meta?.first_page}
                                onClick={() => setFilters((prev: any) => ({ ...prev, page: meta.current_page - 1 }))}
                            >
                                Previous
                            </button>
                        </div>
                        <div>
                            <button
                                type="button"
                                className="btn btn-primary"
                                disabled={meta?.current_page === meta?.last_page}
                                onClick={() => setFilters((prev: any) => ({ ...prev, page: meta.current_page + 1 }))}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
                <div className="ml-auto flex flex-col items-end gap-2 sm:flex-row sm:items-center">
                    <select
                        value={meta?.per_page}
                        className="form-select w-fit pr-7"
                        onChange={(e) => setFilters((prev: any) => ({ ...prev, per_page: e.target.value }))}
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
                                    onChange={(e) => {
                                        e.target.value !== '0' ? setPage(Number(e.target.value)) : '';
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            setFilters((prev: any) => ({ ...prev, page: page }));
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    className="btn btn-primary rounded-l-none"
                                    onClick={() => setFilters((prev: any) => ({ ...prev, page: page }))}
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
