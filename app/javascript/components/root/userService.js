const host = `${window.location.origin}`;

export const getUsers = () => {
  return fetch(`${host}/api/v1/user`).then(res => res.json());
};

export const createUser = (user) => {
  return fetch(`${host}/api/v1/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  }).then(res => res.json());
};

export const deleteUser = (id) => {
  return fetch(`${host}/api/v1/user/${id}`, {
    method: 'DELETE',
  }).then(res => res.json());
};
