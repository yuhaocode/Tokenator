
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


###### Create a Primary entry
The PAN below may already exist in the database, so adjust the number or
expiration (YYMM) as needed.  You can optionally place a single 'L' character
anywhere in the PAN and it will be replaced by the digit that yields a valid
Luhn check over the entire account number.

```
$ curl -X POST -H 'Content-Type: application/json' -d '{"pan": "4046460664629L", "expr": "2201"}' http://localhost:4040/api/v1/primaries/
```
###### Output of Primary Entry Creation
```
{
  "id" : 9,
  "pan" : "40464606646297",
  "expr" : "2201",
  "surrogates" : [{
  "id" : 5,
  "san" : "98765432109875",
  "expr" : "1801"
} ]
}
```

###### Retrieve a Primary entry
By ID (in this example using ID=9):
```
$ curl -X GET http://localhost:8080/api/v1/primaries/9
```
By PAN and expiration (YYMM):
```
$ curl -X GET http://localhost:8080/api/v1/primaries/40464606646297/2201
```
Later we'll also show how to retrieve a primary entry by one of its surrogate
entries.



###### Delete a Surrogate Entry
The command below deletes the surrogate ID=5.  The ID values of surrogates are
separate from primary ID values, but globaly unique between surrogates.
````
$ curl -X DELETE http://localhost:8080/api/v1/surrogates/5
```

###### Delete a Primary Entry
Delete the primary entry with ID=9.
````
$ curl -X DELETE http://localhost:8080/api/v1/primaries/9
````
###### Notes:
Successful HTTP Response Codes:
* 200 (OK) - successful lookup
* 201 (Created) - successful creation
* 204 (No Content) - successful deletions (response body is empty)

Error HTTP Response Codes:
* 400 (Bad Request) - most likely an invalid parameter
* 404 (Not Found) - lookup of entry that doesn't exist
* 409 (Conflict) - attempt to create an entry that already exists
