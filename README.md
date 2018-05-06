# bksr - Buildkite Step Runner

Run and test your Buildkite pipeline steps locally, just as they'd run in CI, using the buildkite-agent itself.

## Usage

```
$ bksr
? Choose a pipeline step to run (Use arrow keys)
❯ :shell: Shellcheck 
  :sparkles: Lint
  :shell: Tests
```

## Installation

```
npm i -g bksr
```

## Requirements

* [buildkite-agent](https://buildkite.com/docs/agent) v3+

## Roadmap

* Support pipelines from STDIN (`bksr -`)
* Substitute env vars

Further ideas:

* Run pipeline steps in sequence
* Figuring out artifact/metadata/pipeline commands

## Previous artwork

* https://github.com/SomeoneWeird/bkrun

## License

See [LICENSE](LICENSE) (ISC)