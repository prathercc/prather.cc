const host = `${window.location.origin}`;

export const fetchSoftware = async (appName, setSoftwares) => {
  const response = await fetch(
    `${host}/api/v1/software?application_name=${appName}`
  );
  response
    .json()
    .then((resp) => {
      setSoftwares(resp.data);
    })
    .catch((err) => console.log(err));
};

export const postSoftware = async (software) => {
  const response = await fetch(`${host}/api/v1/software`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(software),
  });
  response
    .json()
    .then((resp) => {
      console.log(resp);
    })
    .catch((err) => console.log(err));
};

export const putSoftware = async (software) => {
  const response = await fetch(`${host}/api/v1/software/${software.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(software),
  });
  response
    .json()
    .then((resp) => {
    })
    .catch((err) => console.log(err));

};


export const deleteSoftware = async (softwareId) => {
  const response = await fetch(`${host}/api/v1/software/${softwareId}`, {
    method: 'DELETE',
  });
  response
    .json()
    .then((resp) => {
    })
    .catch((err) => console.log(err));
};
