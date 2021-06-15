import React, { useState, useEffect } from "react";
import {
  StandardImage,
  StandardCard,
  StandardModal,
  StandardIconButton,
  StandardButton,
  toggleNotification,
} from "../../Utility/Utility";
import {
  fetchFeatures,
  putFeature,
  deleteFeature,
  postFeature,
} from "../../../featureService";
import { Row, Col, Carousel, Form, Input } from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";

const FeatureModal = ({
  featureId,
  app: { name, id },
  handleModalClose,
  modalOpen,
}) => {
  const [feature, setFeature] = useState({
    title: "",
    image_link: "",
    content_description: "",
    application_name: name,
    software_id: id,
  });

  useEffect(() => {
    const fetchExistingFeature = async () => {
      try {
        const { data } = await fetchFeatures(id);
        const selectedFeature = data.find((x) => x.id === id);
        setFeature(selectedFeature);
      } catch (e) {
        toggleNotification(
          "error",
          "Failure",
          `Failed to find feature with id: ${featureId} and software_id: ${id}`
        );
      }
    };
    featureId && fetchExistingFeature();
  }, [featureId]);

  const saveButtonDisabled =
    feature.title.length === 0 ||
    feature.content_description.length === 0 ||
    feature.application_name.length === 0 ||
    feature.application_name.length === 0;
  const [form] = Form.useForm();
  const handleCreateFeature = async () => {
    try {
      await postFeature(feature);
      toggleNotification("success", "Success", "Successfully created feature!");
      handleModalClose();
    } catch (e) {
      toggleNotification("error", "Failure", "Failed to create feature!");
    }
  };

  const handleEditFeature = async () => {
    try {
      await putFeature(feature);
      toggleNotification("success", "Success", "Successfully saved feature!");
      handleModalClose();
    } catch (e) {
      toggleNotification("error", "Failure", "Failed save feature!");
    }
  };

  const handleDeleteFeature = async () => {
    try {
      await deleteFeature(feature.id);
      toggleNotification("success", "Success", "Successfully deleted feature!");
      handleModalClose();
    } catch (e) {
      toggleNotification("error", "Failure", "Failed to delete feature!");
    }
  };

  const EditButtons = () => {
    return (
      <Row>
        <Col span={8}>
          <StandardButton onClick={handleModalClose}>Cancel</StandardButton>
        </Col>
        <Col span={8}>
          <StandardButton onClick={handleDeleteFeature}>Delete</StandardButton>
        </Col>
        <Col span={8}>
          <StandardButton
            disabled={saveButtonDisabled}
            onClick={handleEditFeature}
          >
            Save
          </StandardButton>
        </Col>
      </Row>
    );
  };

  const CreateButtons = () => {
    return (
      <Row>
        <Col span={12}>
          <StandardButton onClick={handleModalClose}>Cancel</StandardButton>
        </Col>
        <Col span={12}>
          <StandardButton
            disabled={saveButtonDisabled}
            style={{
              maxWidth: "max-content",
              paddingLeft: "15px",
              paddingRight: "15px",
            }}
            onClick={() => handleCreateFeature()}
          >
            Save
          </StandardButton>
        </Col>
      </Row>
    );
  };

  return (
    <StandardModal
      title={`Feature Alteration - ${featureId ? "Modify" : "Create"}`}
      buttons={featureId ? <EditButtons /> : <CreateButtons />}
      modalOpen={modalOpen}
      handleModalClose={() => setModalOpen(false)}
    >
      <Form
        initialValues={{ ...feature }}
        onValuesChange={(e) => setActiveFeature({ ...feature, ...e })}
        form={form}
        layout="vertical"
      >
        <Form.Item name="application_name" label="Application Name">
          <Input disabled placeholder="Type a file name" />
        </Form.Item>
        <Form.Item name="title" label="Feature Title">
          <Input placeholder="Type a title" />
        </Form.Item>
        <Form.Item name="image_link" label="Image Link">
          <Input placeholder="Type a URL" />
        </Form.Item>
        <Form.Item name="content_description" label="Description">
          <Input.TextArea rows={4} placeholder="Type a description" />
        </Form.Item>
      </Form>
    </StandardModal>
  );
};

export default FeatureModal;
