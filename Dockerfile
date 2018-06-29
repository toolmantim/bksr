# Let's use the buildkite plugin-tester to get bats, as it has pretty up-to-date
# bats support and uses Lox's bats-mock
FROM buildkite/plugin-tester:latest@sha256:a784b49bb241291feb47b578a2cb58938d3565dff5b0f6d9bf627036cbd7f419 as bats

# And let's get the latest v3 agent
FROM buildkite/agent:3@sha256:56d57b8ccb2f8bd7d1d09d021a5a9c668da491ae1a97dcfc6b916b3ce6fd93e2 as agent

FROM    node:10.5.0-alpine@sha256:21b58de0d309e8b793fb508e610762e522074a3bd5bef6f3ff74b7bade338aec
COPY    --from=bats /usr/local/bin/ /usr/local/bin/
COPY    --from=bats /usr/local/lib/ /usr/local/lib/
COPY    --from=bats /usr/local/libexec/ /usr/local/libexec/
COPY    --from=agent /usr/local/bin/buildkite-agent /usr/local/bin/buildkite-agent
RUN     apk add --no-cache git bash
WORKDIR /src/
ADD     package.json package-lock.json /src/
RUN     npm install
ADD     . /src/
