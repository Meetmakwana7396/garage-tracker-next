import Image from 'next/image';
import React from 'react';

const InventoryCard = () => {
    return (
        <div className="border bg-supporting rounded overflow-hidden p-4 hover:-translate-y-2 transition-all duration-300 hover:shadow-3xl cursor-pointer dark:bg-black dark:border-none">
            <Image
                src="/assets/images/sample.jpg"
                width={200}
                height={500}
                className="w-full h-auto"
                alt="part image"
            />
            <div className="pt-2 w-full">
                <p className="font-semibold text-2xl">Hello</p>
                <p className="text-gray-500 line-clamp-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti delectus quasi facere? Aliquid
                    dicta sit eum, quo quae quos debitis?
                </p>
            </div>
        </div>
    );
};

export default InventoryCard;
