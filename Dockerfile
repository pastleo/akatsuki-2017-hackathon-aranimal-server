FROM ruby:2.4.1-alpine3.4

MAINTAINER chgu82837@gmail.com

RUN \
apk add -U \
build-base \
sqlite-dev \
tzdata \
bash \
nodejs \
git \
less

RUN \
gem install rails

