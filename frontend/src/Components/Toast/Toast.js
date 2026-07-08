import React, { useState, useCallback, useRef, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';

const ToastContext = React.createContext();

export const useToast = () => React.useContext(ToastContext);

let toastId = 0;

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);
    const timersRef = useRef({});

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
        if (timersRef.current[id]) {
            clearTimeout(timersRef.current[id]);
            delete timersRef.current[id];
        }
    }, []);

    const addToast = useCallback((message, type = 'success', duration = 3000) => {
        const id = ++toastId;
        setToasts(prev => [...prev, { id, message, type }]);
        timersRef.current[id] = setTimeout(() => {
            removeToast(id);
        }, duration);
        return id;
    }, [removeToast]);

    const toastAPI = useMemo(() => ({
        success: (msg) => addToast(msg, 'success'),
        error: (msg) => addToast(msg, 'error'),
        info: (msg) => addToast(msg, 'info'),
        warning: (msg) => addToast(msg, 'warning'),
    }), [addToast]);

    return (
        <ToastContext.Provider value={toastAPI}>
            {children}
            <ToastContainer>
                {toasts.map((t) => (
                    <ToastItem key={t.id} type={t.type}>
                        <div className="toast-icon">
                            {t.type === 'success' && <i className="fa-solid fa-circle-check"></i>}
                            {t.type === 'error' && <i className="fa-solid fa-circle-xmark"></i>}
                            {t.type === 'info' && <i className="fa-solid fa-circle-info"></i>}
                            {t.type === 'warning' && <i className="fa-solid fa-triangle-exclamation"></i>}
                        </div>
                        <p className="toast-message">{t.message}</p>
                        <button className="toast-close" onClick={() => removeToast(t.id)}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </ToastItem>
                ))}
            </ToastContainer>
        </ToastContext.Provider>
    );
}

const slideIn = keyframes`
    from {
        transform: translateX(120%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
`;

const ToastContainer = styled.div`
    position: fixed;
    top: 1.5rem;
    right: 1.5rem;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    pointer-events: none;
`;

const typeColors = {
    success: { bg: '#ECFDF5', border: '#42AD00', icon: '#42AD00' },
    error: { bg: '#FEF2F2', border: '#E74C3C', icon: '#E74C3C' },
    info: { bg: '#EFF6FF', border: '#5DADE2', icon: '#5DADE2' },
    warning: { bg: '#FFFBEB', border: '#F2994A', icon: '#F2994A' },
};

const ToastItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.7rem;
    padding: 0.8rem 1rem;
    min-width: 280px;
    max-width: 400px;
    background: ${props => typeColors[props.type]?.bg || typeColors.info.bg};
    border: 2px solid ${props => typeColors[props.type]?.border || typeColors.info.border};
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
    animation: ${slideIn} 0.35s ease-out;
    pointer-events: all;

    .toast-icon {
        flex-shrink: 0;
        font-size: 1.2rem;
        color: ${props => typeColors[props.type]?.icon || typeColors.info.icon};
    }

    .toast-message {
        flex: 1;
        font-size: 0.9rem;
        font-weight: 600;
        color: rgba(34, 34, 96, 0.8);
        margin: 0;
        font-family: 'Nunito', sans-serif;
    }

    .toast-close {
        flex-shrink: 0;
        background: none;
        border: none;
        cursor: pointer;
        color: rgba(34, 34, 96, 0.3);
        font-size: 0.9rem;
        padding: 0.2rem;
        transition: color 0.2s;

        &:hover {
            color: rgba(34, 34, 96, 0.7);
        }
    }
`;
