import React, { useState, useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AppContext } from '../../AppContext';
import { useCurrentBreakpointName } from 'react-socks';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export const StandardImageModal = ({ modalOpen, handleModalClose, imageLink }) => {
    const RawButton = <StandardButton style={{ minWidth: '25%' }} onClick={() => window.open(imageLink)}>View Raw Image</StandardButton>
    return (
        <StandardModal buttons={RawButton} modalOpen={modalOpen} handleModalClose={handleModalClose}>
            <StandardImage src={imageLink} style={{ maxWidth: '85%' }} />
        </StandardModal>
    )
}

export const StandardCheckBox = ({ label, value, onChange, style }) => {
    return (
        <Container style={{ maxWidth: 'max-content', ...style }} onClick={onChange}>
            <Row>
                <Col>
                    <Form.Check
                        type='checkbox'
                        checked={value}
                        style={{ display: 'inline' }}
                    />
                    <div style={{ display: 'inline' }}> {label}</div>
                </Col>
            </Row>
        </Container>
    )
}

export const StandardDropDown = ({ onChange, label, isActive = true, style, data, value }) => {
    return (
        <div style={{ ...style }}>
            <Form.Text style={{ textAlign: 'left' }}>{label}</Form.Text>
            <Form.Control
                style={{ cursor: isActive ? 'default' : 'not-allowed', textAlign: 'left' }}
                disabled={!isActive}
                as="select"
                value={value}
                onChange={onChange}>
                <option>Make a selection</option>
                {
                    data.map(x => {
                        return (
                            <option key={x.id} value={x.id}>{x.name}</option>
                        )
                    })
                }
            </Form.Control>
        </div>
    );
};

export const StandardTextField = ({ onChange, label, isActive = true, value, rows = 1, isPassword, style }) => {
    return (
        <div style={{ ...style }}>
            <Form.Text style={{ textAlign: 'left' }}>{label}</Form.Text>
            <Form.Control
                style={{ textAlign: 'left', cursor: isActive ? 'text' : 'not-allowed' }}
                size='sm'
                type={isPassword ? 'password' : 'text'}
                placeholder={label}
                disabled={!isActive}
                value={value}
                onChange={onChange}
                as={rows > 1 ? 'textarea' : 'input'}
                rows={rows}
            />
        </div>
    );
};

export const StandardImage = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <>
            {
                isLoading && <StandardSpinner />
            }
            <img {...props} style={{ ...props.style, display: isLoading ? 'none' : '' }} onLoad={() => setIsLoading(false)} onError={() => setIsLoading(true)} />
        </>
    );
};

export const StandardButton = ({ onClick, style, children, isActive = true }) => {
    const appSettings = useContext(AppContext);
    const { standardCardTitleFontSize } = appSettings;
    return (
        <Card
            onClick={isActive ? onClick : () => { }}
            className='defaultButton'
            style={{
                margin: 'auto',
                ...style,
                fontSize: standardCardTitleFontSize,
                alignItems: 'center',
                cursor: isActive || 'not-allowed'
            }}>
            {children}
        </Card>
    )
}

export const StandardSpinner = () => {
    return (
        <Spinner style={{ margin: 'auto', color: getThemeColor(0.1) }} animation='border' />
    )
}

export const StandardSeparator = ({ style, onClick }) => {
    return (
        <div onClick={onClick} style={{ ...style, display: 'inline', color: getThemeColor() }}> <em>/</em> </div>
    )
}

export const StandardCard = ({ title = '', style, children, className, onClick }) => {
    const appSettings = useContext(AppContext);
    const { softwareFontSize, fgColorDetail, standardCardTitleFontSize } = appSettings;
    return (
        <Card
            onClick={onClick}
            className={className}
            style={{
                margin: 'auto',
                ...style,
                backgroundColor: fgColorDetail,
                fontSize: softwareFontSize,
                alignItems: 'center',
                border: `2px solid ${getThemeColor(0)}`
            }}>
            <div style={{ fontSize: standardCardTitleFontSize }}>{title}</div>
            {children}
        </Card>
    )
}

export const StandardCardHeader = () => {
    return (
        <Card
            style={{
                borderColor: getThemeColor(0.8),
                margin: 'auto',
                marginBottom: '2vh',
                width: '65%',
                opacity: '0.65'
            }}>
        </Card>
    )
}

export const StandardPage = ({ title = '', children, style }) => {
    const appSettings = useContext(AppContext);
    const { fgColor, fontStyle, softwareFontSize, standardPageTitleFontSize } = appSettings;
    return (
        <Container style={{ minWidth: '85%', ...style }}>
            <Jumbotron
                as={Card}
                style={{
                    backgroundColor: fgColor,
                    fontFamily: fontStyle,
                    opacity: '0.95',
                    fontSize: softwareFontSize,
                    paddingTop: '3vh',
                    paddingBottom: '5vh',
                    borderColor: getThemeColor(0.3),
                    marginTop: '8vh'
                }}
            >
                <div style={{ fontSize: standardPageTitleFontSize }}>
                    {title}
                </div>
                <StandardCardHeader />
                {children}
            </Jumbotron>
        </Container>
    );
}

export const StandardModal = ({ modalOpen, handleModalClose, children, buttons }) => {
    const { fgColorDetail, textColor, softwareMaintenanceFontSize, fontStyle } = useContext(AppContext);
    return (
        <Modal
            scrollable
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
                    border: `1px solid ${getThemeColor(0.3)}`,
                    fontSize: softwareMaintenanceFontSize,
                }}
            >
                {children}
                <Modal.Footer style={{ padding: 0, marginTop: '1vh', border: 'none' }}>
                    <Container>
                        <Row>
                            {buttons && <Col>{buttons}</Col>}
                            <Col>
                                <StandardButton onClick={handleModalClose} style={{ minWidth: '25%' }}> Cancel</StandardButton>
                            </Col>
                        </Row>
                    </Container>

                </Modal.Footer>
            </Modal.Body>
        </Modal>
    )
}

export const LinkModal = ({ link, handleModalClose, modalOpen }) => {
    const ContinueButton =
        <StandardButton
            onClick={() => { handleModalClose(); window.open(`${link}`); }}
            style={{ minWidth: '25%' }}>
            Continue
        </StandardButton>
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