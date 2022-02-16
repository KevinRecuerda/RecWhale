# RecWhale

:whale: Provide some extensions tools

- https://react-ts-recwhale.stackblitz.io
- https://stackblitz.com/edit/react-ts-recwhale

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

### start

```sh
npx lerna init -i
```

### add dependencies

```sh
npx lerna add a --scope=b --scope=c --scope=d

npx lerna bootstrap
npx lerna ls


pnpm -r build --filter recwhale-ts

```

### CD

```sh
npx lerna changed

npx lerna publish --no-git-tag-version --no-push
  
npx lerna version --conventional-commits --yes
npx lerna publish --from-git
npx lerna publish --from-package

npx lerna publish from-package --conventional-commits --yes
npx lerna publish from-package --contents dist --conventional-commits --yes

npx lerna changed
```

### Next steps:

- [x] publish multiple with lerna
- [x] test dependencies
- [x] publish version auto

- [x] test lib ts
- [x] test lib ts extension
- [x] test lib react

- [ ] use npm orga `@recwhale`
- [x] use github actions

### others

need lerna ? only for dependencies otherwise can loop on src/**/packages.json and build/publish

#### lerna details

- https://medium.com/@jsilvax/a-workflow-guide-for-lerna-with-yarn-workspaces-60f97481149d
- https://dev.to/xaviercanchal/monorepo-using-lerna-conventional-commits-and-github-packages-4m8m
- https://dev.to/xaviercanchal/automatic-versioning-in-a-lerna-monorepo-using-github-actions-4hij
---
- https://github.com/NiGhTTraX/ts-monorepo
- https://medium.com/@NiGhTTraX/how-to-set-up-a-typescript-monorepo-with-lerna-c6acda7d4559
---
- https://stackoverflow.com/questions/43281741/how-to-use-paths-in-tsconfig-json

#### sample
- https://github.com/react-cosmos/react-cosmos
- https://github.com/ovieokeh/dummy-counter

- https://devsday.ru/blog/details/43682
- https://github.com/CryogenicPlanet/typescript-monorepo-example

- https://react-styleguidist.js.org/
- https://divotion.com/blog/creating-a-component-library-with-vite-and-storybook

- https://pnpm.io/workspaces
- https://pnpm.io/cli/recursive
- https://vitejs.dev/guide/build.html#library-mode

#### publish dist only ?

```json
"main": "dist/index.js",
"types": "dist/index.d.ts",
"files": ["dist"],
"publishConfig": {
  "directory": "dist"
},
```

"packageManager": "pnpm@6.22.2"

TODO: remove lerna
TOOD: facto tsconfig-react

test2

****
https://react-ts-recwhale.stackblitz.io

https://codesandbox.io/s/recwhale-691fm

***
consider `luxon` instead of `moment`
