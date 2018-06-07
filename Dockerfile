# Let's use the buildkite plugin-tester to get bats, as it has pretty up-to-date
# bats support and uses Lox's bats-mock
FROM buildkite/plugin-tester:latest@sha256:a784b49bb241291feb47b578a2cb58938d3565dff5b0f6d9bf627036cbd7f419 as bats

# And let's get the latest v3 agent
FROM buildkite/agent:3@sha256:ea3b0155773ce3da87d1eee8c76827adbd0e094c241f75a67dfa1916decca478 as agent

FROM    node:9-alpine@sha256:991c1808b9702a34e4eb04092065e968e70b6a7f190a63192daf35c31e4c14af
COPY    --from=bats /usr/local/bin/ /usr/local/bin/
COPY    --from=bats /usr/local/lib/ /usr/local/lib/
COPY    --from=bats /usr/local/libexec/ /usr/local/libexec/
COPY    --from=agent /usr/local/bin/buildkite-agent /usr/local/bin/buildkite-agent

# Required run-time deps
RUN     apk add --no-cache git bash

# The actual app
WORKDIR /src/
ADD     package.json package-lock.json /src/
RUN     npm install
ADD     . /src/
