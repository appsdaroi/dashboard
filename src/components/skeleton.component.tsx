interface Props {
    className?: string,
    height?: string
}

const Skeleton = ({ className, height }: Props) => (
    <div className={`bg-gray-200 rounded w-full ${className} ${height ? `h-[${height}]` : "h-3"}`}/>
)

export { Skeleton }