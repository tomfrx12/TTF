import Text from "./Text";

interface CardTutoProps {
    name: string;
    title: string;
    description: string;
};

const BG_COLORS = [
  'bg-red-50',
  'bg-blue-50',
  'bg-amber-50',
  'bg-purple-50',
  'bg-pink-50',
  'bg-indigo-50',
  'bg-orange-50',
  'bg-sky-50',   
  'bg-fuchsia-50',
  'bg-violet-50',
  'bg-rose-50'   
];

export default function CardTuto({ name, title, description }: CardTutoProps) {
    const charSum = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const randomBg = BG_COLORS[charSum % BG_COLORS.length];
    return (
        <div className="flex bg-(--color-white-break) rounded-xl border border-gray-200 p-4 gap-4 shadow-sm items-center">
            <div className={`w-1/3 ${randomBg} rounded-lg aspect-square flex items-center justify-center p-2 shrink-0`}>
                <span className="text-xs text-slate-400 font-medium">{name}</span>
            </div>
            <div className="flex flex-col flex-1 justify-between h-full py-1">
                <div>
                    <Text name="h3">{title}</Text>
                    <Text name="p">{description}</Text>
                </div>
                <button className="bg-(--color-primary) hover:bg-(--color-secondary) text-(--color-white-break) font-medium px-4 py-1.5 rounded-md transition-colors text-xs self-start mt-3">
                    Voir
                </button>
            </div>
        </div>
    )
}