export default function Code({className, children}) {
    return (
        <pre className="my-4">
            <code className={`relative block bg-[rgba(40,42,54,100)] p-2 border border-[rgba(0,0,0,0.09)] leading-6.5 ${className ?? ''}`}>
                {children}
            </code>
        </pre>
    )
}