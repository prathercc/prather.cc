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
            <img {...props} style={{ ...props.style, display: isLoading ? 'none' : '' }} onLoad={() => setIsLoading(false)} />
        </>
    );
};

export const StandardSeparator = (props) => {
    const { variant = 1 } = props;
    return (
        <>
            {
                variant === 1 && <div onClick={props.onClick} style={{ ...props.style, display: 'inline', color: '#4fc9c9', opacity: 1 }}> <em>.:!:.</em> </div>
            }
            {
                variant === 2 && <div style={{ ...props.style, color: 'rgb(79, 201, 201, 0.8)', display: 'inline', opacity: 1 }}> - </div>
            }
        </>
    )
}

export const StandardCard = props => {
    const { title = '', divider = false } = props;
    const appSettings = useContext(AppContext);
    const { softwareFontSize, fgColorDetail, standardCardTitleFontSize } = appSettings;
    return (
        <Card
            style={{
                ...props.style,
                backgroundColor: fgColorDetail,
                fontSize: softwareFontSize,
                alignItems: 'center',
                borderColor: !divider ? 'rgb(79, 201, 201, 0.4)' : 'rgb(79, 201, 201, 0.65)',
                paddingTop: !divider && '1vh',
                paddingBottom: !divider && '1vh',

            }}>
            <div style={{ fontSize: standardCardTitleFontSize }}>{title}</div>
            {props.children}
        </Card>
    )
}

export const StandardPage = props => {
    const { title = '' } = props;
    const appSettings = useContext(AppContext);
    const { fgColor, fontStyle, softwareFontSize, standardPageTitleFontSize } = appSettings;
    const breakpoint = useCurrentBreakpointName();
    return (
        <Container style={{ width: breakpoint === 'xlarge' ? '50vw' : breakpoint === 'large' ? '75vw' : breakpoint === 'medium' ? '85vw' : '' }}>
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
                    borderColor: 'rgb(79, 201, 201, 0.3)'
                }}
            >
                <div style={{ fontSize: standardPageTitleFontSize }}>
                    <StandardSeparator variant={2} style={{ fontSize: standardPageTitleFontSize }} /> {title} <StandardSeparator variant={2} style={{ fontSize: standardPageTitleFontSize }} />
                </div>
                <StandardCard divider style={{ margin: 'auto', marginBottom: '3vh', width: '65%' }} />
                {props.children}
            </Jumbotron>
        </Container>
    );
}

export const StandardModal = ({ modalOpen, title, handleModalClose, titleIcon, closable = true, children }) => {
    const { fgColorDetail, fgColor, textColor, softwareFontSize, softwareMaintenanceFontSize, fontStyle } = useContext(AppContext);
    return (
        <Modal
            style={{ textAlign: 'center', userSelect: 'none', fontFamily: fontStyle, opacity: 0.9 }}
            centered
            show={modalOpen}
            onHide={() => handleModalClose()}
            size='lg'
        >
            {
                closable && <Modal.Header
                    style={{
                        backgroundColor: fgColor,
                        color: textColor,
                        outline: '1px solid gray'
                    }}
                    closeButton={closable}
                >
                    <Modal.Title
                        style={{
                            fontSize: softwareFontSize
                        }}
                    >
                        {titleIcon} {title}
                    </Modal.Title>
                </Modal.Header>
            }

            <Modal.Body
                style={{
                    backgroundColor: fgColorDetail,
                    color: textColor,
                    outline: '1px solid gray',
                    fontSize: softwareMaintenanceFontSize
                }}
            >
                {children}
            </Modal.Body>
        </Modal>
    )
}