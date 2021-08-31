# azos-actions-version-file

Github action to add a simple "version" file with "version:hash" string.

The version number cames from release tags and the hash is a short hash from the last commit.

# How to config

Create the follow yaml file .github/workflows/version.yml

```yaml
name: "Create Version File"

on:
  pull_request:
    types: [closed]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
      - name: Create version file
        uses: Azos-Seguros/azos-actions-version-file
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

# Build

To build this project run:

```shell
$ npm run build
```

This command will run the ncc compiler to bundle all dependencies into a single file.
