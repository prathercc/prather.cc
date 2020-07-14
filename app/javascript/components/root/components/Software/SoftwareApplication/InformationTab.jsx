import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { StandardImage, StandardCard } from '../../Utility/Utility';

const InformationTab = ({ setImageModalObj, style, app }) => {
    const { image_link, description, name } = app;
    return (
        <Row style={{ ...style }}>
            <Col xs={12} md={6} style={{ display: 'flex', maxWidth: '75%', margin: 'auto', marginBottom: '1vh' }}>
                <StandardCard noBorders>
                    <StandardImage
                        className='defaultImageNudge'
                        style={{ cursor: 'pointer', maxWidth: '100%' }}
                        onClick={() => setImageModalObj({ open: true, imageLink: image_link })}
                        src={image_link}
                    />
                </StandardCard>
            </Col>
            <Col xs={12} md={6} style={{ display: 'flex' }}>
                <StandardCard title={`Brief Description`} style={{ margin: 'auto', verticalAlign: 'middle', minWidth: '100%' }}>
                    <div style={{ margin: 'auto', marginTop: '1vh', maxWidth: '90%', textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: description }} />
                </StandardCard>
            </Col>
        </Row >
    );
};

export default InformationTab;
