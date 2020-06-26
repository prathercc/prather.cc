import React, { useContext } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { AppContext } from '../../../AppContext';
import { StandardImage, StandardCard, getThemeColor } from '../../Utility/Utility';

const InformationTab = ({ setImageModalObj, style, app }) => {
    const { image_link, description, name } = app;
    const appSettings = useContext(AppContext);
    const { softwareFontSize } = appSettings;
    return (
        <>
            <Row style={{ ...style }}>
                <Col xs={6} style={{ display: 'flex' }}>
                    <StandardCard style={{ maxWidth: '100%', width: 'max-content', padding: '2px', margin: 'auto', verticalAlign: 'middle' }}>
                        <StandardImage
                            className='defaultImageNudge'
                            style={{ cursor: 'pointer', maxWidth: '100%', margin: 'auto' }}
                            onClick={() => setImageModalObj({ open: true, imageLink: image_link })}
                            variant='top'
                            src={image_link}
                        />
                    </StandardCard>
                </Col>
                <Col xs={6} style={{ display: 'flex' }}>
                    <StandardCard title={<i>What is {name}?</i>} style={{ margin: 'auto', outline: `1px solid ${getThemeColor(0.25)}`, verticalAlign: 'middle', minWidth: '100%' }}>
                        <div style={{ margin: 'auto', maxWidth: '90%', fontSize: softwareFontSize, textAlign: 'left', marginTop: '1vh' }} dangerouslySetInnerHTML={{ __html: description }} />
                    </StandardCard>
                </Col>
            </Row >
        </>
    );
};

export default InformationTab;