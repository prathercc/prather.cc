import React, { useState, useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AppContext } from '../../AppContext';
import { useCurrentBreakpointName } from 'react-socks';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import XIcon from 'react-bootstrap-icons/dist/icons/x';

export const StandardImageModal = ({ modalOpen, handleModalClose, imageLink }) => {
    const RawButton = <StandardButton style={{ minWidth: '25%' }} onClick={() => window.open(imageLink)}>View Raw Image</StandardButton>
    return (
        <StandardModal title='View Image' buttons={RawButton} modalOpen={modalOpen} handleModalClose={handleModalClose}>
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
                        onChange={onChange}
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
                style={{ cursor: isActive ? 'default' : 'not-allowed', textAlign: 'left', backgroundColor: '#d9d9d9' }}
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
                style={{ textAlign: 'left', cursor: isActive ? 'text' : 'not-allowed', backgroundColor: '#d9d9d9' }}
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

export const StandardImage = ({ style, src, className, onClick, onLoaded = () => { } }) => {
    const [isLoading, setIsLoading] = useState(true);

    const handleOnLoad = () => {
        setIsLoading(false);
        onLoaded();
    }

    return (
        <>
            {
                isLoading && <StandardSpinner />
            }
            <img onClick={onClick} className={className} src={src} style={{ ...style, display: isLoading ? 'none' : '' }} onLoad={handleOnLoad} onError={() => setIsLoading(true)} />
        </>
    );
};

export const StandardButton = ({ onClick, style, children, isActive = true, icon }) => {
    const { standardCardTitleFontSize } = useContext(AppContext);
    return (
        <>
            {icon && <div onClick={isActive ? onClick : () => { }} className='defaultMouseOver' style={{ margin: 'auto', maxWidth: 'max-content', cursor: isActive ? 'pointer' : 'not-allowed', ...style }}>
                {icon}
            </div>}
            {
                !icon && <Card
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
            }
        </>
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

export const StandardCard = ({ title, style, children, className, onClick, noBorders }) => {
    const { softwareFontSize, standardCardTitleFontSize } = useContext(AppContext);
    return (
        <Card
            onClick={onClick}
            className={className}
            style={{
                margin: 'auto',
                ...style,
                backgroundColor: 'transparent',
                fontSize: softwareFontSize,
                alignItems: 'center',
                border: 'none'
            }}>
            <div style={{ fontSize: standardCardTitleFontSize, minWidth: '100%', backgroundColor: getThemeColor(0.5), borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>{title}</div>
            <div style={noBorders ? {} : { border: `1px solid ${getThemeColor(0.5)}`, minWidth: '100%', borderBottomLeftRadius: '25px', borderBottomRightRadius: '25px' }}>
                {children}
            </div>
        </Card>
    )
}

export const StandardPage = ({ title = '', children, style }) => {
    const { bgColor, fontStyle, softwareFontSize, standardPageTitleFontSize } = useContext(AppContext);
    return (
        <Container style={{ backgroundColor: 'transparent', position: 'relative', minWidth: '85%', ...style }}>
            <div style={{ backgroundColor: bgColor }}>
                <div style={{ fontSize: standardPageTitleFontSize, backgroundColor: getThemeColor(0.5), margin: 'auto', marginTop: '4vh', padding: '5px', borderRadius: '5px', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
                    {title}
                </div>
                <div
                    style={{
                        backgroundColor: 'transparent',
                        fontFamily: fontStyle,
                        fontSize: softwareFontSize,
                        paddingTop: '0vh',
                        paddingBottom: '2vh',
                        border: `3px solid ${getThemeColor(0.5)}`,
                        borderTop: 'none',
                        paddingLeft: '0vw',
                        paddingRight: '0vw',
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0
                    }}
                >
                    <Card style={{ margin: 'auto', width: '95%', backgroundColor: 'transparent', border: 'none' }}>
                        {children}
                    </Card>
                </div>
            </div>
        </Container>
    );
}

export const StandardModal = ({ modalOpen, handleModalClose, children, buttons, title }) => {
    const { bgColor, textColor, softwareMaintenanceFontSize, fontStyle, standardPageTitleFontSize } = useContext(AppContext);
    return (
        <Modal
            style={{ textAlign: 'center', userSelect: 'none', fontFamily: fontStyle }}
            centered
            show={modalOpen}
            onHide={handleModalClose}
            size='lg'
        >
            <div style={{ backgroundColor: bgColor }}>
                <Modal.Header style={{
                    backgroundColor: getThemeColor(0.5),
                    borderBottom: 'none',
                    padding: '10px',
                    paddingTop: 0,
                    paddingBottom: 0,
                }}>
                    <div style={{ paddingLeft: getIconSizing('medium') }} />
                    <div style={{ fontSize: standardPageTitleFontSize, color: textColor, justifyContent: 'center', margin: 'auto', verticalAlign: 'middle' }}>{title}</div>
                    <div><StandardButton onClick={handleModalClose} icon={<XIcon style={{ fontSize: getIconSizing('medium') }} />} /></div>
                </Modal.Header>
                <Modal.Body
                    style={{
                        backgroundColor: 'transparent',
                        color: textColor,
                        border: `3px solid ${getThemeColor(0.5)}`,
                        borderTop: 0,
                        fontSize: softwareMaintenanceFontSize,
                    }}
                >
                    {children}
                    <Modal.Footer style={{ padding: 0, marginTop: '1vh', border: 'none' }}>
                        <Container>
                            <Row>
                                {buttons && <Col>{buttons}</Col>}
                            </Row>
                        </Container>
                    </Modal.Footer>
                </Modal.Body>
            </div>

        </Modal >
    )
}


export const getThemeColor = (opacity = 1) => {
    return `rgb(79, 201, 201, ${opacity})`;
}

export const getIconSizing = (size = 'large') => {
    const breakpoint = useCurrentBreakpointName();
    let largeLogic = breakpoint === 'xsmall' ? '7vw' : breakpoint === 'large' ? '4.5vw' : breakpoint === 'medium' ? '5.5vw' : breakpoint === 'small' ? '6.5vw' : '3vw';
    let mediumLogic = breakpoint === 'xsmall' ? '4vw' : breakpoint === 'large' ? '3.5vw' : breakpoint === 'medium' ? '4.5vw' : breakpoint === 'small' ? '5.5vw' : '2vw';
    let smallLogic = breakpoint === 'xsmall' ? '3vw' : breakpoint === 'large' ? '2.5vw' : breakpoint === 'medium' ? '3.5vw' : breakpoint === 'small' ? '4.5vw' : '1.5vw';
    return size === 'large' ? largeLogic : size === 'medium' ? mediumLogic : size === 'small' ? smallLogic : '1vw';
}

export const getLogoSizing = () => {
    const breakpoint = useCurrentBreakpointName();
    return breakpoint === 'xsmall' ? '15vw' : breakpoint === 'large' ? '12.5vw' : breakpoint === 'medium' ? '13.5vw' : breakpoint === 'small' ? '14.5vw' : '8vw';
}