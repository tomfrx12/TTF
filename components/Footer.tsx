import { FaGithub, FaInstagram } from "react-icons/fa";
import Text from "./Text";

export default function Footer() {
    return (
        <footer className="border-t border-gray-200 bg-(--color-primary) flex justify-around justify-self-endp py-2">
            <a href="" className="text-(--color-secondary) underline self-center pb-6">Mentions Légales</a>
            <div className="flex flex-col">
                <Text name="p" className="text-(--color-white-break)">Suivez-nous sur</Text>
                <div className="flex">
                    <a href=""><FaInstagram /></a>
                    <a href=""><FaGithub /></a>
                </div>
                <Text name="p" className="text-gray-200">© 2026 TTF</Text>
            </div>
            <a href="" className="text-(--color-white-break) underline self-center pb-6">Charte Éditoriale</a>
        </footer>
    )
}