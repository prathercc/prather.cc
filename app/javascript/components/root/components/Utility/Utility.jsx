import React, { useState, useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import { AppContext } from '../../AppContext';

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

export const DetailCard = props => {
    const { style = {} } = props;
    const appSettings = useContext(AppContext);
    const { softwareFontSize, fgColorDetail } = appSettings;
    return (
        <Card
            border='secondary'
            style={{
                ...style, backgroundColor: fgColorDetail,
                fontSize: softwareFontSize,
                alignItems: 'center',
            }}>
            {props.children}
        </Card>
    )
}