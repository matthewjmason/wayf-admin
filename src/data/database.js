import 'isomorphic-fetch';
import DataLoader from 'dataloader';
import config from '../../config';

const BASE_URL = config.wayf.host + ':' + config.wayf.port;


export var publisherLoader = new DataLoader(keys => fetchPublishers(keys));
export var identityProviderLoader = new DataLoader(keys => fetchIdentityProviders(keys));
export var userLoader = new DataLoader(keys => fetchUsers(keys));

export class User {
  constructor(secretDeviceId) {
    this.secretDeviceId = secretDeviceId;
  }
}

function buildDeviceCookieHeader(deviceId) {
  return { Cookie: `deviceId=${deviceId}` };
}

export function getAdminViewer() {
  return new User();
}

export function getViewer(deviceId) {
  console.log(`deviceId ${deviceId}`);
  return new User(deviceId);
}

function fetchResponseByURL(relativeURL) {
  console.log(`${BASE_URL}${relativeURL}`);
  return fetch(`${BASE_URL}${relativeURL}`).then(res => res.json());
}

function postToCloud(body, relativeURL) {
  return fetch(`${BASE_URL}${relativeURL}`, { method: 'POST', body: JSON.stringify(body) })
    .then(function(res) {
        return res.json();
    });
}

function patchToCloud(body, relativeURL) {
  return fetch(`${BASE_URL}${relativeURL}`, { method: 'PATCH', body: JSON.stringify(body) })
    .then(function(res) {
        return res.json();
    });
}

function deleteByURLAndHeader(relativeURL, header) {
  console.log(relativeURL, header);

  return fetch(`${BASE_URL}${relativeURL}`, { headers: header, method: 'delete' }).then(res => res.json());
}

function fetchResponseByURLAndHeader(relativeURL, header) {
  console.log(relativeURL, header);

  return fetch(`${BASE_URL}${relativeURL}`, { headers: header }).then(res => res.json());
}

export function fetchDevice(deviceId) {
  return fetchResponseByURLAndHeader('/1/mydevice', buildDeviceCookieHeader(deviceId));
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

export function fetchActivity(deviceId) {
  return fetchResponseByURLAndHeader('/1/mydevice/activity', buildDeviceCookieHeader(deviceId));
}

export function fetchLatestActivity(deviceId) {
  return fetchResponseByURLAndHeader('/1/mydevice/activity?limit=1&type=ADD_IDP', buildDeviceCookieHeader(deviceId))
      .then(function(res) {
        var activity = res;

        return activity[0];
      });
}

export function fetchHistory(deviceId) {
  return fetchResponseByURLAndHeader('/1/mydevice/history', buildDeviceCookieHeader(deviceId));
}

export function forgetIdp(idpId, deviceId) {
  return deleteByURLAndHeader(`/1/mydevice/history/idp/${idpId}`, buildDeviceCookieHeader(deviceId)).then(() => getViewer());
}

export function createPublisherRegistration(publisherRegistration) {
  return postToCloud(publisherRegistration, '/1/publisherRegistration');
}

export function createPublisher(publisher) {
  return postToCloud(publisher, '/1/publisher');
}


export function fetchPendingRegistrations() {
  return fetchResponseByURL(`/1/publisherRegistrations?statuses=PENDING`);
}

export function fetchApprovedRegistrations() {
  return fetchResponseByURL(`/1/publisherRegistrations?statuses=APPROVED`);
}

export function fetchDeniedRegistrations() {
  return fetchResponseByURL(`/1/publisherRegistrations?statuses=DENIED`);
}

export function fetchUsers(ids) {
  return fetchResponseByURL(`/1/users?ids=${ids}`);
}

export function denyPublisherRegistration(publisherRegistrationId) {
  var body = {
    id: publisherRegistrationId,
    status: 'DENIED'
  };

  return patchToCloud(body, `/1/publisherRegistration/${publisherRegistrationId}`);
}