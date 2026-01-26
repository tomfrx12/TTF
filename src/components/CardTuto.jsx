import { Link } from "react-router";

export default function Cardtuto({src, alt, categorie, name, description}) {

    return (
        <Link to="/tuto-react">
            <div className="p-4 flex gap-4 shadow-sm h-45 rounded-lg cursor-pointer hover:shadow-md transition-all transform">
                <img className="w-67.5 h-37.5" src={src} alt={alt} />
                <div className="flex flex-col justify-center gap-2">
                    <span className="text-[#00838F] text-xs font-medium uppercase">{categorie}</span>
                    <h2 className="font-bold text-base">{name}</h2>
                    <p className="font-normal text-base">{description}</p>
                </div>
            </div>
        </Link>
    )
}