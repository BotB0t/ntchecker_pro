FROM postgres:9.6

RUN sed -i -e 's/# es_ES.UTF-8 UTF-8/es_ES.UTF-8 UTF-8/' /etc/locale.gen && \
    locale-gen
ENV LANG es_ES.UTF-8
ENV LANGUAGE es_ES:en
ENV LC_ALL es_ES.UTF-8

COPY create-ntchecker-db.sh /tmp/create-ntchecker-db.sh
RUN chmod 700 /tmp/create-ntchecker-db.sh

COPY create-ntchecker-user.sh /tmp/create-ntchecker-user.sh
RUN chmod 700 /tmp/create-ntchecker-user.sh

ENV POSTGRES_USER docker
ENV POSTGRES_DB docker
