type InputBoxProps = {
    label: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputBox = ({label, placeholder, onChange}: InputBoxProps) => {
  return (
    <div >
      <div className="drop-shadow-sm text-sm font-medium text-left py-2">
        {label}
      </div>
      <input onChange={onChange} placeholder={placeholder} className="drop-shadow-sm w-full px-2 py-1 border bg-slate-100 rounded border-slate-200" />
    </div>
  )
} 