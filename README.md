# azos-actions-version-file

Github action to add a simple "version" file following the "version:hash" format.

The version number cames from release tags and the hash is a short hash from the last commit.

# How to config

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
