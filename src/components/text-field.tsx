import { HTMLInputTypeAttribute, useState } from "react";

export default function TextField({
  icon,
  className = "",
  placeholder,
  title,
  helper,
  name,
  required,
  type,
  onEnter,
}: {
  icon?: JSX.Element;
  className?: string;
  placeholder?: string;
  title?: string;
  helper?: string;
  name?: string;
  required?: boolean;
  type?: HTMLInputTypeAttribute
  onEnter?: (value: string) => void;
}) {
  const [value, setValue] = useState("");

  const onKeyDown = (e: any) => {
    if (e.key === "Enter") {
      if(onEnter){
        onEnter(value);
        setValue('');
      }
    }
  };

  return (
    <div className="flex flex-col" onKeyDown={onKeyDown}>
      {title && <label className="text-sm font-semibold mb-1.5">{title}</label>}
      <div className="relative">
        <input
          className={`border border-gray-400 w-full h-11 pr-4 ${
            icon ? "pl-10" : "pl-4"
          } outline-none ${className}`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          name={name}
          required={required}
          type={type}
        ></input>
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2">{icon}</div>
        )}
      </div>
      {helper && <p className="text-xs mt-1 text-gray-600">{helper}</p>}
    </div>
  );
}
