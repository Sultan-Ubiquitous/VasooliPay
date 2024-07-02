
type ButtonProps = {
    label: string;
    onClick: () => void;
};

export function Button({label, onClick}: ButtonProps) {
    return <button onClick={onClick} type="button" className =" w-full text-white bg-slate-800 hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 ">{label}</button>
}