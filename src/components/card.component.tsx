import Link from "next/link";
import { Subtitle } from "@tremor/react";

interface CardModuleProps {
    title: string,
    image: string,
    link: string
}

const CardModule = ({ title, image, link }: CardModuleProps) => {
    return (
        <Link style={{ backgroundImage: `url(${image})` }} className="relative max-w-[300px] w-full bg-center bg-cover rounded-[15px] aspect-[182/227] group/card overflow-hidden hover:shadow-lg hover:scale-105 hover:shadow-slate-400/50 transition-all" href={link}>
            <div className="absolute top-0 bottom-0 left-0 right-0 flex items-end justify-start transition-all opacity-0 bg-gradient-to-t from-black group-hover/card:opacity-100">
                <Subtitle className="pb-3 pl-4 text-white">{title}</Subtitle>
            </div>
        </Link>
    )
}

export { CardModule }