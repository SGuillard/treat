ARG APACHE_VERSION
FROM httpd:${APACHE_VERSION}
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends make curl gcc pkg-config libglib2.0-dev awstats rsyslog rsync vim

