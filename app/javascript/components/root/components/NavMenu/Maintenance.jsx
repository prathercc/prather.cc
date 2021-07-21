import React, { useEffect, useState } from "react";
import {
  StandardModal,
  StandardButton,
  getThemeColor,
  toggleNotification,
} from "../Utility/Utility";
import {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  getUser,
} from "../../userService";
import { Row, Col, Input, Form, Select, Descriptions } from "antd";

function Maintenance({
  userData,
  sessionModalOpen,
  setSessionModalOpen,
  createModalOpen,
  setCreateModalOpen,
  updateModalOpen,
  setUpdateModalOpen,
  deleteModalOpen,
  setDeleteModalOpen,
}) {
  return (
    <>
      <CreateUser
        modalOpen={createModalOpen}
        setModalOpen={setCreateModalOpen}
        userData={userData}
      />
      <UpdateUser
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        userData={userData}
      />
      <DeleteUser
        modalOpen={deleteModalOpen}
        setModalOpen={setDeleteModalOpen}
        userData={userData}
      />
      <ViewSession
        modalOpen={sessionModalOpen}
        setModalOpen={setSessionModalOpen}
        userData={userData}
      />
    </>
  );
}

const ViewSession = ({ userData, modalOpen, setModalOpen }) => {
  const arrMap = [
    { key: "Email", value: userData?.email },
    { key: "Group", value: userData?.group },
    { key: "Session Token", value: userData?.token },
    { key: "Account Identifier", value: userData?.id },
    {
      key: "Account Created",
      value: new Date(userData?.created_at).toLocaleDateString(),
    },
    {
      key: "Last Sign-in",
      value: new Date(userData?.updated_at).toLocaleDateString(),
    },
  ];
  return (
    <StandardModal
      title="Session Information"
      modalOpen={modalOpen}
      handleModalClose={() => setModalOpen(false)}
    >
      <Form>
        <Form.Item>
          <Descriptions layout="vertical" bordered>
            {arrMap.map((x) => {
              return (
                <>
                  <Descriptions.Item
                    style={{ color: getThemeColor(1) }}
                    span={1}
                  >
                    {x.key}
                  </Descriptions.Item>
                  <Descriptions.Item span={2}>{x.value}</Descriptions.Item>
                </>
              );
            })}
          </Descriptions>
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={24}>
              <StandardButton onClick={() => setModalOpen(false)}>
                Cancel
              </StandardButton>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </StandardModal>
  );
};

const UpdateUser = ({ userData, modalOpen, setModalOpen }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("Make a selection");
  const [selectedRole, setSelectedRole] = useState("Make a selection");
  const groupOptions = ["Administrator", "Moderator", "Member"];
  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await getUsers();
      setUsers(data);
    };
    if (userData && modalOpen) {
      fetchUsers();
    }
  }, [userData, modalOpen]);
  useEffect(() => {
    const filterUsers = () => {
      let x = users.map((user) => {
        return { id: user.id, name: user.email };
      });
      setFilteredUsers(x);
    };
    if (users?.length > 0) {
      filterUsers();
    }
  }, [users]);
  const handleUpdate = async () => {
    const { data } = await updateUser(selectedUser, { group: selectedRole });
    if (data) {
      toggleNotification("success", "Success", "Successfully updated user!");
      handleModalClose();
    } else {
      toggleNotification("error", "Failure", "Failed to update user!");
    }
  };
  const handleModalClose = () => {
    setSelectedUser("Make a selection");
    setSelectedRole("Make a selection");
    setModalOpen(false);
  };
  const disabledButton =
    selectedUser === "Make a selection" ||
    selectedRole === "Make a selection" ||
    selectedUser === userData?.id;

  const handleUserSelect = async (e) => {
    setSelectedUser(e);
    const { data } = await getUser(e);
    setSelectedRole(data.group || "Make a selection");
  };
  return (
    <StandardModal
      title="Update User"
      modalOpen={modalOpen}
      handleModalClose={handleModalClose}
    >
      <Form layout="vertical">
        <Form.Item label="User">
          <Select
            value={selectedUser}
            placeholder="Select a user"
            onChange={handleUserSelect}
          >
            {filteredUsers.map((user, i) => {
              return (
                <Select.Option key={i} value={user.id}>
                  {user.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="Role">
          <Select
            disabled={
              selectedUser === "Make a selection" ||
              selectedUser === userData?.id
            }
            value={selectedRole}
            placeholder="Select a role"
            onChange={(e) => setSelectedRole(e)}
          >
            {groupOptions.map((group, i) => {
              return (
                <Select.Option key={i} value={group}>
                  {group}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={12}>
              <StandardButton onClick={handleModalClose}>Cancel</StandardButton>
            </Col>
            <Col span={12}>
              <StandardButton onClick={handleUpdate} disabled={disabledButton}>
                Update User
              </StandardButton>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </StandardModal>
  );
};

const DeleteUser = ({ userData, modalOpen, setModalOpen }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("Make a selection");
  const deleteButtonDisabled =
    selectedUser === "Make a selection" || userData?.id === selectedUser;
  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await getUsers();
      setUsers(data);
    };
    if (userData && modalOpen) {
      fetchUsers();
    }
  }, [userData, modalOpen]);
  useEffect(() => {
    const filterUsers = () => {
      let x = users.map((user) => {
        return { id: user.id, name: user.email };
      });
      setFilteredUsers(x);
    };
    if (users?.length > 0) {
      filterUsers();
    }
  }, [users]);

  const handleModalClose = () => {
    setSelectedUser("Make a selection");
    setModalOpen(false);
  };
  const handleDeleteUser = async () => {
    const { data } = await deleteUser(selectedUser);
    if (data) {
      toggleNotification("success", "Success", "Successfully deleted user!");
      handleModalClose();
    } else {
      toggleNotification("error", "Failure", "Failed to delete user!");
    }
  };

  return (
    <StandardModal
      title="Delete User"
      modalOpen={modalOpen}
      handleModalClose={handleModalClose}
    >
      <Form layout="vertical">
        <Form.Item label="User">
          <Select
            value={selectedUser}
            placeholder="Select a user"
            onChange={(e) => setSelectedUser(e)}
          >
            {filteredUsers.map((user, i) => {
              return (
                <Select.Option key={i} value={user.id}>
                  {user.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={12}>
              <StandardButton onClick={() => setModalOpen(false)}>
                Cancel
              </StandardButton>
            </Col>
            <Col span={12}>
              <StandardButton
                disabled={deleteButtonDisabled}
                onClick={handleDeleteUser}
              >
                Delete User
              </StandardButton>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </StandardModal>
  );
};

const CreateUser = ({ userData, modalOpen, setModalOpen }) => {
  const blankUser = { email: "", password: "", password2: "", group: "Member" };
  const [newUser, setNewUser] = useState(blankUser);
  const newButtonDisabled =
    newUser.email.length === 0 ||
    newUser.password.length === 0 ||
    newUser.password2 !== newUser.password ||
    newUser.email === userData.email ||
    !newUser.email.includes(".") ||
    !newUser.email.includes("@");
  const [form] = Form.useForm();
  const handleCreateNewUser = async () => {
    const { data } = await createUser(newUser);
    if (data) {
      toggleNotification("success", "Success", "Successfully created user!");
      handleModalClose();
    } else {
      toggleNotification("error", "Failure", "Failed to create user!");
    }
  };
  const handleModalClose = () => {
    setNewUser(blankUser);
    form.setFieldsValue(blankUser);
    setModalOpen(false);
  };
  return (
    <StandardModal
      title="Create User"
      modalOpen={modalOpen}
      handleModalClose={handleModalClose}
    >
      <Form
        initialValues={{ ...newUser }}
        onValuesChange={(e) => setNewUser({ ...newUser, ...e })}
        form={form}
        layout="vertical"
      >
        <Form.Item name="email" label="Email">
          <Input placeholder="Type an email" />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input.Password placeholder="Type a password" />
        </Form.Item>
        <Form.Item name="password2" label="Password Again">
          <Input.Password placeholder="Retype the above password" />
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={12}>
              <StandardButton onClick={handleModalClose}>Cancel</StandardButton>
            </Col>
            <Col span={12}>
              <StandardButton
                disabled={newButtonDisabled}
                onClick={handleCreateNewUser}
              >
                Create User
              </StandardButton>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </StandardModal>
  );
};

export default Maintenance;
