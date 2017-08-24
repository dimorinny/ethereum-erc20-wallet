FROM yarnpkg/node-yarn:node7

WORKDIR /web

RUN yarn global add history-server

ADD build .

CMD history-server . --port 80
