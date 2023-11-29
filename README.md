# Boilerplate: Fullstack with Sass

## Setup

### What's included

This repo includes:

* a single, simple API endpoint (`/api/v1/fruits`)
* a single React component (`<App />`)
* an example database module (`server/db/fruits.js`)
* an API client module (`client/apis/fruits.js`)
* configuration for Vitest and testing library
* configuration for server-side debugging in VS Code
* configuration for preprocessing Sass

### Installation

#### **From the Github UI**

See the instructions [here](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template) to use Github's feature to create a new repo from a template.

#### **From the command line**

```
git clone https://github.com/dev-academy-challenges/boilerplate-fullstack-query [your-project-name]
cd [your-project-name]
npm install # to install dependencies
npm run dev # to start the dev server
```

You can find the server running on [http://localhost:3000](http://localhost:3000) and the client running on [http://localhost:5173](http://localhost:5173).

---
[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=boilerplate-fullstack-query)

---
## Documentation

*Here is some starter documentation to get things going, you will update this as a team at the start of the project.

## Workflow

- Use the KANBAN to assign yourself a task, post comments in the tickets to describe what needs to be done/what you are working on.
- Move the tickets along the KANBAN as you progress.
- When you're ready to commit new changes, first commit to your branch & create a pull request to dev. Tell Blue when that's done and it will be finalised with two group members confirming.
- When your changes are committed to the dev branch by Blue, he then will communicate this to everyone so they can pull the latest changes from dev.


## Git workflow

Branch structure:

Main -> Dev -> feature-name branches

Make sure that:

- file and function naming conventions are maintained across the app
- errors are well handled
- no sensitive data should be exposed on the client side
- it passes npm run lint without any code-related warnings or errors
- no unnecessary comments or log messages are remaining
- that Types are used where applicable, and any Type issues should be resolved
- user-facing updates (front end/ css crew) should be checked for accessibility concerns (using the WAVE tool)
- Good naming distinction between similar elements

## Naming conventions

Be descriptive in each function/component name, reference the particular layer of the stack.
Note, more specific naming conventions to come.

Function names: 
- getAllBridgesDb()
- getFavBridgesDb()
- addFavBridgeDb()
- getAllBridgesApi()
- getBridgeApi()
- useBridgeMutation()

Component names
- BridgesList.tsx
- FavouriteBridges.tsx
- SingleBridge.tsx
- Home.tsx
- App.tsx


### Views (Client Side)

| name | MVP | purpose |
| --- | --- | --- |
| Home | Yes | Welcomes troll toll operators and links to the app (to all bridges) and sign in for stretch|
| Bridges | Yes | Display a list of bridges with toll collection data |
| Bridge | Yes | Display a single bridge using it's id with it's data |
| Login | No | View for the toll operator to enter their login credentials |
| Register | No | View for the toll operator to sign up |
| My Bridges | No | Display a list of favourite bridges saved by the user and active bridge|
| Analytics | No | Provide tools to analyze toll collection trends |

### API (Client - Server)

| Method | Endpoint | Protected | Usage | Response |
| --- | --- | --- | --- | --- |
| Get | /api/v1/bridges | No | Get all bridges with toll collection data | Array of Bridge Objects |
| Get | /api/v1/bridges/:id | No | Get one bridge with sats and toll collection data | Single Bridge Data |
| Post* | /api/v1/auth/login | Yes | Log In a Toll Operator | The Toll Operator's JWT Token |
| Post*| /api/v1/auth/register | Yes | Register a Toll Operator | The Toll Operator's JWT Token |
| Get* | /api/v1/bridges/fav | Yes | Get the list of favourite bridges a user has saved | Array of ints (int = an id) |
| Post* | /api/v1/bridges/fav | Yes | Add a saved favourite bridge to the db | 201 status code |

Endpoints with a * are stretch

### DB (Server Side)

Here is a start on your database you can update these in your documentation. The bridge seed data has already been done for you. 

### Bridges - already set up

| Column Name | Data Type | Purpose |
| --- | --- | --- |
| id | integer | Unique identifier for each bridge |
| name | string | Name of the bridge |
| location | string | Location of the bridge |
| type | string | Type of the bridge (e.g., Motorway bridge, Road bridge) |
| year_built | integer | Year the bridge was built |
| length_meters | string | Length of the bridge in meters |
| lanes | integer | Number of lanes on the bridge |
| added_by_user | integer | Troll toll operator userID who added the bridge data (auth0_id) |
| busyness | integer | density of bridge traffic determining estimated toll collected |

### Users/ Trolls - not set up

| Column Name | Data Type | Purpose |
| --- | --- | --- |
| id | integer | Unique identifier for each user |
| email| string | used to log in to account |
| first_name | string| trolls first name |
| last_name |string | troll's last name |
| auth0_id | string | Unique identifier used for auth supplied by auth0 when set up |


### Favourite Bridges (Many to Many / join table) - not set up

| Column Name | Data Type | Purpose |
| --- | --- | --- |
| id | integer | Unique identifier |
| user_id | integer | Which user saved the bridge |
| bridge_id | integer | Which bridge was saved |

### Toll Collected - not set up yet

| Column Name | Data Type | Purpose |
| --- | --- | --- |
| id | integer | Unique identifier for each toll analytics entry |
| bridge_id | integer | Bridge ID associated with the toll data |
| timestamp | date/time | Date and time of the toll collection |
| revenue | decimal | Amount of revenue collected during the toll |

Database on toll analytics are up to you! 

## Database functions:

getAllBridgesDb()

Returns:

```json
[
  {
    "id": 1,
    "name": "Auckland Harbour Bridge",
    "location": "Auckland Harbour Bridge",
    "type": "Motorway bridge",
    "year_built": 1959,
    "length_meters": 1020,
    "lanes": 8,
    "added_by_user": "",
  },
  // ...
]
```

getTollAnalyticsDb()

Returns:

```json
[
  {
    "id": 1,
    "bridgeId": 1,
    "timestamp": 1495083077243,
    "revenue": 2.39,
  },
  // ...
]
```


## Authentication

To make a request to the server that checks the authentication of the user, use the custom hook ```useAuthorisedRequest(method, endpoint, body)``` which returns ```<Promise<() => Promise<request.response>>>```

| Parameter | Data Type | Purpose |
| --- | --- | --- |
| method | string | the type of the request. ```get``` ```post``` ```patch``` or ```delete``` |
| endpoint | string | the endpoint of the request |
| body | string or undefined | the body of the request |

An explample on how to create an authorized request:

```
//React Component function
export function CreateGetRequest() {

  // Use the hook at the top level of your component
  const makeRequest = useAuthorisedRequest('get', '/api/v1/auth', undefined)

  async function OnGetRequest() {

    // Make the request  
    const response = await (await makeRequest)()
    // Output the response to console
    console.log(response)
  }

  return (
    // Only send an authorised request if the user is authenticated
    <IfAuthenticated>
      <button onClick={OnGetRequest}>Create Get get request</button>
    </IfAuthenticated>
  )
}
```
There are two example react components ```SignIn``` and ```SignOut``` that show how to sign the user in, out, and how to make an authenticated request. They should be placed as siblings in there parents component.

```
<SignIn/>
<SignOut/>
```

### Helper Components

There are two helper components that will render there children conditionally

```
// Will only render the <p> tag if the user is currently enticated
<Ifenticated>
      <p>Currently Signed in</p>
</Ifenticated>
```
```
// Will only render the <p> tag if the user is currently signed-out
<IfNotenticated>
      <p>Currently Signed out! Click here to sign in</p>
</IfNotenticated>```
---

## Setup

Run the following commands in your terminal:

```sh
npm install
npm run knex migrate:latest
npm run knex seed:run
cp .env.example .env
```

To run in development:
```sh
npm run dev
```

To run in production:
```sh
npm start
```
