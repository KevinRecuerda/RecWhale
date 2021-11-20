                   # RecWhale
:whale: Provide some extensions tools


### start
```sh
npx lerna init -i
```

### add dependencies
```sh
npx lerna add a --scope=b --scope=c --scope=d

npx lerna bootstrap
npx lerna ls
```

### CD
```sh
npx lerna changed

npx lerna publish --no-git-tag-version --no-push
  
npx lerna version --conventional-commits --yes
npx lerna publish --from-git
npx lerna publish --from-package

npx lerna publish from-package --conventional-commits --yes

npx lerna changed
```


### Next steps:

- [x] publish multiple with lerna
- [x] test dependencies
- [x] publish version auto

- [ ] test lib ts
- [ ] test lib ts extension
- [ ] test lib react


### others
need lerna ? only for dependencies
otherwise can loop on src/**/packages.json and build/publish


lerna details: https://medium.com/@jsilvax/a-workflow-guide-for-lerna-with-yarn-workspaces-60f97481149d