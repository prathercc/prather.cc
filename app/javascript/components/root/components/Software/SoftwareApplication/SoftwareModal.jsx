import React from "react";
import {
  postSoftware,
  putSoftware,
  deleteSoftware,
} from "../../../softwareService";
import {
  StandardButton,
  StandardModal,
  toggleNotification,
} from "../../Utility/Utility";
import { Row, Col, Form, Input, DatePicker, Checkbox } from "antd";
import moment from "moment";

const SoftwareModal = ({
  software,
  setSoftware,
  modalOpen,
  setModalOpen,
  newSoftware = true,
  setActiveApplication,
}) => {
  const isSubmitDisabled =
    software.name.length === 0 ||
    software.icon_link.length === 0 ||
    software.description.length === 0 ||
    software.repo_link.length === 0 ||
    software.languages.length === 0;
  const [form] = Form.useForm();

  const handleCreateSoftware = async () => {
    try {
      const { data } = await postSoftware(software);
      if (data) {
        setSoftware(data);
        setModalOpen(false);
        window.history.pushState({}, "", `/software/${data.name}`);
        setActiveApplication(data.name);
        toggleNotification(
          "success",
          "Success",
          "Successfully created application!"
        );
      }
    } catch (e) {
      toggleNotification("error", "Failure", "Failed to create application!");
    }
  };
  const handleEditSoftware = async () => {
    try {
      const { data } = await putSoftware(software);
      if (data) {
        setSoftware(data);
        setModalOpen(false);
        window.history.pushState({}, "", `/software/${data.name}`);
        toggleNotification(
          "success",
          "Success",
          "Successfully saved application!"
        );
      }
    } catch (e) {
      toggleNotification("error", "Failure", "Failed to save application!");
    }
  };
  const handleDeleteSoftware = async () => {
    try {
      const { data } = await deleteSoftware(software.id);
      if (data) {
        window.open("/", "_self");
      }
    } catch (e) {
      toggleNotification("error", "Failure", "Failed to delete application!");
    }
  };

  const ExistingButtons = () => {
    return (
      <Row>
        <Col span={8}>
          <StandardButton onClick={() => setModalOpen(false)}>
            Cancel
          </StandardButton>
        </Col>
        <Col span={8}>
          <StandardButton onClick={handleDeleteSoftware}>Delete</StandardButton>
        </Col>
        <Col span={8}>
          <StandardButton
            disabled={isSubmitDisabled}
            onClick={handleEditSoftware}
          >
            Save
          </StandardButton>
        </Col>
      </Row>
    );
  };

  const NewButtons = () => {
    return (
      <Row>
        <Col span={12}>
          <StandardButton onClick={() => setModalOpen(false)}>
            Cancel
          </StandardButton>
        </Col>
        <Col span={12}>
          <StandardButton
            disabled={isSubmitDisabled}
            onClick={handleCreateSoftware}
          >
            Create
          </StandardButton>
        </Col>
      </Row>
    );
  };

  return (
    <StandardModal
      title={`Software Alteration - ${newSoftware ? "Create" : "Modify"}`}
      buttons={!newSoftware ? <ExistingButtons /> : <NewButtons />}
      modalOpen={modalOpen}
      handleModalClose={() => setModalOpen(false)}
    >
      <Form
        initialValues={{ ...software }}
        onValuesChange={(e) => setSoftware({ ...software, ...e })}
        form={form}
        layout="vertical"
      >
        <Form.Item name="name" label="Name">
          <Input placeholder="Type a name" />
        </Form.Item>
        <Form.Item name="icon_link" label="Icon Image Link">
          <Input placeholder="Type a URL" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={4} placeholder="Type a description" />
        </Form.Item>
        <Form.Item name="repo_link" label="Repository Link">
          <Input placeholder="Type a URL" />
        </Form.Item>
        <Form.Item name="languages" label="Language(s)">
          <Input placeholder="Type a language" />
        </Form.Item>
        <Form.Item name="youtube_link" label="Youtube Link">
          <Input placeholder="Type a URL" />
        </Form.Item>
        <Form.Item>
          <DatePicker
            defaultValue={moment(software.dev_date, "YYYY-MM-DD")}
            onChange={(dt, dts) => setSoftware({ ...software, dev_date: dts })}
          />
        </Form.Item>
        <Row>
          <Col span={6}>
            <Form.Item valuePropName="checked" name="windows">
              <Checkbox>Windows?</Checkbox>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item valuePropName="checked" name="linux">
              <Checkbox>Linux?</Checkbox>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item valuePropName="checked" name="mac">
              <Checkbox>Mac?</Checkbox>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item valuePropName="checked" name="android">
              <Checkbox>Android?</Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item valuePropName="checked" name="is_legacy">
          <Checkbox>Is Legacy?</Checkbox>
        </Form.Item>
      </Form>
    </StandardModal>
  );
};

export default SoftwareModal;
