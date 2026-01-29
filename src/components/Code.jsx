export default function Code({className, children}) {
    return (
        <pre className="m-4">
            <code className={`bg-[rgba(40,42,54,100)] py-0.5 px-2.5 border border-[rgba(0,0,0,0.09)] ${className ?? ''}`}>
                {children}
            </code>
        </pre>
    )
}