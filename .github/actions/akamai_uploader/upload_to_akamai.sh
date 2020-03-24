#!/usr/bin/env sh

mkdir -p ~/.ssh
chmod 0700 ~/.ssh
echo "$SSH_KEY_AKAMAI" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa

scp -i ~/.ssh/id_rsa -o "HostKeyAlgorithms=+ssh-dss" -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking=no" -o "PubkeyAcceptedKeyTypes=+ssh-rsa" -r $BUILD_OUTPUT_DIR/* sshacs@$DOMAIN_NAME_PREFIX.scp.upload.akamai.com:$TARGET_PATH
