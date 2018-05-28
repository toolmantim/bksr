# Let's use the buildkite plugin-tester to get bats, as it has pretty up-to-date
# bats support and uses Lox's bats-mock
FROM buildkite/plugin-tester:latest@sha256:973f078d7d648c88cd211dbaf6edcd17bd18778a6fda0aa9e00a7cf8fba32006 as bats

# And let's get the latest v3 agent
FROM buildkite/agent:3@sha256:ea3b0155773ce3da87d1eee8c76827adbd0e094c241f75a67dfa1916decca478 as agent

FROM    node:9-alpine@sha256:91d8397253ab507f0fbd0ca5b1a423c5a5f011b07650719dc28d1d5484cf031c
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
