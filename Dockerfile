# Let's use the buildkite plugin-tester to get bats, as it has pretty up-to-date
# bats support and uses Lox's bats-mock
FROM buildkite/plugin-tester:latest@sha256:7c2d08e8d6dc32637236105e82f6c161fe2a2c3098e9035a92eb1401b6593bdf as bats

# And let's get the latest v3 agent
FROM buildkite/agent:3@sha256:5500d91b34fef1701293aa2e31a9c06782735937430d5d6faae2c27121d24423 as agent

FROM node:10.8.0-alpine@sha256:962dc023d8598778df81a1a52719bd4ed7f341661742330bfdc72ca8241e58d6
COPY    --from=bats /usr/local/bin/ /usr/local/bin/
COPY    --from=bats /usr/local/lib/ /usr/local/lib/
COPY    --from=bats /usr/local/libexec/ /usr/local/libexec/
COPY    --from=agent /usr/local/bin/buildkite-agent /usr/local/bin/buildkite-agent
RUN     apk add --no-cache git bash
WORKDIR /src/
ADD     package.json package-lock.json /src/
RUN     npm install
ADD     . /src/
