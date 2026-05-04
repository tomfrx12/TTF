import Cardtuto from "../components/CardTuto";

function ChooseTutos() {
    return (
        <div className="max-w-360 m-auto">
            {/* <Header/> */}
            <h1 className="font-arial font-bold mt-8 text-3xl">Tutos</h1>
            {/* <Button/> */}
            {/* <Button/> */}
            <Cardtuto src="/img/illustration/react.jpg" categorie="React js" name="Comprendre les hooks essentiels de React" description="Apprendre à utiliser useState, useEffect et useRef"/>
        </div>
    )
};

export default ChooseTutos;