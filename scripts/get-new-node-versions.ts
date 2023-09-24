import * as fs from 'fs';

interface nodeEntry {
  version: string;
}

// Read the contents of node.json and parse the JSON data
const nodeData = fs.readFileSync('node-versions.json');
const nodeJson: nodeEntry[] = JSON.parse(nodeData.toString());

// Read the contents of indexed.json and parse the JSON data
const indexedData = fs.readFileSync('index.json');
const indexedJson = JSON.parse(indexedData.toString());

// Extract the "version" keys from nodeJson
const nodeVersions = nodeJson.map(entry => entry.version.slice(1));
// Extract the keys from indexedJson
const indexedVersions = Object.keys(indexedJson);
// Find the unique list of "version" keys that are in nodeJson and not in indexedJson
const uniqueVersions = nodeVersions.filter(version => !indexedVersions.includes(version));

console.log(uniqueVersions.join('\n'));
