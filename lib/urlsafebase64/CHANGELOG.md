# Credits
Inspired by [urlsafe-base64](https://github.com/RGBboy/urlsafe-base64)

# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- gulpfile to traspile the ts code in JavaScript
- ts-node configuration file
- Test for encode, decode, update, digest function.
- \@Seald decorator to the main class, to seal the object [Object.seal](https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)
- Typescript implementation of class UrlsafeBase64

### Changed
- Now the UrlsafeBase64 class is a Transform stream, like class from
 crypto library
- Use Yarn package manager on top of npm. [Yarn](https://yarnpkg.com/lang/en/)

[Unreleased]: https://github.com/dmike16/webpushprotocol/tree/wpp-ts-d.1.0/lib/urlsafebase64
