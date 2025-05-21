export default function TextArea({ className = '', ...props }) {
    return (
        <textarea
            {...props}
            className={
                'border-gray-300 bg-black/20 text-white focus:border-brand focus:ring-brand rounded-md shadow-sm ' +
                className
            }
        />
    );
}
