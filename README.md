# bksr - Buildkite Step Runner

[![NPM package](https://img.shields.io/npm/v/bksr.svg)](https://www.npmjs.com/package/bksr)

Run and test your [Buildkite](https://buildkite.com/) pipeline steps locally, just as they'd run in CI,
using the [buildkite-agent](https://buildkite.com/docs/agent) itself.

```
$ bksr
? Choose a pipeline step to run (Use arrow keys)
❯ :shell: Shellcheck
  :sparkles: Lint
  :shell: Tests
```

Features:

* Runs any Buildkite command pipeline step, including those that use plugins
* Won’t accidentally run steps designed for branches (such as 'master' only release steps)
* Can run dynamic pipelines via STDIN
* Can run all steps in sequence, including specifying a branch for branch filtering
* Can run a fresh un-cached checkout, emulating exactly what an agent might do

## Installation

```
$ npm i -g bksr
```

Or, run it directly using [npx](https://github.com/zkat/npx):

```
$ npx bksr
```

Or, like srsly:

```
$ ln -s $(which bksr) /usr/local/bin/bksrsly
$ bksrsly
? Choose a pipeline step to run (Use arrow keys)
❯ :shell: Shellcheck
  :sparkles: Lint
  :shell: Tests
```

## Usage

```
bksr

Run and test your Buildkite pipeline steps locally, just as they'd run in CI,
using the buildkite-agent itself.

Options:
  --step, -s      Label of the step to run                              [string]
  --all, -a       Run steps that don’t use branch filters              [boolean]
  --branch, -b    Run all steps matching the given branch               [string]
  --pipeline, -p  Path to the pipeline file, or "-" to read from STDIN
                                   [string] [default: ".buildkite/pipeline.yml"]
  --checkout, -c  Run steps in a fresh checkout       [boolean] [default: false]
  --version       Show version number                                  [boolean]
  --help          Show help                                            [boolean]
```

## Requirements

* [buildkite-agent](https://buildkite.com/docs/agent) v3+

## Roadmap

* Self-contained binaries (with homebrew tap)
* Support setting env vars based on pipeline.yml
* Support env var substituion in pipeline.yml
* Stubbing out artifact/metadata/pipeline commands?

## Developing

You can run it locally by invoking `lib/bksr.js` from the command line:

```
$ cd ~/some-project
$ ~/path-to-bksr-checkout/bin/bksrc.js
```

To run the tests locally:

```
$ npm test
```

Or via docker-compose:

```
$ docker-compose run app npm run test
$ docker-compose run app npm run bats
```

Or using bksr itself 😱:

```
$ bin/bksr.js --all
```

## Releasing

The following command will:

* Ensure you’re on master
* Update the version number in package.json
* Create and push the git tag
* Open GitHub releases so you can fill out release notes, and open previous
  releases so you can copy+pasta

```bash
git checkout master && git pull && npm version [major | minor | patch]
```

## Previous artwork

* https://github.com/SomeoneWeird/bkrun

## License

See [LICENSE](LICENSE) (ISC)
