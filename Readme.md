
# Walley

Walley is a fullstack money transfering app based on CRUD operation and follows the ACID propety.


## API Reference

#### To timely check the Server Status

```http
  GET api/v1/healthcheck
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**.  |

#### Signup route

```http
  POST /api/v1/users/signup
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required** |
| `email`      | `string` | **Required** |
| `password`      | `string` | **Required** |
| `fullname`      | `string` | **Required** |

### Login route

```http
POST /api/v1/users/login
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required** |
| `password`      | `string` | **Required** |

#### Transfer Money

```http
  POST /api/v1/account/transfer
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `amount`      | `number` | **Required** (The amount you want to send) |
| `to`      | `string` | **Required** ( useID you want to send the money to.) |
| `Authorization`      | `Bearer token` | **Required** (on signup/login jwt token are generated and sent through headers) |


#### To update user details

```http
    POST /api/v1/users/updateDetails
```

| Parameter | Type     | Description (Available after Authorization)                      |
| :-------- | :------- | :-------------------------------- |
| `password`      | `string` | Required if you want to update this |
| `fullname`      | `string` | Required if you want  to update this |

### To get the Balance (Only for logged in user)

```http
 GET /api/v1/account/balance
```
### To check the available users

```http
 GET /api/v1/users/bulk
 ```


 


## Installation

Install my-project with npm

For server side

```bash
  npm install 
  connect you Mongo_URI
  npm run start/npm run dev(for nodemon)
```
 For client side
```bash
 npm install
 npm run dev   
 ```
## Tech Stack

**Client:** React+Vite,TailwindCSS

**Server:** Node, Express

**Database:** MongoDB


## Appendix

Server Side:
Zod for validation,  jwt token for authentication,   bcrypt for password hashing, moongose as ORM are used.

Client Side:
react-router-dom,axios,dotenv are some of the packages used

