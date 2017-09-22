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

RUN \
    apt-get update && \
    apt-get -y install unzip openjdk-8-jdk
RUN apt-get update && apt-get install -y \
curl

RUN apt-get update -qq
RUN apt-get install -y -qq git curl wget

# install npm
RUN apt-get install -y -qq npm
RUN ln -s /usr/bin/nodejs /usr/bin/node
# install bower
RUN npm install --global bower

RUN chmod +x /audit
RUN chmod +x /root
COPY gradle gradle
COPY \
  ./gradle \
  build.gradle \
  gradle.properties \
  gradlew \
  gradlew.bat \
  
  ./

RUN chmod +x gradlew 
RUN chmod +x ./gradlew 
RUN chmod +x ./gradlew.bat
RUN echo '{ "allow_root": true }' > /root/.bowerrc
RUN ./gradlew.bat clean
RUN ./gradlew.bat assemble

ADD build/libs/mms.jar app.jar

CMD ["java","-Djava.security.egd=file:/dev/./urandom", "-Djasypt.encryptor.password=5W1m1#1*fCv*UbIUzvsu","-jar","/audit/app.jar"]
