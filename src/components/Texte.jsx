import { tv } from 'tailwind-variants';

const text = tv({
    variants: {
        name: {
            h1: 'text-red-500'
        }
    }
})

export default const Text = ({ tag: Tag, name, children }) => {
    return (
        <Tag className={ text ({ name })}>
            {children}
        </Tag>
    )
};