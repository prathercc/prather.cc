import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Check from 'react-bootstrap-icons/dist/icons/check';
import { AppContext } from '../../../AppContext';
import { StandardImage, StandardCard, getIconSizing } from '../../Utility/Utility';

const InformationTab = ({ setImageModalObj, style, app }) => {
    const { image_link, description, windows, linux, mac, android, name } = app;
    const appSettings = useContext(AppContext);
    const { softwareFontSize } = appSettings;

    const CompatiblityResult = ({ boolean, label }) => {
        return (
            <>
                {boolean &&
                    <>
                        <Check style={{ fontSize: getIconSizing(), color: 'rgb(0, 204, 0, 0.8)' }} />
                        <div style={{ minWidth: 'max-content' }}>{label} Compatible</div>
                    </>
                }
            </>
        );
    };

    const Compatibility = () => {
        return (
            <Container>
                <Row>
                    <Col style={{ display: windows ? '' : 'none' }}>
                        <CompatiblityResult boolean={windows} label='Windows' />
                    </Col>
                    <Col style={{ display: linux ? '' : 'none' }}>
                        <CompatiblityResult boolean={linux} label='Linux' />
                    </Col>
                    <Col style={{ display: mac ? '' : 'none' }}>
                        <CompatiblityResult boolean={mac} label='Mac' />
                    </Col>
                    <Col style={{ display: android ? '' : 'none' }}>
                        <CompatiblityResult boolean={android} label='Android' />
                    </Col>
                </Row>
            </Container>
        )
    }
    return (
        <>
            <Container>
                <Row style={{ minWidth: '100%' }}>
                    <Col>
                        <StandardImage
                            className='defaultImageNudge'
                            style={{
                                cursor: 'pointer',
                                maxWidth: '65%',
                                margin: 'auto',
                                ...style
                            }}
                            onClick={() => setImageModalObj({ open: true, imageLink: image_link })}
                            variant='top'
                            src={image_link}
                        />
                    </Col>
                </Row>
                <StandardCard title={`What is ${name}?`} style={{ marginTop: '1vh' }}>
                    <Row>
                        <Col>
                            <div style={{ margin: 'auto', maxWidth: '90%', fontSize: softwareFontSize, textAlign: 'left', marginTop: '2vh' }} dangerouslySetInnerHTML={{ __html: description }} />
                        </Col>
                    </Row>
                    <Row style={{ minWidth: '85%' }}>
                        <Col>
                            <Compatibility />
                        </Col>
                    </Row>
                </StandardCard>
            </Container>
        </>
    );
};

export default InformationTab;