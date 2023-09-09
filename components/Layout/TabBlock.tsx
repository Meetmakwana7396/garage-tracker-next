import React from 'react';

const TabBlock = ({ name, onClick, isActive, count }: any) => {
    return (
        <li className="inline-block text-lg">
            <button
                onClick={onClick}
                className={`flex gap-2 border-t-4 border-transparent p-3 hover:border-secondary dark:hover:border-black-more-light hover:text-primary ${
                    !!isActive && '!border-primary text-primary font-semibold bg-gradient-to-b from-primary/10 to-transparent'
                }`}
            >
                <p>
                    {name}
                    <div className="inline-block ml-1 w-5 h-5 text-sm rounded-full bg-[#BDEE63]/80 text-black">
                        {count || 0}
                    </div>
                </p>
            </button>
        </li>
    );
};

export default TabBlock;
