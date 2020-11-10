import React, { useState, useContext, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { AppContext } from '../../AppContext';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import XIcon from 'react-bootstrap-icons/dist/icons/x';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Alert from 'react-bootstrap/Alert';
import DatePicker from 'react-datepicker';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "react-datepicker/dist/react-datepicker.css";

export const StandardImageModal = ({ modalOpen, handleModalClose, imageLink }) => {
    const CancelButton = () => (
        <StandardButton onClick={handleModalClose}>Cancel</StandardButton>
    )
    return (
        <StandardModal buttons={<CancelButton />} title='View Image' modalOpen={modalOpen} handleModalClose={handleModalClose}>
            <div style={{ maxWidth: 'max-content', margin: 'auto' }}>
                <StandardImage onClick={() => { window.open(imageLink); handleModalClose(); }} className='defaultImageNudge' src={imageLink} style={{ maxWidth: '85%' }} />
            </div>
        </StandardModal>
    );
};

export const StandardLinkModal = ({ modalOpen, handleModalClose, children, link }) => {
    const handleLinkOpen = () => {
        window.open(link);
        handleModalClose();
    }
    const Buttons = () => (
        <Row>
            <Col>
                <StandardButton onClick={handleModalClose}>Cancel</StandardButton>
            </Col>
            <Col>
                <StandardButton onClick={handleLinkOpen}>Open</StandardButton>
            </Col>
        </Row>
    );
    return (
        <StandardModal modalOpen={modalOpen} handleModalClose={handleModalClose} title='External Link' buttons={<Buttons />}>
            {children}
        </StandardModal>
    )
}

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

export const StandardDropDown = ({ onChange, label, isActive = true, style, data, value, errorMessage = 'This field is required!', hasError = false }) => {
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

export const StandardTextField = ({ onChange, label, isActive = true, value, rows = 1, isPassword, style, errorMessage = 'This field is required!', hasError = false }) => {
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

export const StandardImage = ({ style, noErrorMessage, src, className, onClick, onLoaded = () => { }, toolTip, noLoader = false }) => {
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
            {isLoading && !noLoader &&
                <StandardSpinner />
            }
            {hasError &&
                <>
                    <XIcon style={{ fontSize: getIconSizing('medium'), color: 'red' }} />
                    <div style={{ display: noErrorMessage ? 'none' : '' }}>No image found</div>
                </>
            }
            {!hasError && !toolTip &&
                <img onClick={onClick} className={className} src={src} style={{ ...style, display: isLoading ? 'none' : '' }} onLoad={handleOnLoad} onError={handleOnError} />
            }
            {!hasError && toolTip &&
                <StandardTooltip text={toolTip}>
                    <img onClick={onClick} className={className} src={src} style={{ ...style, display: isLoading ? 'none' : '' }} onLoad={handleOnLoad} onError={handleOnError} />
                </StandardTooltip>
            }
        </>
    );
};

export const StandardTooltip = ({ children, text }) => {
    const { fontStyle, standardBodyFontSize } = useContext(AppContext);
    return (
        <OverlayTrigger placement='bottom' overlay={<Tooltip className='defaultTooltip' style={{ fontFamily: fontStyle, fontSize: standardBodyFontSize, backgroundColor: 'transparent', border: 'none', opacity: 1 }}>{text}</Tooltip>}>
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
    const padding = { padding: '3px', paddingLeft: '30px', paddingRight: '30px' };
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
            style={noBorders ? { ...style, margin: 'auto' } :
                {
                    ...style,
                    fontSize: standardBodyFontSize,
                    margin: 'auto',
                    borderBottom: `none`,
                    borderTop: `none`,
                    borderRadius: '5px',
                    boxShadow: '3px 3px 10px black',
                    fontFamily: fontStyle
                }}>
            <div style={{ fontSize: standardBodyFontSize, minWidth: '100%', color: 'white', background: getThemeBackground(), borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>{title}</div>
            {children}
        </div>
    );
};

export const StandardPage = ({ title = '', children, style }) => {
    const { bgColor, fontStyle, standardBodyFontSize, standardTitleFontSize } = useContext(AppContext);
    return (
        <Container style={{ backgroundColor: 'transparent', position: 'relative', minWidth: '75%', ...style }}>
            <div style={{ backgroundColor: bgColor, marginTop: '6vh', borderRadius: '5px', boxShadow: '3px 3px 10px black' }}>
                <div
                    style={{
                        fontFamily: fontStyle,
                        fontSize: standardBodyFontSize,
                        paddingTop: '0vh',
                        paddingBottom: '2vh',
                        borderTop: 'none',
                        paddingLeft: '0vw',
                        paddingRight: '0vw',
                        borderRadius: '5px',
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0
                    }}
                >
                    <div style={{ fontFamily: fontStyle, fontSize: standardTitleFontSize, margin: 'auto', padding: '5px', borderRadius: '5px', borderBottomLeftRadius: 0, borderBottomRightRadius: 0, background: getThemeBackground() }}>
                        {title}
                    </div>
                    {children}
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
                    background: getThemeBackground(),
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
                        boxShadow: '3px 3px 10px black',
                        borderTop: 0,
                        fontSize: standardBodyFontSize,
                        borderRadius: '5px',
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

export const getThemeBackground = () => {
    return 'linear-gradient(to top left, #5a415a, rgb(79, 201, 201, 0.5))';
}

export const getThemeColor = (opacity = 1) => {
    return `rgb(79, 201, 201, ${opacity})`;
};

export const getIconSizing = (size = 'small') => {
    let largeLogic = 'calc(1px + 3.5vmin)';
    let smallLogic = 'calc(1px + 2.5vmin)';
    return size === 'large' ? largeLogic : smallLogic;
};
