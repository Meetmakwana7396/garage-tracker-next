import IconNotFound from '../Icon/IconNotFound';

const NoDataFound = () => {
    return (
        <div className="h-auto flex items-center justify-center text-center">
            <div className="space-y-5 max-w-xs">
                <IconNotFound className="mx-auto w-24 h-24 text-danger" />
                <h2 className="text-[40px] font-semibold">No data found.</h2>
                <p className="text-gray-500">
                    No results found for your search. Would you like to try a different search term?
                </p>
            </div>
        </div>
    );
};

export default NoDataFound;
