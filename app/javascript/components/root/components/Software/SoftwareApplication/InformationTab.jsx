import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { StandardImage, StandardCard } from '../../Utility/Utility';

const InformationTab = ({ setImageModalObj, style, app }) => {
    const { image_link, description, name } = app;
    return (
        <Row style={{ ...style }}>
            <Col xs={6} style={{ display: 'flex' }}>
                <StandardCard>
                    <StandardImage
                        className='defaultImageNudge'
                        style={{ cursor: 'pointer', maxWidth: '100%' }}
                        onClick={() => setImageModalObj({ open: true, imageLink: image_link })}
                        src={image_link}
                    />
                </StandardCard>
            </Col>
            <Col xs={6} style={{ display: 'flex' }}>
                <StandardCard title={`What is ${name}?`} style={{ margin: 'auto', verticalAlign: 'middle', minWidth:'100%' }}>
                    <div style={{ margin: 'auto', marginTop: '1vh', maxWidth: '90%', textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: description }} />
                </StandardCard>
            </Col>
        </Row >
    );
};

export default InformationTab;
