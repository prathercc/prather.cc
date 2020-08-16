import React, { useState, useContext, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { AppContext } from '../../AppContext';
import { useCurrentBreakpointName } from 'react-socks';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import XIcon from 'react-bootstrap-icons/dist/icons/x';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Alert from 'react-bootstrap/Alert';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export const StandardImageModal = ({ modalOpen, handleModalClose, imageLink }) => {
    return (
        <StandardModal title='View Image' modalOpen={modalOpen} handleModalClose={handleModalClose}>
            <div style={{ maxWidth: 'max-content', margin: 'auto' }}>
                <StandardImage toolTip='Open Raw Image' onClick={() => { window.open(imageLink); handleModalClose(); }} className='defaultImageNudge' src={imageLink} style={{ maxWidth: '85%' }} />
            </div>
        </StandardModal>
    );
};

export const StandardCheckBox = ({ label, value, onChange, style }) => {
    return (
        <span style={{ ...style }} onClick={onChange}>
            <Form.Check
                readOnly
                type='checkbox'
                checked={value}
                style={{ display: 'inline' }}
            />
            <div style={{ display: 'inline' }}> {label}</div>
        </span>
    );
};

export const StandardDropDown = ({ onChange, label, isActive = true, style, data, value, errorMessage = 'Error', hasError = false }) => {
    const { standardBodyFontSize, fontStyle, standardSmallFontSize } = useContext(AppContext);
    const [modified, setModified] = useState(false);
    const borderLogic = modified && hasError ? { border: '1px solid red' } : {};
    const handleOnChange = (e) => {
        onChange(e);
        if (!modified) {
            setModified(true);
        }
    }
    return (
        <div style={{ ...style }}>
            <Form.Label style={{ textAlign: 'left', width: '100%', marginBottom: 0, fontSize: standardBodyFontSize, fontFamily: fontStyle }}>{label}</Form.Label>
            <Form.Control
                style={{ cursor: isActive ? 'default' : 'not-allowed', textAlign: 'left', backgroundColor: '#d9d9d9', ...borderLogic }}
                disabled={!isActive}
                as="select"
                value={value}
                onChange={handleOnChange}>
                <option>Make a selection</option>
                {
                    data.map(x => {
                        return (
                            <option key={x.id} value={x.id}>{x.name}</option>
                        )
                    })
                }
            </Form.Control>
            {
                modified && hasError && <Form.Text style={{ fontSize: standardSmallFontSize, margin: 0, color: 'red' }}>{errorMessage}</Form.Text>
            }
        </div>
    );
};

export const StandardDatePicker = ({ date, setDate, label }) => {
    const { standardBodyFontSize, fontStyle } = useContext(AppContext);
    const CustomInput = ({ value, onClick }) => (
        <>
            <Form.Label style={{ textAlign: 'left', width: '100%', marginBottom: 0, fontSize: standardBodyFontSize, fontFamily: fontStyle }}>{label}</Form.Label>
            <StandardButton style={{ paddingLeft: '15px', paddingRight: '15px' }} onClick={onClick}>{value}</StandardButton>
        </>
    );

    return (
        <DatePicker showYearDropdown selected={date} onChange={(d) => setDate(d)} customInput={<CustomInput />} />
    );
};

export const StandardTextField = ({ onChange, label, isActive = true, value, rows = 1, isPassword, style, errorMessage = 'Error', hasError = false }) => {
    const { standardBodyFontSize, fontStyle, standardSmallFontSize } = useContext(AppContext);

    const [modified, setModified] = useState(false);

    const handleOnChange = (e) => {
        onChange(e);
        if (!modified) {
            setModified(true);
        }
    }

    const borderLogic = modified && hasError ? { border: '1px solid red' } : {};

    return (
        <div style={{ ...style }}>
            <Form.Label style={{ textAlign: 'left', width: '100%', marginBottom: 0, fontSize: standardBodyFontSize, fontFamily: fontStyle }}>{label}</Form.Label>
            <Form.Control
                style={{ textAlign: 'left', cursor: isActive ? 'text' : 'not-allowed', backgroundColor: '#d9d9d9', fontSize: standardSmallFontSize, ...borderLogic }}
                size='sm'
                type={isPassword ? 'password' : 'text'}
                placeholder={label}
                disabled={!isActive}
                value={value}
                onChange={handleOnChange}
                as={rows > 1 ? 'textarea' : 'input'}
                rows={rows}
            />
            {
                modified && hasError && <Form.Text style={{ fontSize: standardSmallFontSize, margin: 0, color: 'red' }}>{errorMessage}</Form.Text>
            }
        </div>
    );
};

export const StandardImage = ({ style, noErrorMessage, src, className, onClick, onLoaded = () => { }, toolTip, overlayText }) => {
    const { standardSmallFontSize, bgColor } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const handleOnLoad = () => {
        setIsLoading(false);
        onLoaded();
    }
    const handleOnError = () => {
        setHasError(true);
        setIsLoading(false);
        onLoaded();
    }

    return (
        <>
            {isLoading &&
                <StandardSpinner />
            }
            {hasError &&
                <>
                    <XIcon style={{ fontSize: getIconSizing('medium'), color: 'red' }} />
                    <div style={{ display: noErrorMessage ? 'none' : '' }}>No image found</div>
                </>
            }
            <div style={{ position: 'relative', display: 'inline-block', alignItems: 'center' }}>
                {!hasError && !toolTip &&
                    <img onClick={onClick} className={className} src={src} style={{ ...style, display: isLoading ? 'none' : '' }} onLoad={handleOnLoad} onError={handleOnError} />
                }
                {!hasError && toolTip &&
                    <StandardTooltip text={toolTip}>
                        <img onClick={onClick} className={className} src={src} style={{ ...style, display: isLoading ? 'none' : '' }} onLoad={handleOnLoad} onError={handleOnError} />
                    </StandardTooltip>
                }
                {!hasError && !isLoading &&
                    <div className='legacyAppOverlay' style={{
                        color: getThemeColor(1), fontSize: standardSmallFontSize,
                        position: 'absolute', top: '45%', backgroundColor: bgColor,
                        pointerEvents: 'none', left: 0, right: 0
                    }}>{overlayText}</div>
                }
            </div>
        </>
    );
};

export const StandardTooltip = ({ children, text }) => {
    const { fontStyle, standardSmallFontSize } = useContext(AppContext);
    return (
        <OverlayTrigger placement='bottom' overlay={<Tooltip style={{ fontFamily: fontStyle, fontSize: standardSmallFontSize, marginTop: '1vh' }}>{text}</Tooltip>}>
            {children}
        </OverlayTrigger>
    );
};

export const StandardButton = ({ onClick, style, children, disabled = false }) => {
    const { standardBodyFontSize } = useContext(AppContext);
    return (
        <Card
            onClick={disabled ? () => { } : onClick}
            className={disabled ? 'defaultButtonDisabled' : 'defaultButton'}
            style={{
                margin: 'auto',
                ...style,
                fontSize: standardBodyFontSize,
                alignItems: 'center',
                display: 'flex',
                maxWidth: '95%'
            }}>
            {children}
        </Card>
    );
};

export const StandardIconButton = ({ icon, style, onClick, toolTip, children, disabled = false }) => {
    const padding = { padding: '2px', paddingLeft: '20px', paddingRight: '20px' };
    return (
        <StandardTooltip text={toolTip}>
            <div onClick={disabled ? () => { } : onClick} className={disabled ? 'iconButtonDisabled' : 'iconButton'} style={{ fontSize: getIconSizing(), lineHeight: 0, margin: 'auto', maxWidth: 'max-content', cursor: 'pointer', ...style, ...padding }}>
                {icon} {children}
            </div>
        </StandardTooltip>
    );
};

export const StandardAlert = ({ success = false, text, alertOpen, setAlertOpen }) => {
    const { fontStyle, standardBodyFontSize } = useContext(AppContext);
    useEffect(() => {
        if (alertOpen) {
            setTimeout(() => {
                setAlertOpen(false);
            }, 1500)
        }
    }, [alertOpen])

    return (
        <Alert style={{ position: 'fixed', zIndex: 1000000, bottom: 0, minWidth: '100%', right: 0, padding: 0, margin: 0, fontFamily: fontStyle, fontSize: standardBodyFontSize }} show={alertOpen} variant={success ? 'success' : 'danger'}>{text}</Alert>
    );
};

export const StandardSpinner = ({ style }) => {
    return (
        <Spinner style={{ margin: 'auto', color: getThemeColor(0.5), ...style }} animation='border' />
    );
};

export const StandardSeparator = ({ style, onClick }) => {
    return (
        <div onClick={onClick} style={{ ...style, display: 'inline', color: getThemeColor() }}> <em>/</em> </div>
    );
};

export const StandardCard = ({ title, style, children, className, onClick, noBorders }) => {
    const { standardBodyFontSize, standardTitleFontSize, fontStyle } = useContext(AppContext);
    return (
        <div
            onClick={onClick}
            className={className}
            style={{
                margin: 'auto',
                ...style,
                backgroundColor: 'transparent',
                fontSize: standardBodyFontSize,
                alignItems: 'center',
                border: 'none',
            }}>
            <div style={noBorders ? {} : { borderBottom: `2px solid ${getThemeColor(0.5)}`, borderTop: `2px solid ${getThemeColor(0.5)}`, minWidth: '100%', borderRadius: '25px', boxShadow: '3px 3px black', fontFamily: fontStyle }}>
                <span style={{ fontSize: standardTitleFontSize, minWidth: '100%', color: getThemeColor(1) }}>{title}</span>
                {children}
            </div>
        </div>
    );
};

export const StandardPage = ({ title = '', children, style }) => {
    const { bgColor, fontStyle, standardBodyFontSize, standardTitleFontSize } = useContext(AppContext);
    return (
        <Container style={{ backgroundColor: 'transparent', position: 'relative', minWidth: '75%', ...style }}>
            <div style={{ backgroundColor: bgColor }}>
                <div style={{ fontFamily: fontStyle, fontSize: standardTitleFontSize, backgroundColor: getThemeColor(0.5), margin: 'auto', marginTop: '4vh', padding: '5px', borderRadius: '5px', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
                    {title}
                </div>
                <div
                    style={{
                        backgroundColor: 'transparent',
                        fontFamily: fontStyle,
                        fontSize: standardBodyFontSize,
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
};

export const StandardModal = ({ modalOpen, handleModalClose, children, buttons, title, omitPadding = false }) => {
    const { bgColor, standardBodyFontSize, fontStyle, standardTitleFontSize } = useContext(AppContext);
    const bodyPadding = omitPadding ? { paddingTop: 0 } : {};
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
                    padding: '3px',
                    paddingTop: 0,
                    paddingBottom: 0,
                }}>
                    <Modal.Title style={{ fontSize: standardTitleFontSize, color: 'white', justifyContent: 'center', margin: 'auto', verticalAlign: 'middle' }}>
                        {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body
                    style={{
                        backgroundColor: 'transparent',
                        color: 'white',
                        border: `3px solid ${getThemeColor(0.5)}`,
                        borderTop: 0,
                        fontSize: standardBodyFontSize,
                        ...bodyPadding
                    }}
                >
                    {children}
                    <Modal.Footer style={{ padding: 0, marginTop: '1vh', border: 'none' }}>
                        <Container>
                            {buttons && buttons}
                        </Container>
                    </Modal.Footer>
                </Modal.Body>
            </div>
        </Modal >
    );
};


export const getThemeColor = (opacity = 1) => {
    return `rgb(79, 201, 201, ${opacity})`;
};

export const getIconSizing = (size = 'small') => {
    let largeLogic = 'calc(1px + 6vmin)';
    let smallLogic = 'calc(1px + 3vmin)';
    return size === 'large' ? largeLogic : smallLogic;
};

export const getLogoSizing = () => {
    const breakpoint = useCurrentBreakpointName();
    return breakpoint === 'xsmall' ? '15vw' : breakpoint === 'large' ? '12.5vw' : breakpoint === 'medium' ? '13.5vw' : breakpoint === 'small' ? '14.5vw' : '8vw';
};
