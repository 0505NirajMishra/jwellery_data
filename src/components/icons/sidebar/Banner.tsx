export const BannerIcon: React.FC<React.SVGAttributes<{}>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        fill="none"
        stroke="currentColor"
        className="bi bi-border-all" 
        viewBox="0 0 20 20"
        {...props}
        >
        <path d="M0 0h16v16H0zm1 1v6.5h6.5V1zm7.5 0v6.5H15V1zM15 8.5H8.5V15H15zM7.5 15V8.5H1V15z" />
    </svg>
);