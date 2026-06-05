import CardTuto from "@/components/CardTuto";

export default function Page() {
    return (
        <div>
            <h1 className="font-arial font-bold mt-8 text-3xl">Tutos</h1>
            <CardTuto src="/img/react.jpg" alt="photo react" categorie="React js" name="Comprendre les hooks essentiels de React" description="Apprendre à utiliser useState, useEffect et useRef" href="/" />
        </div>
    )
};