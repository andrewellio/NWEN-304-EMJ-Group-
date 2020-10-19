ADMIN TEST ACCOUNT:
username: 
ADMIN
password:
Password123!

TEST MOVIE:
{
    "title": "Readpool",
    "director": ["Jim Tiller"],
    "genres": ["Adventure", "Comedy"],
    "actors": ["Ryan Reynolds", "Morena Baccarin", "T.J. Miller"],
    "runtime": 108,
    "release": 2016,
    "summary": "A wisecracking mercenary gets experimented on and becomes immortal but ugly, and sets out to track down the man who ruined his looks.",
    "ageRating": "R16",
    "price": "15",
    "poster": "https://m.media-amazon.com/images/M/MV5BYzE5MjY1ZDgtMTkyNC00MTMyLThhMjAtZGI5OTE1NzFlZGJjXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UY1200_CR85,0,630,1200_AL_.jpg",
    "trailer": "https://www.youtube.com/embed/ONHBaC-pfsk"
}

### Postman test commands:

GET http://localhost:3000/api/movies/
GET http://localhost:3000/api/movies/5f7ad7dd0c4fd342c8afa8a9 - Should return deadpool movie information
GET http://localhost:3000/api/movies/5f7ad7dd0c - Should return "Cannot find movie"

POST http://localhost:3000/api/register 
with body:
{
    "usr": "APITEST",
    "psw": "TESTPASSWORD123!",
    "email": "test@gmail.com",
    "name": "Jimmy"
}
Responds with "you are now registered"

POST http://localhost:3000/api/login
with body:
{
    "usr": "APITEST",
    "psw": "TESTPASSWORD123!",
}
Assuming this is done after the previous test, will return a json web token

For the next commands, the header should contain the key jwt with the value being a json web token from an admin account

POST http://localhost:3000/api/movies
with body:
{
    "title": "Readpool",
    "director": ["Jim Tiller"],
    "genres": ["Adventure", "Comedy"],
    "actors": ["Ryan Reynolds", "Morena Baccarin", "T.J. Miller"],
    "runtime": 108,
    "release": 2016,
    "summary": "A wisecracking mercenary gets experimented on and becomes immortal but ugly, and sets out to track down the man who ruined his looks.",
    "ageRating": "R16",
    "price": "15",
    "poster": "https://m.media-amazon.com/images/M/MV5BYzE5MjY1ZDgtMTkyNC00MTMyLThhMjAtZGI5OTE1NzFlZGJjXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UY1200_CR85,0,630,1200_AL_.jpg",
    "trailer": "https://www.youtube.com/embed/ONHBaC-pfsk"
}
will respond with "Added Readpool"

PATCH http://localhost:3000/api/movies/5f7ad7dd0c4fd342c8afa8a9
with body:
{
    "title": "pool",
    "runtime": 200
}
will respond with all the movie details with of the edited movie

DELETE http://localhost:3000/api/movies/5f7ad7dd0c4fd342c8afa8a9
will respond with removed movie