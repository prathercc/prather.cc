import React, { useState, useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import { AppContext } from '../../AppContext';
import { useCurrentBreakpointName } from 'react-socks';

export const StandardImage = (props) => {
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

export const StandardSeparator = () => {
    return (
        <div style={{ display: 'inline', color: '#00ffaa', opacity: 0.85 }}>
            {` .:!:. `}
        </div>
    )
}

export const StandardCard = props => {
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

export const StandardPage = props => {
    const appSettings = useContext(AppContext);
    const { fgColor, fontStyle, softwareFontSize } = appSettings;
    const breakpoint = useCurrentBreakpointName();
    return (
        <Container style={{ width: breakpoint === 'xlarge' ? '50vw' : '' }}>
            <Jumbotron
                as={Card}
                border='secondary'
                style={{
                    backgroundColor: fgColor,
                    fontFamily: fontStyle,
                    marginTop: '5vh',
                    opacity: '0.9',
                    fontSize: softwareFontSize
                }}
            >
                {props.children}
            </Jumbotron>
        </Container>
    );
}