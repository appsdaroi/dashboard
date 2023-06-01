interface Props {
    className?: string,
    height?: string
}

const Skeleton = ({ className, height }: Props) => (
    <div className={`bg-gray-200 rounded w-full h-6 ${className}`}/>
)

export { Skeleton }