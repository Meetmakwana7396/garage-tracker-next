import React from 'react';

const TabBlock = ({ name, onClick, isActive, count }: any) => {
    return (
        <li className="inline-block">
            <button
                onClick={onClick}
                className={`flex gap-2 border-b border-transparent p-3 hover:border-secondary hover:text-primary ${
                    !!isActive && '!border-primary text-primary font-semibold border-b-2'
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
