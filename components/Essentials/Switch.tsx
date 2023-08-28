import * as Switch from '@radix-ui/react-switch';

const SwitchDemo = () => (
    <form>
        <div className="flex items-center gap-4 ">
            <Switch.Root
                className="w-[42px] h-[25px] bg-blackA9 rounded-full bg-gray-300 relative data-[state=checked]:bg-primary dark:data-[state=checked]:bg-primary outline-none cursor-default dark:bg-black-more-light"
                id="airplane-mode"
            >
                <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full transition-transform duration-300 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
            </Switch.Root>
            <label className="text-black dark:text-white text-[15px] leading-none" htmlFor="airplane-mode">
                Airplane mode
            </label>
        </div>
    </form>
);

export default SwitchDemo;
