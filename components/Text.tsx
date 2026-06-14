import { ReactNode } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

const textVariants = tv({
    variants: {
        name: {
            h1: 'text-[var(--color-black-break)] mt-8 font-bold text-3xl pt-0 pb-4',
            h2: 'text-[var(--color-black-break)] mt-8 mb-2 my-4 text-2xl font-semibold',
            h3: 'text-[var(--color-black-break)] mt-8 mb-2 my-4 text-xl font-medium',
            h4: 'text-[var(--color-black-break)] mt-8 mb-2 my-4 text-lg font-medium',
            p: 'text-[var(--color-black-break)] mx-4 text-normal font-light leading-6',
        }
    }
});

type TextVariantsProps = VariantProps<typeof textVariants>;

type TextProps = {
    name: NonNullable<TextVariantsProps['name']>; 
    className?: string;
    children?: ReactNode;
};

const Text = ({ name, className, children }: TextProps) => {
    const Tag = name; 
    
    return (
        <Tag className={textVariants({ name, class: className })}>
            {children}
        </Tag>
    );
};

export default Text;