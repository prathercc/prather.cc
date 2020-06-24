import React, { useContext, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { AppContext } from '../../../AppContext';
import { StandardImage, StandardCard, StandardButton, StandardModal, getIconSizing, StandardTextField, getThemeColor } from '../../Utility/Utility';
import Carousel from 'react-bootstrap/Carousel';
import RightArrow from 'react-bootstrap-icons/dist/icons/arrow-right';
import LeftArrow from 'react-bootstrap-icons/dist/icons/arrow-left';
import { fetchFeatures, putFeature, deleteFeature, postFeature } from '../../../featureService';

const FeaturesTab = ({ setImageModalObj, userData, style, app }) => {
    const [caroselIndex, setCaroselIndex] = useState(0);
    const [features, setFeatures] = useState(null);
    useEffect(() => {
        const featureFetch = async () => {
            setCaroselIndex(0);
            await fetchFeatures(app.id, setFeatures);
        };
        featureFetch();
    }, [app]);
    return (
        <div style={{ ...style }}>
            <Carousel activeIndex={caroselIndex} onSelect={(index) => setCaroselIndex(index)} controls={false} interval={null}>
                {
                    features && features.map((feature, index) => {
                        return (
                            <Carousel.Item key={index} style={{ paddingBottom: '5vh' }}>
                                <SoftwareFeature
                                    app={app}
                                    setImageModalObj={setImageModalObj}
                                    userData={userData}
                                    feature={feature}
                                    setFeatures={setFeatures} />
                            </Carousel.Item>
                        )
                    })
                }
            </Carousel>
            <Row style={{ maxWidth: '60%', margin: 'auto' }}>
                <Col>
                    <StandardButton icon={<LeftArrow style={{ fontSize: getIconSizing() }} />} onClick={() => setCaroselIndex(caroselIndex === 0 ? features?.length - 1 : caroselIndex - 1)}>Left</StandardButton>
                </Col>
                <Col>
                    {caroselIndex + 1}/{features?.length}
                </Col>
                <Col>
                    <StandardButton icon={<RightArrow style={{ fontSize: getIconSizing() }} />} onClick={() => setCaroselIndex(caroselIndex === features?.length - 1 ? 0 : caroselIndex + 1)}>Right</StandardButton>
                </Col>
            </Row>
            {userData && <EditFeature setFeatures={setFeatures} app={app} />}
        </div>
    )
}

const SoftwareFeature = ({ userData, setImageModalObj, feature, setFeatures, app }) => {
    const appSettings = useContext(AppContext);
    const { softwareFontSize, standardCardTitleFontSize } = appSettings;

    return (
        <Row style={{ width: '99%', margin: 'auto', marginTop: '0.25vh' }}>
            <Col xs={6} style={{ display: 'flex' }}>
                <StandardCard style={{ maxWidth: '100%', width: 'max-content', padding: '2px', margin: 'auto', verticalAlign: 'middle' }}>
                    <StandardImage
                        className='defaultImageNudge'
                        src={feature.image_link}
                        onClick={() => setImageModalObj({ open: true, imageLink: feature.image_link })}
                        style={{ maxWidth: '100%', cursor: 'pointer', margin: 'auto' }}
                    />
                </StandardCard>
            </Col>
            <Col xs={6} style={{ display: 'flex' }}>
                <StandardCard style={{ margin: 'auto', outline: `1px solid ${getThemeColor(0.5)}`, verticalAlign: 'middle', minWidth: '100%', height: '100%' }}>
                    <div style={{ fontSize: standardCardTitleFontSize }}>
                        <div>
                            <i>{feature.title}</i>
                        </div>
                    </div>
                    <div style={{ margin: 'auto', maxWidth: '95%', fontSize: softwareFontSize, textAlign: 'left', marginTop: '1vh' }} dangerouslySetInnerHTML={{ __html: feature.content_description }} />
                </StandardCard>
            </Col>


            {userData && <EditFeature app={app} setFeatures={setFeatures} feature={feature} />}
        </Row >
    );
};

const EditFeature = ({ feature, setFeatures, app: { id, name } }) => {
    const blankFeature = { title: '', image_link: '', content_description: '', application_name: name, software_id: id };
    const [modalOpen, setModalOpen] = useState(false);
    const [activeFeature, setActiveFeature] = useState(feature ? feature : blankFeature);

    const handleCreateFeature = async () => {
        await postFeature(activeFeature);
        await fetchFeatures(id, setFeatures);
        setActiveFeature(blankFeature);
        setModalOpen(false);
    };
    const handleEditFeature = async () => {
        await putFeature(activeFeature);
        await fetchFeatures(id, setFeatures);
        setModalOpen(false);
    };
    const handleDeleteFeature = async () => {
        await deleteFeature(activeFeature.id);
        await fetchFeatures(id, setFeatures);
        setModalOpen(false);
    };

    const EditButtons = () => {
        return (
            <Container>
                <Row>
                    <Col>
                        <StandardButton onClick={() => handleEditFeature()}>Save</StandardButton>
                    </Col>
                    <Col>
                        <StandardButton onClick={() => handleDeleteFeature()}>Delete</StandardButton>
                    </Col>
                </Row>
            </Container>
        );
    };

    const CreateButtons = () => {
        return (
            <StandardButton isActive={activeFeature.title.length > 0} onClick={() => handleCreateFeature()}>Create</StandardButton>
        );
    };

    return (
        <>
            <StandardButton style={{ marginTop: '1vh', minWidth: '75%' }} onClick={() => setModalOpen(true)}>
                {feature ? 'Edit' : 'Add Feature'}
            </StandardButton>
            <StandardModal buttons={feature ? <EditButtons /> : <CreateButtons />} modalOpen={modalOpen} handleModalClose={() => setModalOpen(false)}>
                <StandardCard title={feature ? 'Modify Feature' : 'Create Feature'}>
                    <Form.Group style={{ width: '95%', margin: 'auto' }}>
                        <StandardTextField value={activeFeature.application_name} isActive={false} label='Application Name' onChange={(e) => setActiveFeature({ ...activeFeature, application_name: e.target.value })} />
                        <StandardTextField value={activeFeature.title} label='Feature Title' onChange={(e) => setActiveFeature({ ...activeFeature, title: e.target.value })} />
                        <StandardTextField value={activeFeature.image_link} label='Image Link' onChange={(e) => setActiveFeature({ ...activeFeature, image_link: e.target.value })} />
                        <StandardTextField rows={8} value={activeFeature.content_description} label='Content Description' onChange={(e) => setActiveFeature({ ...activeFeature, content_description: e.target.value })} />
                    </Form.Group>
                </StandardCard>
            </StandardModal>
        </>
    )
}

export default FeaturesTab;