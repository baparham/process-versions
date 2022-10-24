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
