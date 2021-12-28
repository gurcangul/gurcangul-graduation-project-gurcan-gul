# Getir Node.js Bootcamp Graduation Project Gürcan Gül


## To  deploy application locally:

* `npm install`
* `npm start` 
* `npm run test` 

# The app running on localhost:4545

**Also application is deployed on heroku:**: 
https://graduation-project-gurcan-gul.herokuapp.com/





Method: `POST`

**The request payload will include a JSON with 4 fields.**

```json
{
    "startDate": "2016-01-26",
    "endDate": "2018-02-02",
    "minCount": 2700,
    "maxCount": 3000
 
}
```

**Response payload should have 3 main fields:**

```json
{
    "code":0,
    "msg":"Success",
    "records":[
{
    "key":"TAKwGc6Jr4i8Z487",
    "createdAt":"2017-01-28T01:22:14.398Z",
    "totalCount":2800
},
{
    "key":"NAeQ8eX7e5TEg7oH",
    "createdAt":"2017-01-27T08:19:14.135Z",
    "totalCount":2900
}
]
```
