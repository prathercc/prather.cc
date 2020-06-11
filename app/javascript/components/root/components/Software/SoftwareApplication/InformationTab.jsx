import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { AppContext } from '../../../AppContext';
import { StandardImage, StandardCard, getThemeColor } from '../../Utility/Utility';

const InformationTab = ({ setImageModalObj, style, app }) => {
    const { image_link, description, name } = app;
    const appSettings = useContext(AppContext);
    const { softwareFontSize, standardCardTitleFontSize } = appSettings;
    return (
        <>
            <Container>
                <StandardCard style={{ marginTop: '1vh', maxWidth: '100%' }}>
                    <Row style={{ minWidth: '100%', marginTop: '1vh' }}>
                        <Col>
                            <StandardImage
                                className='defaultImageNudge'
                                style={{
                                    cursor: 'pointer',
                                    maxWidth: '55%',
                                    margin: 'auto',
                                    ...style
                                }}
                                onClick={() => setImageModalObj({ open: true, imageLink: image_link })}
                                variant='top'
                                src={image_link}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ marginTop: '1vh', fontSize: standardCardTitleFontSize, color: getThemeColor(1) }}>{`What is ${name}?`}</Col>
                    </Row>
                    <Row>
                        <Col>
                            <div style={{ margin: 'auto', maxWidth: '90%', fontSize: softwareFontSize, textAlign: 'left', marginTop: '1vh' }} dangerouslySetInnerHTML={{ __html: description }} />
                        </Col>
                    </Row>
                </StandardCard>
            </Container>
        </>
    );
};

export default InformationTab;