# CSRF Demo

A Cross-Site Request Forgery demo application built for ITIS 3200.

## :exclamation: Discalaimer

__This application was built under an enourmous time constraint during finals week.__

__It does not represent our ability to properly structure a web application.__

## Credentials

### Functions

Create a new directory under `functions/` called `credentials/`.

In `credentials/` make three files `firebase.json`, `gmail.json`, and `service-account.json`.

Populate these files with the following corresponding data.

#### `firebase.json`

```json
{
  "auth_domain": "XXX.firebaseapp.com",
  "database_url": "https:/XXX.firebaseio.com",
  "web_api_key": ""
}
```

The `web_api_key` can be found [here](https://console.firebase.google.com/project/csrf-demo/settings/general/).

#### `gmail.json`

```json
{
  "user": "XXX@gmail.com",
  "pass": ""
}
```

#### `service-account.json`

This file can be downloaded from the [Service Accounts](https://console.firebase.google.com/project/csrf-demo/settings/serviceaccounts/adminsdk) tab.
