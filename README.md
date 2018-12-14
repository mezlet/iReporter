[![Build Status](https://travis-ci.org/mezlet/iReporter.svg?branch=develop)](https://travis-ci.org/mezlet/iReporter)
[![Coverage Status](https://coveralls.io/repos/github/mezlet/iReporter/badge.svg?branch=develop)](https://coveralls.io/github/mezlet/iReporter?branch=develop)

# iReporter
Corruption is a huge bane to Africa’s development. African countries must develop novel and localised solutions that will curb this menace, hence the birth of iReporter. iReporter enables any/every citizen to bring any form of corruption to the notice of appropriate authorities and the general public. Users can also report on things that needs government intervention



## API Documentation
## Endpoints
- `/auth` -> **User Authentication** 
  - [Sign Up](#sign-up) 
  - [Login](#login)

- `/incidents` ->  **Get Incidents**
  - [Create Incident](#create-incident)
  - [Update an Incident](#update-incident)
  - [Delete an Incident](#delete-incident)
  - [Get an Incident](#get-incident)
  - [Get all Incidents](#get-all-incidents)
  - [Get My Incidents](#get-my-incidents)
  - [Update Incident Comment](#update-incident-comment)
  - [Update an Incident Location](#update-incident-location)
  - [Update an Incident Status](#update-incident-status-[Admin-Only]) [Admin Only]

- `/redflag` -> **Red Flag Incidents**
  - [Get all Redflags](#get-all-redflags)

- `/interventions` -> **Intervention Incidents**
  - [Get all Interventions](#get-all-interventions)


## Sign Up
#### POST `/api/v1/auth/signup`
**Request Body**
```json
{
  "firstname": "James",
  "lastname": "Bond",
   "othernames": "Theresa",
   "email": "james.bond@gmail.com",
   "phonenumber": "5467897543",
   "username": "james.bond",
   "password": "strongPassword"
}
```
**Success Response**
```json
{
  "status": 201,
  "data": [
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cI6IkpdXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTU0NDY3NTc2NiwiZXhwIjoxNTQeMjgwNTY2fQ.MiV2R4KHhoQ1Ka3cpjLiGC5XRW8Z3zbS9kc2sdgmeAw",
      "user": {
        "id": 3,
        "firstname": "James",
        "lastname": "Bond",
        "othernames": "Zack",
        "email": "james.bond@gmail.com",
        "username": "james.bond",
        "phonenumber": "5467897543",
        "registered": "2018-12-13T04:36:06.420Z",
        "isadmin": false
      }
    }
  ]
}
```

## Login
#### POST `/api/v1/auth/login`
**Request Body**
```json
{
   "email": "jones@gmail.com",
   "password": "1234"
}
```

**Success Response**
```json
{
  "status": 200,
  "data": [
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU0NDY3MzYzNywiZXhwIjoxNTQ1Mjc4NDM3fQ._ZlOHUfXPVuVtm0B_jAQTOWC0WylO-8kKchZvGdO24Q",
      "user": {
        "id": 1,
        "firstname": "Stephen",
        "lastname": "Jones",
        "othernames": "Zack",
        "email": "jones@gmail.com",
        "username": "mike12",

        "phonenumber": "5467897543",
        "registered": "2018-12-13T03:58:52.980Z",
        "isadmin": false
      }
    }
  ]
}
```

## Create Incident
#### POST `/api/v1/incident`
**Request Body**
```json
{
  "type": "red-flag",
  "location": "8.33, 42.44", 
  "image": "incident_img333.png",
  "video": "incident_vid44.mp4",
  "comment": "I found some policemen taking bribe from a motorist who was transporting a bag full of marijuana with him"
}
```
NB: `type` can be any of the followings strings `["red-flag", "intervention"]`.

**Success Response**

```json
{
  "status": 201,
  "data": [
    {
      "user": {
        "id": 9,
        "type": "red-flag",
        "status": "pending",
        "location": "8.33, 42.44",
        "comment": "I found some policemen taking bribe from a motorist who was transporting a bag full of marijuana with him",
        "image": ["incident1.png"],
        "video": ["incident1.mp4"],
        "createdby": 1,
        "createdon": "2018-12-13T05:11:29.929Z"
      }
    }
  ]
}
```

## Update Incident
#### PATCH `/api/v1/incident/<incident ID>`
**Request Body**
```json
{
  "comment": "I found some policemen taking bribe from a motorist who was transporting a bag full of marijuana with him. I later found out that this policeman is an high-ranking officer in the Nigerian police"
}
```

**Success Response**
```json
{
  "status": 200,
  "data": [
    {
      "data": {
        "id": 9,
        "type": "red-flag",
        "status": "pending",
        "location": "8.33, 42.44",
        "comment": "I found some policemen taking bribe from a motorist who was transporting a bag full of marijuana with him. I later found out that this policeman is an high-ranking officer in the Nigerian police",
        "image": ["incident1.png"],
        "video": ["incident1.mp4"],
        "createdby": 1,
        "createdon": "2018-12-13T05:11:29.929Z"
      }
    }
  ]
}
```

## Delete Incident
#### DELETE `/api/v1/incident/<incident ID>`
**Success Response**
```json
```

## Get Incident
#### GET `/api/v1/incident/<incident ID>`
**Success Response**
```json
{
  "status": 200,
  "data": {
    "id": 1,
    "type": "red-flag",
    "status": "pending",
    "location": "8.33, 42.44",
    "comment": "I slept off, again",
    "image": "incident1.png",
    "video": "incident1.mp4",
    "createdby": 1,
    "createdon": "2018-12-13T04:08:08.125Z"
  }
}
```

## Get My Incidents
#### GET `/api/v1/incident/me`
**Success Response**
```json
{
  "status": 200,
  "data": [
    {
      "id": 1,
      "type": "red-flag",
      "status": "resolved",
      "location": "6.44, 3.22",
      "comment": "Ikeja Electricity employees have been constantly taking bribes and extorting the people of Ikotun community",
      "image": ["incident_image_1.png"],
      "video": ["incident1_video_1.mp4"],
      "createdby": 1,
      "createdon": "2018-12-13T04:08:08.125Z"
    },
    {
      "id": 9,
      "type": "intervention",
      "status": "pending",
      "location": "8.33, 42.44",
      "comment": "We need Ikeja Electricity to come fix our transformer, we have been in the dark for 20 years now",
      "image": ["incident_13.png"],
      "video": ["incident_11.mp4"],
      "createdby": 1,
      "createdon": "2018-12-13T05:11:29.929Z"
    }
  ]
}
```

## Get All Incidents
#### GET `/api/v1/incident`
**Success Response**
```json
{
  "status": 200,
  "data": [{
      "status": 200,
      "data": {
        "id": 1,
        "type": "red-flag",
        "status": "pending",
        "location": "8.33, 42.44",
        "comment": "I found some policemen taking bribe from a motorist who was transporting a bag full of marijuana with him. I later found out that this policeman is an high-ranking officer in the Nigerian police",
        "image": ["incident1.png"],
        "video": ["incident1.mp4"],
        "createdby": 1,
        "createdon": "2018-12-13T05:11:29.929Z"
  },
  {
        "id": 2,
        "type": "intervention",
        "status": "resolved",
        "location": "8.33, 42.44",
        "comment": "The road to my house is bad. It is in dire need of repair to avoid loss of lives and properties",
        "image": ["incident13.png"],
        "video": ["incident133.mp4"],
        "createdby": 1,
        "createdon": "2018-12-13T05:11:29.929Z"
  }]
}
```

## Update Incident Comment
#### PATCH `/api/v1/incident/<incident ID>/comment`
**Request Body**
```json
{
  "comment": "I found some policemen taking bribe from a motorist who was transporting a bag full of marijuana with him. I later found out that this policeman is an high-ranking officer in the Nigerian police. This man has been in the force for a little over 15 year."
}
```
**Success Response**
```json
{
  "status": 200,
  "data": {
    "id": 9,
    "type": "red-flag",
    "status": "pending",
    "location": "8.33, 42.44",
    "comment": "I found some policemen taking bribe from a motorist who was transporting a bag full of marijuana with him. I later found out that this policeman is an high-ranking officer in the Nigerian police. This man has been in the force for a little over 15 year.",
    "image": ["incident1.png"],
    "video": ["incident1.mp4"],
    "createdby": 1,
    "createdon": "2018-12-13T05:11:29.929Z"
  }
```


## Update Incident Location
#### PATCH `/api/v1/incident/<incident ID>/location`
**Request Body**
```json
{
  "location": "8.20, 42.10"
}

```

**Success Response**
```json
{
  "status": 200,
  "data": {
    "id": 9,
    "type": "red-flag",
    "status": "pending",
    "location": "8.20, 42.10",
    "comment": "I found some policemen taking bribe from a motorist who was transporting a bag full of marijuana with him. I later found out that this policeman is an high-ranking officer in the Nigerian police. This man has been in the force for a little over 15 year.",
    "image": ["incident1.png"],
    "video": ["incident1.mp4"],
    "createdby": 1,
    "createdon": "2018-12-13T05:11:29.929Z"
  }
```


## Update Incident Status [Admin Only]
#### PATCH `/api/v1/incident/<incident ID>/status`
**Request Body**
```json
{
  "status": "resolved"
}
```

**Success Response**
```json
{
  "status": 200,
  "data": {
    "id": 9,
    "type": "red-flag",
    "status": "resolved",
    "location": "8.20, 42.10",
    "comment": "I found some policemen taking bribe from a motorist who was transporting a bag full of marijuana with him. I later found out that this policeman is an high-ranking officer in the Nigerian police. This man has been in the force for a little over 15 year.",
    "image": ["incident1.png"],
    "video": ["incident1.mp4"],
    "createdby": 1,
    "createdon": "2018-12-13T05:11:29.929Z"
  }
```
NB: Status can have values `["pending", "rejected", "resolved"]`

## Get All Redflags
#### GET `/api/v1/redflags`
**Success Response**
```json
{
  "status": 200,
  "data": [
    {
      "id": 1,
      "type": "red-flag",
      "status": "pending",
      "location": "6.44, 3.22",
      "comment": "An issue of corruption which is yet to be resolved for 3 years now",
      "image": ["incident1.png"],
      "video": ["incident1.mp4"],
      "createdby": 3,
      "createdon": "2018-12-13T04:08:08.125Z"
    },
    {
      "id": 9,
      "type": "red-flag",
      "status": "resolved",
      "location": "8.33, 42.44",
      "comment": "Here is an example of a red flag which is very very red",
      "image": ["incident1.png"],
      "video": ["incident1.mp4"],
      "createdby": 1,
      "createdon": "2018-12-13T05:11:29.929Z"
    }
  ]
}
```

## Get All Intervention
#### GET `/api/v1/intervention`
**Success Response**
```json
{
  "status": 200,
  "data": [
    {
      "id": 4,
      "type": "intervention",
      "status": "pending",
      "location": "6.44, 3.22",
      "comment": "...",
      "image": ["incident1.png"],
      "video": ["incident1.mp4"],
      "createdby": 3,
      "createdon": "2018-12-13T04:08:08.125Z"
    },
    {
      "id": 3,
      "type": "intervention",
      "status": "resolved",
      "location": "8.33, 42.44",
      "comment": "...",
      "image": ["incident1.png"],
      "video": ["incident1.mp4"],
      "createdby": 1,
      "createdon": "2018-12-13T05:11:29.929Z"
    }
  ]
}
```
