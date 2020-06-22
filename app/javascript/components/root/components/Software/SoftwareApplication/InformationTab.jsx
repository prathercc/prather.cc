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
            <StandardCard style={{ maxWidth: '60%', width: 'max-content', padding: '5px', marginBottom: '1vh', marginTop: '1vh' }}>
                <StandardImage
                    className='defaultImageNudge'
                    style={{
                        cursor: 'pointer',
                        maxWidth: '100%',
                        margin: 'auto',
                        ...style
                    }}
                    onClick={() => setImageModalObj({ open: true, imageLink: image_link })}
                    variant='top'
                    src={image_link}
                />
            </StandardCard>
            <StandardCard>
                <div style={{ fontSize: standardCardTitleFontSize, }}>
                    <i>What is {name}?</i>
                </div>
                <div style={{ margin: 'auto', maxWidth: '90%', fontSize: softwareFontSize, textAlign: 'left', marginTop: '1vh' }} dangerouslySetInnerHTML={{ __html: description }} />
            </StandardCard>
        </>
    );
};

export default InformationTab;