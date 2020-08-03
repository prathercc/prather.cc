const host = `${window.location.origin}`;

export const fetchAllSoftware = () => {
  return fetch(`${host}/api/v1/software`).then(resp => resp.json());
};

export const fetchSoftware = (appName) => {
  return fetch(
    `${host}/api/v1/software?application_name=${appName}`
  ).then(resp => resp.json());
};

export const postSoftware = (software) => {
  return fetch(`${host}/api/v1/software`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(software),
  }).then(resp => resp.json());
};

export const putSoftware = (software) => {
  return fetch(`${host}/api/v1/software/${software.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(software),
  }).then(resp => resp.json());
};

export const deleteSoftware = (softwareId) => {
  return fetch(`${host}/api/v1/software/${softwareId}`, {
    method: 'DELETE',
  }).then(resp => resp.json());
};
