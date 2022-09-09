# Link Shortener Back End

Framework: ExpressJS

Database: MySQL

Click [here](https://github.com/gnohgnij/link_shortener) to view the repository for the front end

## Schema

**URLS**

| Fields      | Description                                                                       |
| ----------- | --------------------------------------------------------------------------------- |
| urlCode     | varchar(255), unique identifier of the URL, added to the end of the shortened URL |
| originalURL | varchar(255), the original URL                                                    |
| newURL      | varchar(255), the generated shortened URL                                         |

**API**

Base URL: https://shawwty.herokuapp.com/

GET /:urlCode

> Redirects the shortened URL to the original URL

POST /api/url/shorten

> Returns the shortened URL if the original URL already exists in the database, else it creates a new entry and returns a new shortened URL
