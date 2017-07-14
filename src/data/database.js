var fetch = require('node-fetch');
import DataLoader from 'dataloader';


export var publisherLoader = new DataLoader(keys => fetchPublishers(keys));
export var identityProviderLoader = new DataLoader(keys => fetchIdentityProviders(keys));

const BASE_URL = 'http://localhost:8080';

export class User {
  constructor(secretDeviceId) {
    this.secretDeviceId = secretDeviceId;
  }
}
export function getViewer(deviceId) {
  console.log('deviceId ' + deviceId)
  return new User(deviceId);
}

function fetchResponseByURL(relativeURL) {
  console.log(relativeURL);
  return fetch(`${BASE_URL}${relativeURL}`).then(res => res.json());
}

function deleteByURLAndHeader(relativeURL, header) {
  console.log(relativeURL, header);

  return fetch(`${BASE_URL}${relativeURL}`, {headers: header, method: 'delete'}).then(res => res.json());
}

function fetchResponseByURLAndHeader(relativeURL, header) {
  console.log(relativeURL, header);

  return fetch(`${BASE_URL}${relativeURL}`, {headers: header}).then(res => res.json());
}

export function fetchDevice(id) {
  return fetchResponseByURL(`/1/device/${id}`);
}

export function fetchIdentityProvider(id) {
  return fetchResponseByURL(`/1/identityProvider/${id}`);
}

function fetchIdentityProviders(ids) {
  return fetchResponseByURL(`/1/identityProviders?ids=${ids}`);
}


export function fetchPublisher(id) {
  return fetchResponseByURL(`/1/publisher/${id}`);
}

function fetchPublishers(id) {
  return fetchResponseByURL(`/1/publishers?ids=${id}`);
}

export function fetchActivity(id) {
  return fetchResponseByURL(`/1/device/${id}/activity`);
}


export function fetchLatestActivity(id) {
  return fetchResponseByURL(`/1/device/${id}/activity?limit=1&type=ADD_IDP`)
      .then(function(res) {
        var activity = res;

        return activity[0];
      });
}

export function fetchHistory(id) {
  return fetchResponseByURLAndHeader(`/1/mydevice/history`, {'X-Device-Id': id});
}

export function forgetIdp(idpId, root) {
  return deleteByURLAndHeader(`/1/mydevice/history/idp/${idpId}`, {'X-Device-Id': root}).then((function (res) {
    return getViewer();
  }));
}
