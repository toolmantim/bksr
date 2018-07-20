# Let's use the buildkite plugin-tester to get bats, as it has pretty up-to-date
# bats support and uses Lox's bats-mock
FROM buildkite/plugin-tester:latest@sha256:7c2d08e8d6dc32637236105e82f6c161fe2a2c3098e9035a92eb1401b6593bdf as bats

# And let's get the latest v3 agent
FROM buildkite/agent:3@sha256:1812fcd61c4e122fedbf0c749f8b0ec408678600260e495ca34bc0e2f7fd638a as agent

FROM node:10.6.0-alpine@sha256:91aabb2c118b03a5d8fd22efd07530a64309dcd41a8a11b83237edd8de3d00c2
COPY    --from=bats /usr/local/bin/ /usr/local/bin/
COPY    --from=bats /usr/local/lib/ /usr/local/lib/
COPY    --from=bats /usr/local/libexec/ /usr/local/libexec/
COPY    --from=agent /usr/local/bin/buildkite-agent /usr/local/bin/buildkite-agent
RUN     apk add --no-cache git bash
WORKDIR /src/
ADD     package.json package-lock.json /src/
RUN     npm install
ADD     . /src/
