FROM docker.br.hmheng.io/base-ubuntu:16.04-jdk8
MAINTAINER Custom Development

# Define working directory.
WORKDIR /audit

# Define volume: your local app code directory can be mounted here
# Mount with: -v /your/local/directory:/audit
VOLUME ["/audit"]
# Allow the host to use gradle cache, otherwise gradle will always download plugins & artifacts on every build
VOLUME ["/root/.gradle/caches/"]

#ENV HOME /root

