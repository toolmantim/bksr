# Let's use the buildkite plugin-tester to get bats, as it has pretty up-to-date
# bats support and uses Lox's bats-mock
FROM buildkite/plugin-tester:latest@sha256:38c4bc75d1886f0d2aa2d3416531397c11f260ef325fcbf1182755cc6f8a17db as bats

# And let's get the latest v3 agent
FROM buildkite/agent:3@sha256:974c7f8445b98188fb961a4886f376ddb74a64c1cd603d94f9bf986ef46183da as agent

FROM node:10.13.0-alpine@sha256:5ba2248f02abf173f0fb2bd6f84fca7f3616496c50c9333cdd362314ec2970d9
COPY    --from=bats /usr/local/bin/ /usr/local/bin/
COPY    --from=bats /usr/local/lib/ /usr/local/lib/
COPY    --from=bats /usr/local/libexec/ /usr/local/libexec/
COPY    --from=agent /usr/local/bin/buildkite-agent /usr/local/bin/buildkite-agent
RUN     apk add --no-cache git bash
WORKDIR /src/
ADD     package.json package-lock.json /src/
RUN     npm install
ADD     . /src/
