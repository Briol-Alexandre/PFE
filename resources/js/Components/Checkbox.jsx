export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-brand text-brand shadow-sm focus:ring-brand-red transition-all ease-in-out duration-300 checked:bg-brand-red hover:bg-brand-red' +
                className
            }
        />
    );
}
