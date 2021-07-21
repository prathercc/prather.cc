import React, { useState, useEffect } from "react";
import {
  StandardButton,
  StandardLinkModal,
  getThemeColor,
  StandardModal,
  toggleNotification,
} from "../Utility/Utility";
import { Row, Col, Form, Input, Menu, Spin } from "antd";
import { YoutubeFilled, GithubFilled, UserOutlined } from "@ant-design/icons";
import { authenticate, clearSession } from "../../authService";
import { fetchAllSoftware } from "../../softwareService";
import Maintenance from "./Maintenance";
import SoftwareModal from "../Software/SoftwareApplication/SoftwareModal";

function NavMenu({ onSelect, userData, setUserData, setActiveApplication }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [githubModalOpen, setGithubModalOpen] = useState(false);
  const [youtubeModalOpen, setYoutubeModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [sessionModalOpen, setSessionModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [newSoftwareOpen, setNewSoftwareOpen] = useState(false);
  const [software, setSoftware] = useState({
    is_legacy: false,
    icon_link: "",
    name: "",
    description: "",
    image_link: "",
    windows: false,
    linux: false,
    mac: false,
    android: false,
    repo_link: "",
    languages: "",
    youtube_link: "",
    dev_date: new Date(),
  });
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data } = await fetchAllSoftware();
        setApplications(data);
      } catch (e) {
        console.error("Failed to load software: ", e);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  return (
    <>
      <Menu theme="dark" onClick={onSelect} mode="horizontal">
        <Menu.Item key="Home">Home</Menu.Item>
        <Menu.SubMenu key="Software" title="Software">
          {userData && (
            <Menu.ItemGroup title="Administration">
              <Menu.Item
                key="app:admin"
                onClick={() => setNewSoftwareOpen(true)}
              >
                New Application
              </Menu.Item>
            </Menu.ItemGroup>
          )}
          <Menu.ItemGroup title="Applications">
            {loading ? (
              <Menu.Item icon={<Spin />} />
            ) : (
              applications.map((app, i) => {
                return (
                  <Menu.Item
                    key={`app:${i}`}
                    onClick={() => setActiveApplication(app.name)}
                  >
                    {app.name}
                  </Menu.Item>
                );
              })
            )}
          </Menu.ItemGroup>
        </Menu.SubMenu>
        <Menu.SubMenu key="external" title="Resources">
          <Menu.ItemGroup title="Source">
            <Menu.Item
              icon={<GithubFilled />}
              key="Github"
              onClick={() => setGithubModalOpen(true)}
            >
              GitHub
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Media">
            <Menu.Item
              icon={<YoutubeFilled />}
              key="Youtube"
              onClick={() => setYoutubeModalOpen(true)}
            >
              YouTube
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu.SubMenu>
        {userData ? (
          <Menu.SubMenu icon={<UserOutlined />}>
            <Menu.ItemGroup title="Administration">
              <Menu.Item key="user:0" onClick={() => setCreateModalOpen(true)}>
                Add User
              </Menu.Item>
              <Menu.Item key="user:1" onClick={() => setUpdateModalOpen(true)}>
                Edit User
              </Menu.Item>
              <Menu.Item key="user:2" onClick={() => setDeleteModalOpen(true)}>
                Remove User
              </Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="Settings">
              <Menu.Item key="user:4" onClick={() => setSessionModalOpen(true)}>
                View Session
              </Menu.Item>
              <Menu.Item key="user:5" onClick={() => setUserModalOpen(true)}>
                Sign Out
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu.SubMenu>
        ) : (
          <Menu.Item
            icon={<UserOutlined />}
            key="UserLogin"
            onClick={() => setUserModalOpen(true)}
          />
        )}
      </Menu>
      <Github modalOpen={githubModalOpen} setModalOpen={setGithubModalOpen} />
      <Youtube
        modalOpen={youtubeModalOpen}
        setModalOpen={setYoutubeModalOpen}
      />
      <Login
        setUserData={setUserData}
        userData={userData}
        modalOpen={userModalOpen}
        setModalOpen={setUserModalOpen}
      />
      <Maintenance
        sessionModalOpen={sessionModalOpen}
        setSessionModalOpen={setSessionModalOpen}
        createModalOpen={createModalOpen}
        setCreateModalOpen={setCreateModalOpen}
        updateModalOpen={updateModalOpen}
        setUpdateModalOpen={setUpdateModalOpen}
        deleteModalOpen={deleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
        userData={userData}
      />
      <SoftwareModal
        modalOpen={newSoftwareOpen}
        setModalOpen={setNewSoftwareOpen}
        software={software}
        setSoftware={setSoftware}
        setActiveApplication={setActiveApplication}
      />
    </>
  );
}

const Github = ({ modalOpen, setModalOpen }) => {
  return (
    <StandardLinkModal
      modalOpen={modalOpen}
      handleModalClose={() => setModalOpen(false)}
      link="https://github.com/prathercc"
    >
      Open the official{" "}
      <span style={{ color: getThemeColor(1) }}>Prather.cc</span> GitHub page?
    </StandardLinkModal>
  );
};

const Youtube = ({ modalOpen, setModalOpen }) => {
  return (
    <StandardLinkModal
      modalOpen={modalOpen}
      handleModalClose={() => setModalOpen(false)}
      link="https://www.youtube.com/channel/UC7_J0pO4THZ_QqQWqXwRl3w"
    >
      Open the official{" "}
      <span style={{ color: getThemeColor(1) }}>Prather.cc</span> YouTube page?
    </StandardLinkModal>
  );
};

const Login = ({ setUserData, userData, modalOpen, setModalOpen }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let signInDisabled =
    credentials.email.length === 0 || credentials.password.length === 0;
  const [form] = Form.useForm();
  const authenticateUser = async () => {
    const { data } = await authenticate(credentials);
    if (data) {
      setUserData(data);
      setModalOpen(false);
      toggleNotification("success", "Success", "Successfully signed in!");
    } else {
      toggleNotification(
        "error",
        "Failure",
        "Failed to authenticate credentials!"
      );
    }
  };
  const signOut = async () => {
    const { data } = await clearSession(userData.id);
    setUserData(data);
    setModalOpen(false);
    toggleNotification("success", "Success", "Successfully signed out!");
  };

  return (
    <StandardModal
      title={userData ? "Sign Out" : "Sign In"}
      modalOpen={modalOpen}
      handleModalClose={() => setModalOpen(false)}
    >
      {userData && "Are you sure you want to sign out?"}
      <Form
        initialValues={{ ...credentials }}
        onValuesChange={(e) => setCredentials({ ...credentials, ...e })}
        form={form}
        layout="vertical"
      >
        {!userData && (
          <>
            <Form.Item name="email" label="Email">
              <Input placeholder="Type an email address" />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input.Password placeholder="Type a password" />
            </Form.Item>
          </>
        )}
        <Form.Item>
          <Row>
            <Col span={12}>
              <StandardButton onClick={() => setModalOpen(false)}>
                Cancel
              </StandardButton>
            </Col>
            <Col span={12}>
              <StandardButton
                disabled={signInDisabled && !userData}
                onClick={userData ? signOut : authenticateUser}
              >
                Sign {userData ? "Out" : "In"}
              </StandardButton>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </StandardModal>
  );
};

export default NavMenu;
