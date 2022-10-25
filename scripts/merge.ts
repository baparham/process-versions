import { readFileSync, writeFileSync } from 'fs';
import { basename } from 'path';
import semverSort from 'semver/functions/sort';

const outputFilename = 'index.json';

type DependencyVersionMap = {
  [id: string]: string;
};

type NodeVersionMap = {
  [id: string]: DependencyVersionMap;
};

function mergeDataUnsorted(fileList: Array<string>): NodeVersionMap {
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
  return mergedJson;
}

function sortObjectBySemver(input: NodeVersionMap): NodeVersionMap {
  const output: NodeVersionMap = {};
  for (const version of semverSort(Object.keys(input))) {
    output[version] = input[version];
  }
  return output;
}

function main(fileList: Array<string>): void {
  const unsortedData = mergeDataUnsorted(fileList);
  const sortedData = sortObjectBySemver(unsortedData);
  writeFileSync(outputFilename, JSON.stringify(sortedData, null, 2));
  console.log('Wrote', outputFilename);
}

main(process.argv.slice(2));
