> This has been discontinued, and you should now use the [Buildkite CLI](https://github.com/buildkite/cli)

# bksr - Buildkite Step Runner

[![NPM package](https://img.shields.io/npm/v/bksr.svg)](https://www.npmjs.com/package/bksr)

Run and test your [Buildkite](https://buildkite.com/) pipeline steps locally, just as they'd run in CI,
using the [buildkite-agent bootstrap](https://buildkite.com/docs/agent) itself.

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
* Can run a fresh checkout, emulating a clean CI agent environment

## Installation

On macOS using [Homebrew](https://brew.sh):

```
$ brew install toolmantim/bksr/bksr
```

Everywhere else:

```
$ npm i -g bksr
```

Or, with [npx](https://blog.npmjs.org/post/162869356040/introducing-npx-an-npm-package-runner)

```
$ npx bksr
```

Or, like srsly:

```
$ alias bksrsly=bksr
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

### Small stuff

* Fix examples not showing in `--help`
* Homebrew

### Bigger stuff

* Support env var substituion in pipeline.yml ([buildkite/agent#765](https://github.com/buildkite/agent/pull/765))
* Support setting env vars based on pipeline.yml
* Hide build output via header collapsing
* Local-mode artifact/metadata/pipeline commands
* Bundling the buildkite-agent binary maybe?

## Developing

You can run it locally by invoking `lib/bksr.js` from the command line:

```
$ cd ~/some-project
$ ~/path-to-bksr-checkout/bin/bksrc.js
```

To run the unit and integration tests:

```
$ docker-compose run --rm tests
```

Or, you can use bksr itself 😱

```
$ bin/bksr.js --all
```

## Releasing

Run the following command:

```bash
git checkout master && git pull && npm version [major | minor | patch]
```

The command does the following:

* Ensures you’re on master and don't have local, un-commited changes
* Bumps the version number in [package.json](package.json) based on major, minor or patch
* Runs the `postversion` npm script in [package.json](package.json), which:
  * Pushes the tag to GitHub
  * Publishes the npm release
  * Opens the GitHub releases page so you can publish the release notes

## Previous artwork

* https://github.com/SomeoneWeird/bkrun

## License

See [LICENSE](LICENSE) (ISC)
