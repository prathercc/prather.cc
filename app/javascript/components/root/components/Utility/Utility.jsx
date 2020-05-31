import React, { useState, useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import { AppContext } from '../../AppContext';
import { useCurrentBreakpointName } from 'react-socks';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export const StandardImage = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <>
            {
                isLoading && <Spinner size='sm' animation='border' />
            }
            <img {...props} style={{ ...props.style, display: isLoading ? 'none' : '', maxWidth: '350px' }} onLoad={() => setIsLoading(false)} />
        </>
    );
};

export const StandardSeparator = ({ style, onClick }) => {
    return (
        <div onClick={onClick} style={{ ...style, display: 'inline', color: getThemeColor() }}> <em>/</em> </div>
    )
}

export const StandardCard = ({ title = '', divider = false, style, children, className, onClick }) => {
    const appSettings = useContext(AppContext);
    const { softwareFontSize, fgColorDetail, standardCardTitleFontSize } = appSettings;
    return (
        <Card
            onClick={onClick}
            className={className}
            style={{
                ...style,
                backgroundColor: fgColorDetail,
                fontSize: softwareFontSize,
                alignItems: 'center',
                borderColor: !divider ? '' : getThemeColor(0.65),
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
        <Container style={{ width: containerLogic, maxWidth: '790px', marginTop: '2vh' }}>
            <Jumbotron
                as={Card}
                style={{
                    backgroundColor: fgColor,
                    fontFamily: fontStyle,
                    opacity: '0.95',
                    fontSize: softwareFontSize,
                    paddingTop: '3vh',
                    paddingBottom: '5vh',
                    borderColor: getThemeColor(0.3)
                }}
            >
                <div style={{ fontSize: standardPageTitleFontSize }}>
                    {title}
                </div>
                <StandardCard divider style={{ margin: 'auto', marginBottom: '3vh', width: '65%', display: title ? '' : 'none' }} />
                {children}
            </Jumbotron>
        </Container>
    );
}

export const StandardModal = ({ modalOpen, handleModalClose, children, buttons, canCancel = true }) => {
    const { fgColorDetail, textColor, softwareMaintenanceFontSize, fontStyle, softwareFontSize } = useContext(AppContext);
    return (
        <Modal
            style={{ textAlign: 'center', userSelect: 'none', fontFamily: fontStyle, opacity: 0.95, overflow: 'inherit' }}
            centered
            show={modalOpen}
            onHide={handleModalClose}
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
                <Modal.Footer style={{ padding: 0, marginTop: '1vh', border: 'none' }}>
                    {buttons}
                    <Button disabled={!canCancel} onClick={handleModalClose} variant='light' style={{ marginTop: '1vh', fontSize: softwareFontSize }}> Cancel</Button>
                </Modal.Footer>
            </Modal.Body>
        </Modal>
    )
}

export const LinkModal = ({ link, handleModalClose, modalOpen }) => {
    const { softwareFontSize } = useContext(AppContext);
    const ContinueButton =
        <Button
            onClick={() => { handleModalClose(); window.open(`${link}`); }}
            variant='outline-light'
            style={{ marginTop: '1vh', fontSize: softwareFontSize }}>
            Continue
        </Button>
    return (
        <StandardModal
            modalOpen={modalOpen}
            handleModalClose={handleModalClose}
            buttons={ContinueButton}
        >
            <p>You are about to leave <strong style={{ color: getThemeColor(1) }}>Prather.cc</strong> and navigate to:</p>
            <div style={{ color: getThemeColor(1) }}>{link}</div>
        </StandardModal>
    )
}

export const getThemeColor = (opacity = 1) => {
    return `rgb(79, 201, 201, ${opacity})`;
}

export const getIconSizing = () => {
    const breakpoint = useCurrentBreakpointName();
    return breakpoint === 'xsmall' ? '7vw' : breakpoint === 'large' ? '4.5vw' : breakpoint === 'medium' ? '5.5vw' : breakpoint === 'small' ? '6.5vw' : '3vw';
}

export const getLogoSizing = () => {
    const breakpoint = useCurrentBreakpointName();
    return breakpoint === 'xsmall' ? '15vw' : breakpoint === 'large' ? '12.5vw' : breakpoint === 'medium' ? '13.5vw' : breakpoint === 'small' ? '14.5vw' : '8vw';
}