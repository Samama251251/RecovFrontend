import './FormLoader.css'; // Import the CSS file

interface FormLoaderProps {
    top?: string;
}

export const FormLoader: React.FC<FormLoaderProps> = ({ top="20" }) => {
    return (
        <div className="lds-ellipsis" style={{ top}}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}