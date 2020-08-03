import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { StandardImage, StandardCard, StandardModal, StandardTextField, StandardIconButton, StandardButton } from '../../Utility/Utility';
import Carousel from 'react-bootstrap/Carousel';
import RightArrow from 'react-bootstrap-icons/dist/icons/arrow-right';
import LeftArrow from 'react-bootstrap-icons/dist/icons/arrow-left';
import Edit from 'react-bootstrap-icons/dist/icons/pencil';
import Add from 'react-bootstrap-icons/dist/icons/file-plus';
import { fetchFeatures, putFeature, deleteFeature, postFeature } from '../../../featureService';

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
                            <Carousel.Item key={index} style={{ paddingTop: '0.25vh' }}>
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

            <Row style={{ maxWidth: '60%', margin: 'auto', display: features?.length > 0 ? '' : 'none', marginTop: '1vh' }}>
                <Col>
                    <StandardIconButton toolTip='Previous' icon={<LeftArrow />} onClick={() => setCaroselIndex(caroselIndex === 0 ? features?.length - 1 : caroselIndex - 1)} />
                </Col>
                <Col style={{ paddingTop: '1vh' }}>
                    {caroselIndex + 1} of {features?.length}
                </Col>
                <Col>
                    <StandardIconButton toolTip='Next' icon={<RightArrow />} onClick={() => setCaroselIndex(caroselIndex === features?.length - 1 ? 0 : caroselIndex + 1)} />
                </Col>
            </Row>
            {features?.length === 0 && 'No features found'}
            {userData && <EditFeature displayAlert={displayAlert} setFeatures={setFeatures} app={app} />}
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
            <Col md={12} lg={allContentLoaded ? 5 : 12} style={{ display: 'flex', marginBottom: '1vh' }}>
                <StandardCard noBorders style={{ verticalAlign: 'middle', margin: 'auto', maxWidth: '85%' }}>
                    <StandardImage
                        toolTip='Expand Image'
                        className='defaultImageNudge'
                        src={feature.image_link}
                        onClick={() => setImageModalObj({ open: true, imageLink: feature.image_link })}
                        style={{ maxWidth: '100%' }}
                        onLoaded={() => setLoadingObj({ ...loadingObj, image: true })}
                    />
                </StandardCard>
            </Col>
            <Col md={12} lg={7} style={{ display: allContentLoaded ? 'flex' : 'none' }}>
                <StandardCard title={feature.title} style={{ margin: 'auto', verticalAlign: 'middle', minWidth: '100%' }}>
                    <div style={{ margin: 'auto', maxWidth: '95%', textAlign: 'center', marginTop: '1vh' }} dangerouslySetInnerHTML={{ __html: feature.content_description }} />
                    {userData && <EditFeature displayAlert={displayAlert} app={app} setFeatures={setFeatures} feature={feature} />}
                </StandardCard>
            </Col>
        </Row >
    );
};

const EditFeature = ({ feature, setFeatures, app: { id, name }, displayAlert }) => {
    const blankFeature = { title: '', image_link: '', content_description: '', application_name: name, software_id: id };
    const [modalOpen, setModalOpen] = useState(false);
    const [activeFeature, setActiveFeature] = useState(feature ? feature : blankFeature);
    const saveButtonEnabled = activeFeature.title.length > 0 && activeFeature.content_description.length > 0 && activeFeature.application_name.length > 0;

    const handleCreateFeature = async () => {
        if (saveButtonEnabled) {
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
        }
        else {
            displayAlert('Complete the form and try again', false);
        }
    };

    const handleEditFeature = async () => {
        if (saveButtonEnabled) {
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
        }
        else {
            displayAlert('Complete the form and try again', false);
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
            <StandardButton style={{ maxWidth: 'max-content', paddingLeft: '15px', paddingRight: '15px' }} onClick={() => handleCreateFeature()}>Save</StandardButton>
        );
    };

    return (
        <>
            {feature && <StandardIconButton onClick={() => setModalOpen(true)} toolTip='Edit Feature' style={{ marginBottom: '1vh' }} icon={<Edit />} />}
            {!feature && <StandardIconButton onClick={() => setModalOpen(true)} toolTip='Add Feature' style={{ marginTop: '1vh' }} icon={<Add />} />}
            <StandardModal title={`Feature Alteration - ${feature ? 'Modify' : 'Create'}`} buttons={feature ? <EditButtons /> : <CreateButtons />} modalOpen={modalOpen} handleModalClose={() => setModalOpen(false)}>
                <Form.Group style={{ width: '95%', margin: 'auto', padding: '10px', paddingTop: '5px' }}>
                    <StandardTextField value={activeFeature.application_name} isActive={false} label='Application Name' onChange={(e) => setActiveFeature({ ...activeFeature, application_name: e.target.value })} />
                    <StandardTextField value={activeFeature.title} label='Feature Title' onChange={(e) => setActiveFeature({ ...activeFeature, title: e.target.value })} />
                    <StandardTextField value={activeFeature.image_link} label='Image Link' onChange={(e) => setActiveFeature({ ...activeFeature, image_link: e.target.value })} />
                    <StandardTextField rows={8} value={activeFeature.content_description} label='Content Description' onChange={(e) => setActiveFeature({ ...activeFeature, content_description: e.target.value })} />
                </Form.Group>
            </StandardModal>
        </>
    );
};

export default FeaturesTab;
