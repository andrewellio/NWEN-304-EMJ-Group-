### ALL POSSIBLE REQUESTS

GET http://localhost:3000/api/movies
GET http://localhost:3000/api/movies/:id
POST http://localhost:3000/api/movies 
PATCH http://localhost:3000/api/movies/:id 
DELETE http://localhost:3000/api/movies/:id - Deletes the movie with the id specified
POST http://localhost:3000/api/login 

### Movies:

GET http://localhost:3000/api/movies 
responds with all movies
If an error occures, sends a 500 status with "Server Error"

GET http://localhost:3000/api/movies/:id 
responds with movie with the specified id
If id is not found, sends a 400 status with "Cannot find movie"
If error occurs, sends a 500 status with "Server error" 

REQUIRES JSON WEBTOKEN FROM ADMIN ACCOUNT FOR NEXT 3

POST http://localhost:3000/api/movies 
Adds a movie to the database. Body sent of format:
{
    "title": String,
    "director": Array of strings,
    "genres": Array of strings,
    "actors": Array of strings,
    "runtime": Integer,
    "release": Integer,
    "summary": String,
    "ageRating": String,
    "price": Integer,
    "poster": String,
    "trailer": String
}
If a token is not supplied, responds with a 401 status with "Need a token"
If the token is invalid, responds with a 400 status with "Invalid Token"
If the movie inputted is invalid, responds with a 400 status with "Invalid movie"

PATCH http://localhost:3000/api/movies/:id 
Edits a movie from the database. Body is same as above however you only need the fields that you want to edit ie.
{
    "title": "Readpool",
    "runtime": 120
}
This would change the title and runtime.
If a token is not supplied, responds with a 401 status with "Need a token"
If the token is invalid, responds with a 400 status with "Invalid Token"
If one of the fields inputted is invalid, responds with a 400 status with "Invalid movie"
if it catches an error, responds with a 500 status with "Server error"

DELETE http://localhost:3000/api/movies/:id 
Deletes the movie with the id specified
If a token is not supplied, responds with a 401 status with "Need a token"
If the token is invalid, responds with a 400 status with "Invalid Token"
If the id is invalid, responds with a 400 status with "Invalid movie"
If a server error occurs, responds with a 500 status with "Server error"

### Users:

POST http://localhost:3000/api/register
Registers inputted account of format:
{
    "usr": String,
    "psw": String,
    "email": String,
    "name": String
}
If the details are invalid it sends a 400 status

POST http://localhost:3000/api/login 
Used to login, responds with json web token. Format used:
{
    "usr": String,
    "psw": String
}
If the details are invalid, sends a 401 status




