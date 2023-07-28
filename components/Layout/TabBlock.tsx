import React from 'react';

const TabBlock = ({ name, onClick, isActive, count }: any) => {
    return (
        <li className="inline-block">
            <button
                onClick={onClick}
                className={`flex gap-2 border-b border-transparent p-4 hover:border-secondary hover:text-secondary ${
                    !!isActive && '!border-secondary text-primary font-semibold border-b-2'
                }`}
            >
                <p>
                    {name}
                    <span className="inline-block ml-1 px-1.5 text-sm rounded-full bg-danger text-white">
                        {count || 0}
                    </span>
                </p>
            </button>
        </li>
    );
};

export default TabBlock;
