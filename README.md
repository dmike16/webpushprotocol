# Web Push [RFC8030]

## About this Repo

This [monorepo](https://github.com/babel/babel/blob/master/doc/design/monorepo.md)
contains the _nuts and bolts_ utility libraries that facilitate the implementations of the protocol.

### Workflow tracking

For feat and bug iusses 

1. create a local branch of name _i$number-issue\_$milestone_ from _experiment_
2. push the branch if necessary
3. create a merge request into _experiment_ branch (only admin can merge local iusse branch into _experiment_)

For test iusse

1. create a testing iusse
2. create a local branch of name _i$number-issue\_$milestone_ from _testing_
3. create a merge request into _testing_ branch (only admin can merge local iusse branch into _testing_)

When the mileston is completed. Create a merge request from _testing_ to _master_.

#### Create new issues

- [Bug](https://github.com/dual-lab/webpushprotocol/issues/new?template=Bug.md) - bug fixing request
- [Feat](https://github.com/dual-lab/webpushprotocol/issues/new?template=Feat.md) - proposal request
- [Test](https://github.com/dual-lab/webpushprotocol/issues/new?template=Test.md) - testing feature

### Create pull requests

- [TEST-TO-MASTER](https://github.com/dual-lab/webpushprotocol/pulls/new/testing?template=Pull_Request.md)
