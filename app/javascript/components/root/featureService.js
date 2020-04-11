const host = `${window.location.origin}`;

export const fetchFeatures = async (appName, setFeatures) => {
  const response = await fetch(
    `${host}/api/v1/feature?application_name=${appName}`
  );
  response
    .json()
    .then((resp) => {
      setFeatures(resp.data);
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
      console.log(resp);
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
