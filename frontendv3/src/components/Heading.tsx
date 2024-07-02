type HeadingProps = {
  label: string;  
};

export const Heading = ({label}: HeadingProps) => {
  return (
    <div className="text-xl font-bold drop-shadow-sm">
        {label}
    </div>
  )
}
