import React, { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

export const SlowImage = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <>
            {
                isLoading ? <Spinner size='sm' animation='border' /> : ''
            }
            <img {...props} style={{ ...props.style, display: isLoading ? 'none' : '' }} onLoad={() => setIsLoading(false)} />
        </>
    );
};

export const Separator = () => {
    return (
        <div style={{ display: 'inline', color: '#00ffaa', opacity: 0.85 }}>
            {` .:!:. `}
        </div>
    )
}