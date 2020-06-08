import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../Software.css';
import { AppContext } from '../../../AppContext';
import { StandardImage, StandardCard, getThemeColor, StandardButton } from '../../Utility/Utility';
import Carousel from 'react-bootstrap/Carousel';


const FeaturesTab = ({ features, setImageModalObj, userData, style, app }) => {
    return (
        <div style={{ ...style }}>
            <Carousel interval={null} >
                {
                    features && features.map((feature, index) => {
                        return (
                            <Carousel.Item key={index} style={{ paddingBottom: '5vh' }}>
                                <SoftwareFeature
                                    setImageModalObj={setImageModalObj}
                                    index={index + 1}
                                    userData={userData}
                                    featuresLength={features?.length}
                                    descriptionObject={{
                                        image: feature.image_link,
                                        title: feature.title,
                                        description: feature.description,
                                        content_title: feature.content_title,
                                        content_description: feature.content_description,
                                        id: feature.id,
                                        application_name: feature.application_name,
                                    }} />
                            </Carousel.Item>
                        )
                    })
                }
            </Carousel>
            {
                userData && <StandardButton
                    onClick={() => window.open(`/software/admin/feature/new/${app.name}`, '_self')}
                    style={{ marginTop: '1vh' }}
                >
                    Add Feature
          </StandardButton>
            }
        </div>
    )
}

const SoftwareFeature = ({ userData, descriptionObject, index, setImageModalObj, featuresLength }) => {
    const appSettings = useContext(AppContext);
    const { softwareFontSize } = appSettings;

    const cardTitle =
        <Container>
            <Row>
                <Col>
                    {descriptionObject.title}
                </Col>
            </Row>
            <Row>
                <Col>
                    {descriptionObject.description}
                </Col>
            </Row>
            <Row>
                <Col>
                    <div style={{ color: getThemeColor(0.8), fontSize: softwareFontSize }}>Feature {index} of {featuresLength}</div>
                </Col>
            </Row>
        </Container>

    return (
        <Container>
            <Row style={{ minWidth: '100%' }}>
                <Col>
                    <StandardImage
                        className='defaultImageNudge'
                        src={descriptionObject.image}
                        onClick={() => setImageModalObj({ open: true, imageLink: descriptionObject.image })}
                        style={{ maxWidth: '65%', cursor: 'pointer', margin: 'auto', marginTop: '0.25vh' }}
                    />
                </Col>
            </Row>
            <StandardCard style={{ marginTop: '1vh' }}>
                <Row>
                    <Col style={{ display: 'flex' }}>
                        <div style={{ margin: 'auto' }}>
                            {cardTitle}
                        </div>
                    </Col>
                </Row>
                <Row style={{ marginTop: '1vh', textAlign: 'left' }}>
                    <Col>
                        <div style={{ margin: 'auto', maxWidth: '90%', fontSize: softwareFontSize, textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: descriptionObject.content_description }} />
                    </Col>
                </Row>
            </StandardCard>

            {
                userData &&
                <StandardButton style={{ marginTop: '1vh' }}
                    onClick={() => window.open(`/software/admin/feature/edit/${descriptionObject.application_name}/${descriptionObject.id}`, '_self')}>
                    Edit </StandardButton>
            }

        </Container>
    );
};

export default FeaturesTab;