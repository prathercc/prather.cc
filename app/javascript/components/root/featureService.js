const host = `${window.location.origin}`;

export const fetchFeatures = async (software_id, setFeatures) => {
  const response = await fetch(
    `${host}/api/v1/feature?software_id=${software_id}`
  );
  response
    .json()
    .then((resp) => {
      setFeatures(resp.data);
    })
    .catch((err) => console.log(err));
};
export const fetchFeature = async (id, setFeature) => {
  const response = await fetch(
    `${host}/api/v1/feature?id=${id}`
  );
  response
    .json()
    .then((resp) => {
      setFeature(resp.data);
    })
    .catch((err) => console.log(err));
};

export const postFeature = async (feature) => {
  const response = await fetch(`${host}/api/v1/feature`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(feature),
  });
  response
    .json()
    .then((resp) => {
    })
    .catch((err) => console.log(err));
};

export const putFeature = async (feature) => {
  const response = await fetch(`${host}/api/v1/feature/${feature.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(feature),
  });
  response
    .json()
    .then((resp) => {
    })
    .catch((err) => console.log(err));

};

export const deleteFeature = async (featureId) => {
  const response = await fetch(`${host}/api/v1/feature/${featureId}`, {
    method: 'DELETE',
  });
  response
    .json()
    .then((resp) => {
    })
    .catch((err) => console.log(err));
};
