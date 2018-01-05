# Tokenator

The Open Tokenizer Project


#### Configure the application.properties file
```
$ cd Tokenator/src/main/resources
$ cp application.properties-TEMPLATE application.properties
$ vi application.properties
# Edit properties to your environment
```

#### Create your MySQL user and schema
If you're using MySQL, you can use the commands below to create a database
and role user for it before running tokenator for the first time:
```
create database YOUR_DB_SCHEMA_NAME;

create user 'YOUR_TOKENATOR_USERNAME'@'localhost' identified by 'YOUR_PASSWORD';
create user 'YOUR_TOKENATOR_USERNAME'@'%' identified by 'YOUR_PASSWORD';

grant all privileges ON YOUR_DB_SCHEMA_NAME.* TO 'YOUR_TOKENATOR_USERNAME'@'localhost';
grant all privileges ON YOUR_DB_SCHEMA_NAME.* TO 'YOUR_TOKENATOR_USERNAME'@'%';

flush privileges;
quit;
```

#### Build and run the project
```
./gradlew clean bootRun
```

```
$ curl -X POST -H 'Content-Type: application/json' -d '{"pan": "4046460664629L", "expr": "2201"}' http://localhost:8080/api/v1/primaries/
```

