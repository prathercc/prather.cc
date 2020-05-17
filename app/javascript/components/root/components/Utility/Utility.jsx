import React, { useState, useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import { AppContext } from '../../AppContext';
import { useCurrentBreakpointName } from 'react-socks';
import Modal from 'react-bootstrap/Modal';

export const StandardImage = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <>
            {
                isLoading && <Spinner size='sm' animation='border' />
            }
            <img {...props} style={{ ...props.style, display: isLoading ? 'none' : '', maxWidth: '410px' }} onLoad={() => setIsLoading(false)} />
        </>
    );
};

export const StandardSeparator = ({ style, onClick }) => {
    return (
        <div onClick={onClick} style={{ ...style, display: 'inline', color: getThemeColor() }}> <em>.:!:.</em> </div>
    )
}

export const StandardCard = ({ title = '', divider = false, style, children }) => {
    const appSettings = useContext(AppContext);
    const { softwareFontSize, fgColorDetail, standardCardTitleFontSize } = appSettings;
    return (
        <Card
            style={{
                ...style,
                backgroundColor: fgColorDetail,
                fontSize: softwareFontSize,
                alignItems: 'center',
                borderColor: !divider ? getThemeColor(0.4) : getThemeColor(0.65),
                paddingTop: !divider && '1vh',
                paddingBottom: !divider && '1vh',
                maxWidth: '724px'
            }}>
            <div style={{ fontSize: standardCardTitleFontSize }}>{title}</div>
            {children}
        </Card>
    )
}

export const StandardPage = ({ title = '', children }) => {
    const appSettings = useContext(AppContext);
    const { fgColor, fontStyle, softwareFontSize, standardPageTitleFontSize } = appSettings;
    const breakpoint = useCurrentBreakpointName();
    const containerLogic = breakpoint === 'xlarge' ? '50vw' : breakpoint === 'large' ? '75vw' : breakpoint === 'medium' ? '85vw' : '';
    return (
        <Container style={{ width: containerLogic }}>
            <Jumbotron
                as={Card}
                style={{
                    backgroundColor: fgColor,
                    fontFamily: fontStyle,
                    marginTop: '2vh',
                    opacity: '0.9',
                    fontSize: softwareFontSize,
                    paddingTop: '3vh',
                    paddingBottom: '5vh',
                    borderColor: getThemeColor(0.3),
                    maxWidth: '790px'
                }}
            >
                <div style={{ fontSize: standardPageTitleFontSize }}>
                    {title}
                </div>
                <StandardCard divider style={{ margin: 'auto', marginBottom: '3vh', width: '65%' }} />
                {children}
            </Jumbotron>
        </Container>
    );
}

export const StandardModal = ({ modalOpen, handleModalClose, children }) => {
    const { fgColorDetail, textColor, softwareMaintenanceFontSize, fontStyle } = useContext(AppContext);
    return (
        <Modal
            style={{ textAlign: 'center', userSelect: 'none', fontFamily: fontStyle, opacity: 0.9 }}
            centered
            show={modalOpen}
            onHide={() => handleModalClose()}
            size='lg'
        >
            <Modal.Body
                style={{
                    backgroundColor: fgColorDetail,
                    color: textColor,
                    outline: `1px solid ${getThemeColor(0.5)}`,
                    fontSize: softwareMaintenanceFontSize,
                }}
            >
                {children}
            </Modal.Body>
        </Modal>
    )
}

export const getThemeColor = (opacity = 1) => {
    return `rgb(79, 201, 201, ${opacity})`;
}