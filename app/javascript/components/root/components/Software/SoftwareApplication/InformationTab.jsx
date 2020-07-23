import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { StandardImage, StandardCard } from '../../Utility/Utility';

const InformationTab = ({ setImageModalObj, style, app }) => {
    const { image_link, description } = app;
    const [loadingObj, setLoadingObj] = useState({ content: false, image: false });

    useEffect(() => {
        if (app)
            setLoadingObj({ ...loadingObj, content: true })
    }, [app]);

    const allContentLoaded = loadingObj.content && loadingObj.image;

    return (
        <Row style={{ ...style }}>
            <Col md={12} lg={allContentLoaded ? 6 : 12} style={{ display: 'flex', marginBottom: '1vh' }}>
                <StandardCard noBorders style={{ verticalAlign: 'middle', margin: 'auto', maxWidth: '75%' }}>
                    <StandardImage
                        className='defaultImageNudge'
                        style={{ maxWidth: '100%' }}
                        onClick={() => setImageModalObj({ open: true, imageLink: image_link })}
                        src={image_link}
                        onLoaded={() => setLoadingObj({ ...loadingObj, image: true })}
                    />
                </StandardCard>
            </Col>
            <Col md={12} lg={6} style={{ display: allContentLoaded ? 'flex' : 'none' }}>
                <StandardCard title={`Brief Description`} style={{ margin: 'auto', verticalAlign: 'middle', minWidth: '100%' }}>
                    <div style={{ margin: 'auto', marginTop: '1vh', maxWidth: '90%', textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: description }} />
                </StandardCard>
            </Col>
        </Row >
    );
};

export default InformationTab;
