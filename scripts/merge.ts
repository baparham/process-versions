import { readFileSync, writeFileSync } from 'fs';
import { basename } from 'path';

const fileList = process.argv.slice(2);
const outputFilename = 'index.json';

type DependencyVersionMap = {
  [id: string]: string;
};

type NodeVersionMap = {
  [id: string]: DependencyVersionMap;
};

let mergedJson: NodeVersionMap = {};

for (const filename of fileList) {
  const baseFilename = basename(filename);
  console.log('Processing', baseFilename);
  const jsonData = JSON.parse(readFileSync(filename).toString());
  if (baseFilename === outputFilename) {
    mergedJson = {
      ...mergedJson,
      ...jsonData,
    };
  } else {
    const version = jsonData['node'];
    mergedJson[version] = jsonData;
  }
}

writeFileSync(outputFilename, JSON.stringify(mergedJson, null, 2));
console.log('Wrote', outputFilename);
