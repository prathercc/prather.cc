import React, { useState, useEffect } from 'react';
import { StandardImage, StandardCard, getThemeColor } from '../../Utility/Utility';
import { Row, Col } from 'antd';

const InformationTab = ({ style, app }) => {
    const { description } = app;
    const [loadingObj, setLoadingObj] = useState({ content: false, image: false });

    useEffect(() => {
        if (app)
            setLoadingObj({ ...loadingObj, content: true })
    }, [app]);

    const allContentLoaded = loadingObj.content && loadingObj.image;

    return (
        <Row style={{ ...style }}>
            <Col xs={18} style={{ display: allContentLoaded ? 'flex' : 'none' }}>
                <StandardCard title={`Application Summary`} style={{ verticalAlign: 'middle', width: '95%', paddingBottom: '1vh' }}>
                    <div style={{ margin: 'auto', maxWidth: '90%', textAlign: 'left', marginTop: '1vh' }} dangerouslySetInnerHTML={{ __html: description }} />
                </StandardCard>
            </Col>
            <Col xs={6} sm={allContentLoaded ? 6 : 24} style={{ display: 'flex', marginBottom: '1vh' }}>
                <StandardCard noBorders style={{ verticalAlign: 'middle', maxWidth: '85%', color: getThemeColor(1) }}>
                    <StandardImage
                        style={{ maxWidth: '180px', width: '95%', borderRadius: '15px', pointerEvents: 'none', minWidth: '10px' }}
                        className='siteLogo'
                        src={app && app.icon_link}
                        onLoaded={() => setLoadingObj({ ...loadingObj, image: true })}
                    />
                </StandardCard>
            </Col>
        </Row >
    );
};

export default InformationTab;
