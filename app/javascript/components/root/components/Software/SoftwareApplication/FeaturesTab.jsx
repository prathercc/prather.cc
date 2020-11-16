import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { StandardImage, StandardCard, StandardModal, StandardTextField, StandardIconButton, StandardButton } from '../../Utility/Utility';
import Carousel from 'react-bootstrap/Carousel';
import { fetchFeatures, putFeature, deleteFeature, postFeature } from '../../../featureService';
import { MDBIcon } from "mdbreact";
import { Row, Col } from 'antd';

const FeaturesTab = ({ setImageModalObj, userData, style, app, displayAlert }) => {
    const [caroselIndex, setCaroselIndex] = useState(0);
    const [features, setFeatures] = useState(null);
    useEffect(() => {
        const featureFetch = async () => {
            const { data } = await fetchFeatures(app.id);
            setFeatures(data);
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
                            <Carousel.Item key={index} style={{ paddingTop: '0.25vh', paddingBottom: '2vh' }}>
                                <SoftwareFeature
                                    app={app}
                                    setImageModalObj={setImageModalObj}
                                    userData={userData}
                                    feature={feature}
                                    setFeatures={setFeatures}
                                    displayAlert={displayAlert} />
                            </Carousel.Item>
                        )
                    })
                }
            </Carousel>

            <Row style={{ margin: 'auto', display: features?.length > 0 ? '' : 'none' }}>
                <Col xs={10}>
                    <StandardIconButton toolTip='Previous' icon={<MDBIcon icon="arrow-left" />} onClick={() => setCaroselIndex(caroselIndex === 0 ? features?.length - 1 : caroselIndex - 1)} />
                </Col>
                <Col xs={4} style={{ paddingTop: '1vh' }}>
                    {caroselIndex + 1} of {features?.length}
                </Col>
                <Col xs={10}>
                    <StandardIconButton toolTip='Next' icon={<MDBIcon icon="arrow-right" />} onClick={() => setCaroselIndex(caroselIndex === features?.length - 1 ? 0 : caroselIndex + 1)} />
                </Col>
            </Row>
            {features?.length === 0 && 'No features found'}
            {userData?.group === 'Administrator' && <EditFeature displayAlert={displayAlert} setFeatures={setFeatures} app={app} />}
        </div>
    );
};

const SoftwareFeature = ({ userData, setImageModalObj, feature, setFeatures, app, displayAlert }) => {
    const [loadingObj, setLoadingObj] = useState({ content: false, image: false });

    useEffect(() => {
        if (feature)
            setLoadingObj({ ...loadingObj, content: true })
    }, [feature]);

    const allContentLoaded = loadingObj.content && loadingObj.image;

    return (
        <Row>
            <Col md={24} lg={allContentLoaded ? 10 : 24} style={{ display: 'flex', marginBottom: '1vh' }}>
                <StandardCard noBorders style={{ verticalAlign: 'middle', margin: 'auto', maxWidth: '85%' }}>
                    <StandardImage
                        className='defaultImageNudge'
                        src={feature.image_link}
                        onClick={() => setImageModalObj({ open: true, imageLink: feature.image_link })}
                        style={{ maxWidth: '100%' }}
                        onLoaded={() => setLoadingObj({ ...loadingObj, image: true })}
                        overlayText={app.is_legacy ? 'No Longer In Development' : ''}
                    />
                </StandardCard>
            </Col>
            <Col md={24} lg={14} style={{ display: allContentLoaded ? 'flex' : 'none' }}>
                <StandardCard title={feature.title} style={{ verticalAlign: 'middle', width: '95%' }}>
                    <div style={{ margin: 'auto', maxWidth: '95%', textAlign: 'left', marginTop: '1vh' }} dangerouslySetInnerHTML={{ __html: feature.content_description }} />
                    {userData?.group === 'Administrator' && <EditFeature displayAlert={displayAlert} app={app} setFeatures={setFeatures} feature={feature} />}
                </StandardCard>
            </Col>
        </Row >
    );
};

const EditFeature = ({ feature, setFeatures, app: { id, name }, displayAlert }) => {
    const blankFeature = { title: '', image_link: '', content_description: '', application_name: name, software_id: id };
    const [modalOpen, setModalOpen] = useState(false);
    const [activeFeature, setActiveFeature] = useState(feature ? feature : blankFeature);
    const saveButtonDisabled = activeFeature.title.length === 0 || activeFeature.content_description.length === 0 ||
        activeFeature.application_name.length === 0 || activeFeature.application_name.length === 0;

    const handleCreateFeature = async () => {
        const { data } = await postFeature(activeFeature);
        if (data) {
            const { data } = await fetchFeatures(id);
            setFeatures(data);
            setActiveFeature(blankFeature);
            setModalOpen(false);
            displayAlert('Feature created successfully', true);
        }
        else {
            displayAlert('Network error occured while creating feature', false);
        }
    };

    const handleEditFeature = async () => {
        const { data } = await putFeature(activeFeature);
        if (data) {
            const { data } = await fetchFeatures(id);
            setFeatures(data);
            setModalOpen(false);
            displayAlert('Feature saved successfully', true);
        }
        else {
            displayAlert('Network error occured while saving feature', false);
        }
    };

    const handleDeleteFeature = async () => {
        const { data } = await deleteFeature(activeFeature.id);
        if (data) {
            setFeatures(null);
            const { data } = await fetchFeatures(id);
            setFeatures(data);
            setModalOpen(false);
            displayAlert('Feature deleted successfully', true);
        }
        else {
            displayAlert('Network error occured while deleting feature', false);
        }
    };

    const EditButtons = () => {
        return (
            <Row>
                <Col span={8}>
                    <StandardButton onClick={() => setModalOpen(false)}>Cancel</StandardButton>
                </Col>
                <Col span={8}>
                    <StandardButton onClick={handleDeleteFeature}>Delete</StandardButton>
                </Col>
                <Col span={8}>
                    <StandardButton disabled={saveButtonDisabled} onClick={handleEditFeature}>Save</StandardButton>
                </Col>
            </Row>
        );
    };

    const CreateButtons = () => {
        return (
            <Row>
                <Col span={12}>
                    <StandardButton onClick={() => setModalOpen(false)}>Cancel</StandardButton>
                </Col>
                <Col span={12}>
                    <StandardButton disabled={saveButtonDisabled} style={{ maxWidth: 'max-content', paddingLeft: '15px', paddingRight: '15px' }} onClick={() => handleCreateFeature()}>Save</StandardButton>
                </Col>
            </Row>
        );
    };

    return (
        <>
            {feature && <StandardIconButton onClick={() => setModalOpen(true)} toolTip='Edit Feature' style={{ marginBottom: '1vh' }} icon={<MDBIcon icon="pencil-alt" />} />}
            {!feature && <StandardIconButton onClick={() => setModalOpen(true)} toolTip='Add Feature' style={{ marginTop: '1vh' }} icon={<MDBIcon icon="plus" />} />}
            <StandardModal title={`Feature Alteration - ${feature ? 'Modify' : 'Create'}`} buttons={feature ? <EditButtons /> : <CreateButtons />} modalOpen={modalOpen} handleModalClose={() => setModalOpen(false)}>
                <Form.Group style={{ width: '95%', margin: 'auto', padding: '10px', paddingTop: '5px' }}>
                    <StandardTextField hasError={activeFeature.application_name.length === 0} value={activeFeature.application_name} isActive={false} label='Application Name' onChange={(e) => setActiveFeature({ ...activeFeature, application_name: e.target.value })} />
                    <StandardTextField hasError={activeFeature.title.length === 0} value={activeFeature.title} label='Feature Title' onChange={(e) => setActiveFeature({ ...activeFeature, title: e.target.value })} />
                    <StandardTextField hasError={activeFeature.image_link.length === 0} value={activeFeature.image_link} label='Image Link' onChange={(e) => setActiveFeature({ ...activeFeature, image_link: e.target.value })} />
                    <StandardTextField hasError={activeFeature.content_description.length === 0} rows={8} value={activeFeature.content_description} label='Content Description' onChange={(e) => setActiveFeature({ ...activeFeature, content_description: e.target.value })} />
                </Form.Group>
            </StandardModal>
        </>
    );
};

export default FeaturesTab;
