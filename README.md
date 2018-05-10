# bksr - Buildkite Step Runner

[![NPM package](https://img.shields.io/npm/v/bksr.svg)](https://www.npmjs.com/package/bksr)

Run and test your Buildkite pipeline steps locally, just as they'd run in CI, using the buildkite-agent itself. Super handy for running steps that use Buildkite Plugins.

## Usage

```
$ cat .buildkite/pipeline.yml 
steps:
  - label: ":shell: Shellcheck"
    plugins:
      shellcheck#v1.0.1:
        files: hooks/**
  - label: ":sparkles: Lint"
    plugins:
      plugin-linter#v1.0.0:
        name: my-plugin
  - label: ":shell: Tests"
    plugins:
      docker-compose#v2.1.0:
        run: tests
$ bksr
? Choose a pipeline step to run (Use arrow keys)
❯ :shell: Shellcheck
  :sparkles: Lint
  :shell: Tests
```

## Installation

```
$ npm i -g bksr
```

Or, run it directly using [npx](https://github.com/zkat/npx):

```
$ npx bksr
```

Or if you'd like to be a little more srs about it:

```
$ ln -s $(which bksr) /usr/local/bin/bksrsly
```

## Requirements

* [buildkite-agent](https://buildkite.com/docs/agent) v3+

## Roadmap

* `--help` output
* Specifying custom pipeline.yml paths
* Support reading pipelines from STDIN (`bksr -`)
* Support setting env vars based on pipeline.yml
* Support env var substituion in pipeline.yml
* Stubbing out artifact/metadata/pipeline commands?
* Option for running all pipeline steps in sequence?

## Previous artwork

* https://github.com/SomeoneWeird/bkrun

## Developing

At the moment all dev and testing is by running `src/bksr.js` from the command line directly:

```
$ cd ~/some-project
$ ~/path-to-bksr-checkout/src/bksrc.js
```

For convenience, you can symlink it into your `$PATH`, for example:

```
$ ln -s ~/path-to-bksr-checkout/src/bksrc.js /usr/local/bin/bksr
$ cd ~/some-project
$ bksr
```

There's no tests yet, but they're coming soon.

## License

See [LICENSE](LICENSE) (ISC)