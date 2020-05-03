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

export const StandardSeparator = (props) => {
    const { variant = 1 } = props;
    return (
        <>
            {
                variant === 1 ?
                    <div onClick={props.onClick} style={{ ...props.style, display: 'inline', color: '#4fc9c9', opacity: 1 }}> <em>.:!:.</em> </div>
                    : variant === 2 ?
                        <div style={{ ...props.style, color: '#4fc9c9', display: 'inline', opacity: 1 }}><em> /// </em></div>
                        : variant === 3 ?
                        <div style={{ ...props.style, color: '#4fc9c9', display: 'inline', opacity: 1 }}><em> - </em></div>
                        : ''
            }
        </>
    )
}

export const StandardCard = props => {
    const {title = 'Default Title'} = props;
    const appSettings = useContext(AppContext);
    const { softwareFontSize, fgColorDetail, standardCardTitleFontSize } = appSettings;
    return (
        <Card
            border='secondary'
            style={{
                ...props.style,
                backgroundColor: fgColorDetail,
                fontSize: softwareFontSize,
                alignItems: 'center',
                borderColor: '#4fc9c9'
            }}>
                <div style={{fontSize: standardCardTitleFontSize}}>{title}</div>
            {props.children}
        </Card>
    )
}

export const StandardPage = props => {
    const { title = 'Default Title' } = props;
    const appSettings = useContext(AppContext);
    const { fgColor, fontStyle, softwareFontSize, standardPageTitleFontSize } = appSettings;
    const breakpoint = useCurrentBreakpointName();
    return (
        <Container style={{ width: breakpoint === 'xlarge' ? '50vw' : breakpoint === 'large' ? '75vw' : breakpoint === 'medium' ? '85vw' : '' }}>
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
                <div style={{ fontSize: standardPageTitleFontSize }}><StandardSeparator variant={3} />{title}<StandardSeparator variant={3} /></div>
                <StandardCard title='' style={{ marginBottom: '2vh' }}></StandardCard>
                {props.children}
                <StandardCard title='' style={{ marginTop: '2vh', marginBottom: '1vh' }}></StandardCard>
                <StandardSeparator style={{ fontSize: standardPageTitleFontSize }} onClick={() => window.scrollTo(0, 0)} />
            </Jumbotron>
        </Container>
    );
}