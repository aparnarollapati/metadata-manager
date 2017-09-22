# Metadata Management System (MMS)
## Note, this project is active in SVN and only exists here for test purposes

A metadata authoring web application which streamlines and centralizes the metadata authoring operations within HMH. Provides full control, traceability and automated validation against all metadata creation operations for TC and HMOF platforms.

[Live: MMS Application](http://dubvdvwf05:8080/mms)

[Main MMS Page in Confluence](https://confluence.hmhco.com/display/tool/Metadata+Management+System)

# Overview

A metadata authoring web application which streamlines and centralizes the metadata authoring operations within HMH. Provides full control, traceability and automated validation against all metadata creation operations for TC and HMOF platforms.

# Quick Start

## Build the application
MMS is a Grails-AngularJs Application. 
Clone the repository from the project root.

execute:
```bash
   ./gradlew jar
 ```
This command builds the application and generate the war file under ./build/libs/mms.jar

Build the docker image for mms from the project root(While executing below command copy the jar file into the docker host root folder and build the MMS Application).

```bash
docker build -t mms .
```
Run the MySQL docker image

```bash
docker run -d --name=db -e MYSQL_ROOT_PASSWORD=root -e MYSQL_PASSWORD=root -e MYSQL_DATABASE=mms -p 3306:3306 mysql
```
Link  MMS image and MySQL docker image with docker commands

```bash
docker run -ti -p8080:8080 --rm --link db:mysql mms
```
                                                (OR)
                                
Use Docker Compose to start up the end to end development environment. From the project root.

execute:

```bash
docker-compose up -d
```

This command will pull the Mysql:latest image and mms image and start up the API.

### Please wait this might take a several minutes...
```bash
docker-compose logs -f ># Follow log output
```
## Open your browser :

•	http://localhost:8080/mms 

## Stop and clear services
```bash
docker-compose down -v
```
