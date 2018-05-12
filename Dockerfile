# Let's use the buildkite plugin-tester to get bats, as it has pretty up-to-date
# bats support and uses Lox's bats-mock
FROM buildkite/plugin-tester as bats

FROM    node:9-alpine
# Integration testing deps
COPY    --from=bats /usr/local/bin/ /usr/local/bin/
COPY    --from=bats /usr/local/lib/ /usr/local/lib/
COPY    --from=bats /usr/local/libexec/ /usr/local/libexec/
# Run-time deps
RUN     apk add --no-cache git bash
ADD     https://download.buildkite.com/agent/stable/3.1.1/buildkite-agent-linux-amd64 /usr/local/bin/buildkite-agent
RUN     chmod +x /usr/local/bin/buildkite-agent
# The actual app
WORKDIR /src/
ADD     package.json package-lock.json /src/
RUN     npm install
ADD     . /src/
