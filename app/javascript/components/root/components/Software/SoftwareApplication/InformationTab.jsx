import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { StandardImage, StandardCard, getThemeColor } from '../../Utility/Utility';

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
            <Col xs={12} sm={allContentLoaded ? 5 : 12} style={{ display: 'flex', marginBottom: '1vh' }}>
                <StandardCard noBorders style={{ verticalAlign: 'middle', maxWidth: '85%', color: getThemeColor(1) }}>
                    <StandardImage
                        className='defaultImageNudge'
                        style={{ maxWidth: '100%' }}
                        onClick={() => setImageModalObj({ open: true, imageLink: image_link })}
                        src={image_link}
                        onLoaded={() => setLoadingObj({ ...loadingObj, image: true })}
                        overlayText={app.is_legacy ? 'No Longer In Development' : ''}
                    />
                </StandardCard>
            </Col>
            <Col xs={12} sm={7} style={{ display: allContentLoaded ? 'flex' : 'none' }}>
                <StandardCard title={`Application Summary`} style={{ verticalAlign: 'middle', width: '95%', paddingBottom: '1vh' }}>
                    <div style={{ margin: 'auto', maxWidth: '90%', textAlign: 'left', marginTop: '1vh' }} dangerouslySetInnerHTML={{ __html: description }} />
                </StandardCard>
            </Col>
        </Row >
    );
};

export default InformationTab;
