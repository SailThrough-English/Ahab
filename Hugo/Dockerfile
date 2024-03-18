FROM node:20-buster


ENV DART_SASS_VERSION 1.32.8

RUN apt update \
    && apt install -y curl \
    && curl -LJO https://github.com/sass/dart-sass/releases/download/${DART_SASS_VERSION}/dart-sass-${DART_SASS_VERSION}-linux-x64.tar.gz \
    && tar -xvzf dart-sass-${DART_SASS_VERSION}-linux-x64.tar.gz -C /usr/local/bin \
    && rm dart-sass-${DART_SASS_VERSION}-linux-x64.tar.gz

RUN apt install -y golang-go
RUN apt install -y hugo


WORKDIR /app

COPY . .
RUN cd /app
CMD [ "hugo", "server", "--bind", "0.0.0.0" ]