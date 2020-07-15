import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { StandardImage, StandardCard, StandardButton, StandardModal, getIconSizing, StandardTextField, getThemeColor } from '../../Utility/Utility';
import Carousel from 'react-bootstrap/Carousel';
import RightArrow from 'react-bootstrap-icons/dist/icons/arrow-right';
import LeftArrow from 'react-bootstrap-icons/dist/icons/arrow-left';
import Edit from 'react-bootstrap-icons/dist/icons/pencil';
import Add from 'react-bootstrap-icons/dist/icons/plus-circle';
import { fetchFeatures, putFeature, deleteFeature, postFeature } from '../../../featureService';

const FeaturesTab = ({ setImageModalObj, userData, style, app }) => {
    const [caroselIndex, setCaroselIndex] = useState(0);
    const [features, setFeatures] = useState(null);
    useEffect(() => {
        const featureFetch = async () => {
            await fetchFeatures(app.id, setFeatures);
        };
        setCaroselIndex(0);
        setFeatures(null);
        featureFetch();
    }, [app]);

    useEffect(() => {
        if (features)
            setCaroselIndex(0);
    }, [features])

    return (
        <div style={{ ...style }}>
            <Carousel indicators={false} activeIndex={caroselIndex} onSelect={(index) => setCaroselIndex(index)} controls={false} interval={null}>
                {
                    features?.map((feature, index) => {
                        return (
                            <Carousel.Item key={index} style={{ paddingTop: '0.25vh' }}>
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

            <Row style={{ maxWidth: '60%', margin: 'auto', display: features?.length > 0 ? '' : 'none' }}>
                <Col>
                    <StandardButton icon={<LeftArrow style={{ fontSize: getIconSizing() }} />} onClick={() => setCaroselIndex(caroselIndex === 0 ? features?.length - 1 : caroselIndex - 1)}>Left</StandardButton>
                </Col>
                <Col style={{ paddingTop: '1vh' }}>
                    {caroselIndex + 1} of {features?.length}
                </Col>
                <Col>
                    <StandardButton icon={<RightArrow style={{ fontSize: getIconSizing() }} />} onClick={() => setCaroselIndex(caroselIndex === features?.length - 1 ? 0 : caroselIndex + 1)}>Right</StandardButton>
                </Col>
            </Row>
            {features?.length === 0 && 'No features found'}
            {userData && <EditFeature setFeatures={setFeatures} app={app} />}
        </div>
    )
}

const SoftwareFeature = ({ userData, setImageModalObj, feature, setFeatures, app }) => {
    return (
        <Row>
            <Col xs={12} md={6} style={{ display: 'flex', margin: 'auto', marginBottom: '1vh', maxWidth: '75%' }}>
                <StandardCard noBorders>
                    <StandardImage
                        className='defaultImageNudge'
                        src={feature.image_link}
                        onClick={() => setImageModalObj({ open: true, imageLink: feature.image_link })}
                        style={{ maxWidth: '100%', cursor: 'pointer' }}
                    />
                </StandardCard>
            </Col>
            <Col xs={12} md={6} style={{ display: 'flex' }}>
                <StandardCard title={feature.title} style={{ margin: 'auto', verticalAlign: 'middle', minWidth: '100%' }}>
                    <div style={{ margin: 'auto', maxWidth: '95%', textAlign: 'left', marginTop: '1vh' }} dangerouslySetInnerHTML={{ __html: feature.content_description }} />
                    {userData && <EditFeature app={app} setFeatures={setFeatures} feature={feature} />}
                </StandardCard>
            </Col>
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
        setFeatures(null);
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
            <StandardButton icon={feature ? <Edit style={{ fontSize: getIconSizing('small'), marginBottom: '1vh' }} /> : <Add style={{ fontSize: getIconSizing('small') }} />} onClick={() => setModalOpen(true)} />
            <StandardModal title={`Feature Alteration - ${feature ? 'Modify' : 'Create'}`} buttons={feature ? <EditButtons /> : <CreateButtons />} modalOpen={modalOpen} handleModalClose={() => setModalOpen(false)}>
                <Form.Group style={{ width: '95%', margin: 'auto', padding: '10px', paddingTop: '5px' }}>
                    <StandardTextField value={activeFeature.application_name} isActive={false} label='Application Name' onChange={(e) => setActiveFeature({ ...activeFeature, application_name: e.target.value })} />
                    <StandardTextField value={activeFeature.title} label='Feature Title' onChange={(e) => setActiveFeature({ ...activeFeature, title: e.target.value })} />
                    <StandardTextField value={activeFeature.image_link} label='Image Link' onChange={(e) => setActiveFeature({ ...activeFeature, image_link: e.target.value })} />
                    <StandardTextField rows={8} value={activeFeature.content_description} label='Content Description' onChange={(e) => setActiveFeature({ ...activeFeature, content_description: e.target.value })} />
                </Form.Group>
            </StandardModal>
        </>
    )
}

export default FeaturesTab;