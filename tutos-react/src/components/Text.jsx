import { tv } from 'tailwind-variants';

const text = tv({
    variants: {
        name: {
            h1: 'text-[var(--color-black)] mt-8 font-bold text-3xl pt-0 pb-4',
            h2: 'text-[var(--color-black)] mt-8 mb-2 my-4 text-2xl font-semibold',
            h3: 'text-[var(--color-black)] mt-8 mb-2 my-4 text-xl font-medium',
            h4: 'text-[var(--color-black)] mt-8 mb-2 my-4 text-lg font-medium',
            p: 'text-[var(--color-black)] mx-4 text-normal font-light leading-6',
        }
    }
});

const Text = ({ name, className, children }) => {
    const Tag = name;
    return (
        <Tag className={text({ name, className })}>
            {children}
        </Tag>
    );
};

export default Text;