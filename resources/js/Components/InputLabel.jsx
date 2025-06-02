export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block text-base font-medium text-brand ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
