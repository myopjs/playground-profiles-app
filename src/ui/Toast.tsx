import {useState, useEffect} from "react";

type ToastProps = {
    message: string;
    isOpen: boolean;
    onClose: () => void;
    duration?: number;
}

export const Toast = ({ message, isOpen, onClose, duration = 3000 }: ToastProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            requestAnimationFrame(() => setIsVisible(true));
            const timer = setTimeout(() => {
                setIsVisible(false);
                setTimeout(onClose, 300);
            }, duration);
            return () => clearTimeout(timer);
        } else {
            setIsVisible(false);
        }
    }, [isOpen, duration, onClose]);

    if (!isOpen) return null;

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '24px',
                right: '24px',
                transform: isVisible ? 'translateX(0)' : 'translateX(calc(100% + 24px))',
                backgroundColor: '#50FFEE',
                color: '#000',
                padding: '12px 24px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                zIndex: 2000,
                fontSize: '14px',
                transition: 'transform 300ms ease-out',
            }}
        >
            {message}
        </div>
    );
}