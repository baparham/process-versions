# process-versions

A dataset showing the compiled process version dependencies of different Node.js
versions

## Installation

`yarn add process-versions`

`npm install process-versions`

## Javascript usage

```javascript
const dependencyData = require('process-versions');

// prints out 1.0.9
console.log(dependencyData['16.13.0'].brotli);
```

## Typescript usage

```typescript
import dependencyData from 'process-versions';

// prints out 1.0.9
console.log(dependencyData['16.13.0'].brotli);

```

## Data Structure

The modules exports a json file directly, where each key in the object is a
version of Node.js (currently only starting with 16.9.0) and the value is an
object where each key is a dependency with its value representing the version
that was compiled into that specific version of Node.js.

If this were to be defined as a Typescript type, it would look something like
this:

```typescript
type DependencyMap = {
  "node": string;
  "v8": string;
  "uv": string;
  "zlib": string;
  "brotli": string;
  "ares": string;
  "modules": string;
  "nghttp2": string;
  "napi": string;
  "llhttp": string;
  "openssl": string;
  "cldr": string;
  "icu": string;
  "tz": string;
  "unicode": string;
  "ngtcp2": string;
  "nghttp3": string;
};

type ProcessVersions = { [id: string]: DependencyMap };
```
