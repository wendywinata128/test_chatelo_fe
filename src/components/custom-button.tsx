export default function CustomButton({title, className, ...otherProps}: {title: string, className?: string, [key: string]: any}) {
  return (
    <button className={`bg-accent text-white py-2 px-8 rounded ${className}`} {...otherProps}>
      {title}
    </button>
  );
}
