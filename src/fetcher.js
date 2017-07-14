import 'isomorphic-fetch';

// TODO: Update this when someone releases a real, production-quality solution
// for handling universal rendering with Relay Modern. For now, this is just
// enough to get things working.

class FetcherBase {
  constructor(url, deviceId) {
    this.url = url;
    this.deviceId = deviceId;
  }

  async fetch(operation, variables) {
    let headerVals = null;

    if (this.deviceId) {
      headerVals = {
        'Cookie': this.deviceId,
        'Content-Type': 'application/json',
      };
    } else {
      headerVals = {
        'Content-Type': 'application/json',
      };
    }

    const response = await fetch(this.url, {
      method: 'POST',
      headers: headerVals,
      credentials: 'same-origin',
      body: JSON.stringify({ query: operation.text, variables }),
    });
    return response.json();
  }
}

export class ServerFetcher extends FetcherBase {
  constructor(url, deviceId) {
    super(url, deviceId);

    this.payloads = [];
  }

  async fetch(...args) {
    const i = this.payloads.length;
    this.payloads.push(null);
    const payload = await super.fetch(...args);
    this.payloads[i] = payload;
    return payload;
  }

  toJSON() {
    return this.payloads;
  }
}

export class ClientFetcher extends FetcherBase {
  constructor(url, payloads) {
    super(url, null);

    this.payloads = payloads;
  }

  async fetch(...args) {
    if (this.payloads.length) {
      return this.payloads.shift();
    }

    return super.fetch(...args);
  }
}
