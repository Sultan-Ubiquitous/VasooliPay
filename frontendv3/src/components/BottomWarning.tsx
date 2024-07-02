import Link from "next/link"

type BottomWarningProps = {
    label: string;
    buttonText: string;
    link: string;
};

export function BottomWarning({label, buttonText, link}: BottomWarningProps) {
    return <div className=" text-sm flex justify-center drop-shadow-sm">
      <div>
        {label}
      </div>
      <Link className="pointer underline pl-1 cursor-pointer" href={link}>
        {buttonText}
      </Link>
    </div>
} 