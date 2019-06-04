ARG APACHE_VERSION
FROM httpd:${APACHE_VERSION}
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends make curl gcc pkg-config libglib2.0-dev awstats cron rsyslog rsync vim

COPY crontab.txt /etc/cron.d/eq-cron
RUN crontab /etc/cron.d/eq-cron

CMD /usr/sbin/cron && httpd-foreground
