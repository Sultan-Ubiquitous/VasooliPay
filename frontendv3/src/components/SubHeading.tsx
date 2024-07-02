type SubHeadingProps = {
    label: string;  
};

export const SubHeading = ({label}: SubHeadingProps) => {
  return (
    <div className="text-sm font-medium text-gray-500 drop-shadow-sm">
        {label}
    </div>
  )
}
