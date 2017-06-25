FROM jmfirth/webpack:7

WORKDIR /web

RUN yarn global add history-server

ADD package.json package.json
RUN yarn install

ADD . .
RUN yarn run build

CMD history-server build --port 80
