export default function Footer() {
    return (
        <footer className="border-t border-gray-200 bg-(--color-primary) flex justify-around justify-self-endp py-2">
            <a href="" className="text-(--color-secondary) underline self-center pb-6">Mentions Légales</a>
            <div className="flex flex-col">
                <p className="text-(--color-white-break)">Suivez-nous sur</p>
                <a href="">svg blanc insta</a>
                <a href="">svg blanc github</a>
                <p className="text-gray-200">© 2026 TTF</p>
            </div>
            <a href="" className="text-(--color-white-break) underline self-center pb-6">Charte Éditoriale</a>
        </footer>
    )
}