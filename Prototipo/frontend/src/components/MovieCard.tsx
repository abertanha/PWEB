

import Image from 'next/image';

interface MovieCardProps {
    title: string;
    posterUrl: string;
    onClick?: () => void;
}

export default function MovieCard({ title, posterUrl, onClick }: MovieCardProps) {
    return (
        <div className={
            `
            group
            relative
            aspect-[2/3]
            w-full
            bg-neutral-700
            overflow-hidden
            shadow-lg
            transition-all duration-300 ease-in-out
            hover:scale-105
            hover:shadow-2xl
            ${onClick ? 'curso-pointer' : ''}
            `}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
            onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); } : undefined}
            >
            <Image 
                src={posterUrl}
                alt={`Poster do filme ${title}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
             />
        </div>
    )
}