const host = `${window.location.origin}`;

export const getSession = async (setUserData) => {
  const response = await fetch(`${host}/api/v1/sessions`);
  response
    .json()
    .then((resp) => {
      setUserData(resp.data);
    })
    .catch((err) => console.log(err));
};

export const authenticate = async (user, setUserData) => {
  const response = await fetch(`${host}/api/v1/sessions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  response
    .json()
    .then((resp) => {
      setUserData(resp.data);
    })
    .catch((err) => console.log(err));
};

export const clearSession = async (setUserData, id) => {
  const response = await fetch(`${host}/api/v1/sessions/${id}`, {
    method: 'DELETE',
  });
  response
    .json()
    .then(() => {
      setUserData(null);
    })
    .catch((err) => console.log(err));
};
