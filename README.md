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

Or run it directly using [npx](https://github.com/zkat/npx):

```
$ npx bksr
```

## Requirements

* [buildkite-agent](https://buildkite.com/docs/agent) v3+

## Roadmap

* Support step/pipeline env vars
* Support pipelines from STDIN (`bksr -`)
* Option for running all pipeline steps in sequence?
* Stubbing out artifact/metadata/pipeline commands?

## Previous artwork

* https://github.com/SomeoneWeird/bkrun

## Developing

There's no tests yet, but they're coming soon.

## License

See [LICENSE](LICENSE) (ISC)