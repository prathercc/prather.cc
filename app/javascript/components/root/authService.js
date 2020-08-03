const host = `${window.location.origin}`;

export const getSession = () => {
  return fetch(`${host}/api/v1/sessions`).then(resp => resp.json());
};

export const authenticate = (user) => {
  return fetch(`${host}/api/v1/sessions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  }).then(resp => resp.json());
};

export const clearSession = (id) => {
  return fetch(`${host}/api/v1/sessions/${id}`, {
    method: 'DELETE',
  }).then(resp => resp.json());
};
