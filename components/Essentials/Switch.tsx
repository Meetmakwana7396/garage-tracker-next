import * as Switch from '@radix-ui/react-switch';
interface ISwitchProps {
    checked: boolean;
}

const SwitchDemo = ({ checked }: ISwitchProps) => (
    <form>
        <div className="flex items-center gap-4 px-2 py-3">
            <Switch.Root
                className="w-[42px] h-[25px] rounded-full bg-gray-300 relative data-[state=checked]:bg-primary dark:data-[state=checked]:bg-primary outline-none cursor-default dark:bg-black-more-light"
                checked={checked}
            >
                <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full transition-transform duration-200 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
            </Switch.Root>
            <label className="text-black dark:text-white text-[15px] leading-none">Airplane mode</label>
        </div>
    </form>
);

export default SwitchDemo;
