export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

nvm install --lts
npm install -g yarn
yarn

TOTAL_UNIQUE_VERSIONS=$(yarn --silent ts-node -s scripts/get-new-node-versions.ts)

echo "$TOTAL_UNIQUE_VERSIONS" > total-unique-versions.txt
MIN_SUPPORTED_MAJOR="18"
SUPPORTED_UNIQUE_VERSIONS=$(awk -F. "{if (\$1 >= "$MIN_SUPPORTED_MAJOR") print}" total-unique-versions.txt)
echo Found unique versions: $SUPPORTED_UNIQUE_VERSIONS

mkdir -p jsons

for version in $SUPPORTED_UNIQUE_VERSIONS; do
  nvm install $version
  node --version
  node -p "JSON.stringify(process.versions)" > jsons/$version.json
done

ls jsons
