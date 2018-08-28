# Let's use the buildkite plugin-tester to get bats, as it has pretty up-to-date
# bats support and uses Lox's bats-mock
FROM buildkite/plugin-tester:latest@sha256:38c4bc75d1886f0d2aa2d3416531397c11f260ef325fcbf1182755cc6f8a17db as bats

# And let's get the latest v3 agent
FROM buildkite/agent:3@sha256:5500d91b34fef1701293aa2e31a9c06782735937430d5d6faae2c27121d24423 as agent

FROM node:10.9.0-alpine@sha256:e9a83aa3e7ea576b93a21195f2e318ef8075ceccbebaa8f6c333294e9aa51dbd
COPY    --from=bats /usr/local/bin/ /usr/local/bin/
COPY    --from=bats /usr/local/lib/ /usr/local/lib/
COPY    --from=bats /usr/local/libexec/ /usr/local/libexec/
COPY    --from=agent /usr/local/bin/buildkite-agent /usr/local/bin/buildkite-agent
RUN     apk add --no-cache git bash
WORKDIR /src/
ADD     package.json package-lock.json /src/
RUN     npm install
ADD     . /src/
