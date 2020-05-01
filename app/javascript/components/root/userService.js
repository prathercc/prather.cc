const host = `${window.location.origin}`;

export const getUsers = async (setUserData) => {
  const response = await fetch(`${host}/api/v1/user`);
  response
    .json()
    .then((resp) => {
      setUserData(resp.data);
    })
    .catch((err) => console.log(err));
};

export const createUser = async (user) => {
  const response = await fetch(`${host}/api/v1/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  response
    .json()
    .then(() => {
    })
    .catch((err) => console.log(err));
};

export const deleteUser = async (id) => {
  const response = await fetch(`${host}/api/v1/user/${id}`, {
    method: 'DELETE',
  });
  response
    .json()
    .then(() => {
    })
    .catch((err) => console.log(err));
};
