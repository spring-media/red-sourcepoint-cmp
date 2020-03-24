FROM alpine:3.10

RUN apk update && \
    apk upgrade && \
    apk add --no-cache openssh-client

COPY upload_to_akamai.sh /upload_to_akamai.sh

ENTRYPOINT ["/upload_to_akamai.sh"]
