import React from 'react';

const TabBlock = ({ name, onClick, isActive, count }: any) => {
    return (
        <li className="inline-block">
            <button
                onClick={onClick}
                className={`flex gap-2 border-t-4 border-transparent p-3 hover:border-secondary hover:text-primary ${
                    !!isActive && '!border-primary text-primary font-semibold bg-gradient-to-b from-primary/10 to-transparent'
                }`}
            >
                <p>
                    {name}
                    <span className="inline-block ml-1 px-[5px] text-xs rounded-full bg-warning text-black">
                        {count || 0}
                    </span>
                </p>
            </button>
        </li>
    );
};

export default TabBlock;
