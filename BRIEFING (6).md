# Week 6 formal assessment

(This is a markdown .MD file, if you are reading this in vs-code, right click the file and select `Open Preview`)

#### Rules for this assessment:

See `WEEK_3&6_RULES.md`

#### Start time

START_TIME

#### Deadline

DEADLINE

## Learning goals & some tips

For transparency and clarity, these are the learning goals we will be testing:

#### Frontend

- Basic knowledge of React
  - components
  - props
  - useState
  - useEffect
  - event listeners & handlers
- Routing & dynamic routing using react-router-dom
- Making a reducers that transform the redux state
- Using selectors to take state from the redux store and use it in your components
- Dispatching actions from your components to change the redux state
- Separating reducers & actions & selectors
- Using async actions (redux thunk)
- Sending GET / POST / PATCH and DELETE requests using axios
- Setting an authorization header with a JWT to make an authorized request

#### Backend

- Generating models & migrations using sequelize-cli
- Doing database validation using sequelize models (e.g. allowNull: false, unique: true)
- Implementing hasMany, hasOne, belongsTo and belongsToMany relations
- Adding foreign keys to models in migrations
- Adding relations to sequelize models
- Generating seed data using sequelize-cli
- Creating, updating & deleting records from the database using sequelize models
- Querying the database using sequelize models
- Eager loading related models using sequelize `include`
- Implementing GET / POST / PATCH / DELETE routes in express
- Sending responses with express
- Setting status codes to responses in express
- Separating routes using the express Router
- Using the auth middleware to manage authorization for routes in express

**TIP: Read the assignment carefully!** It is easy to accidentally deviate from an assignment, resulting in a frustrating homework experience. Taking the time to read the exercise can save you time and effort.

**TIP: Don't get stuck!** If you feel stuck, try taking a small walk, continuing on to a next step, or talking out loud about the problem you're facing (programmers call this "rubber-ducking"). Everybody can get stuck, but don't let it stop you.

## What are we building?

We are building a webapp where people can put up their artworks for auction and encourage other people to make more art. It is called `Heart Works`. It has multiple pages:

- Signup & Login pages (already implemented in the starter kit)
- A page with a list of artworks up for auction
- A detail page for artworks where you can bid or `heart` an artwork
- A form where you start an auction

As a starting point, you must use the following react-redux & express templates where the login / signup flow has already been implemented. Instructions on how to use the templates can be found on the repositories themselves.

[Frontend starter](https://github.com/Codaisseur/react-redux-jwt-bootstrap-template)
[Backend starter](https://github.com/Codaisseur/express-template)

## Wireframe

You will be provided with a wireframe that shows an overview of the app along with this README

## Entities

### Artwork

| key        | data type | required | notes                           |
| ---------- | --------- | -------- | ------------------------------- |
| id         | Integer   | yes      | Already added by model:generate |
| title      | String    | yes      |                                 |
| imageUrl   | String    | yes      |                                 |
| hearts     | Integer   | yes      | default value is 0              |
| minimumBid | Integer   | yes      | can be 0                        |
| createdAt  | Date      | yes      | Already added by model:generate |
| updatedAt  | Date      | yes      | Already added by model:generate |
| userId     | Integer   | yes      | Foreign key (references a user) |

**Relations:**

- artwork belongs to user
- artwork has many bid

### Bid

| key       | data type | required | notes                                |
| --------- | --------- | -------- | ------------------------------------ |
| id        | Integer   | yes      | Already added by model:generate      |
| email     | String    | yes      |                                      |
| amount    | Integer   | yes      |                                      |
| createdAt | Date      | yes      | Already added by model:generate      |
| updatedAt | Date      | yes      | Already added by model:generate      |
| artworkId | Integer   | yes      | Foreign key (references an artworks) |

**Relations:**

- bid belongs to artwork

### User

| key       | data type | required | notes                              |
| --------- | --------- | -------- | ---------------------------------- |
| id        | Integer   | yes      | Already implemented                |
| name      | String    | yes      | Already implemented                |
| email     | String    | yes      | Already implemented, unique        |
| password  | String    | yes      | Already implemented, password hash |
| isArtist  | Boolean   | no       |                                    |
| createdAt | Date      | yes      | Already implemented                |
| updatedAt | Date      | yes      | Already implemented                |

- user has many artwork

| Criteria                                                                   | Points |
| -------------------------------------------------------------------------- | ------ | --- |
| Server contains sequelize models and migrations for Artwork and Bid        | 2 ok   |
| Required fields for artworks and bids are validated in models & migrations | 2 ok   |
| User, Artwork and Bid models are correctly related                         | 2 ok   |
| Seeders are present to create at least 3 artworks and 5 bids               | 2 ok   |
| Total                                                                      | 8      | 8   |

## Features

### 1. As a user I want to view a list of artworks

- The default page you see when you go to `/` should be a list of artworks
- Each artwork is displayed with the title, image, the number of hearts it has and the number of bids it has
- There is a button linking to the details of that artwork

| Criteria                                                                       | Points |
| ------------------------------------------------------------------------------ | ------ |
| The frontend route `/` displays a list of artworks                             | 1      |
| The artworks are fetched from the server                                       | 1      |
| The artworks are displayed with their number of bids they have in the database | 2      |
| An array of artworks is stored and managed by redux                            | 1      |
| A selectors and actions are defined in a seperate files                        | 1      |
| Each artwork has a `View details` button, it links to a artwork's details      | 1      |
| Total                                                                          | 7      |

### 2. As a user interested in buying people's art, I want to see the details of an artwork, so I know what it costs

- When we click on the `View details` button of an artwork we see the details of that artwork
- On this detail page we can see the bids belonging to that artwork

| Criteria                                                                       | Points |
| ------------------------------------------------------------------------------ | ------ |
| The frontend route `/artworks/:id` displays a detail page for an artwork       | 1      |
| The artworks are displayed with a title, image and the number of hearts it has | 1      |
| The bids belonging to the artwork are displayed with email and amount          | 1      |
| The artwork and its bids are fetched from the server                           | 1      |
| Total                                                                          | 4      |

### 3. As a user I want to give people hearts for their artwork, so I can encourage them to make more art

- Any user, logged in or not should be able to click a button `give heart`
- It increases the `hearts` property of an artwork by 1
- We do not keep track of who gave a heart to the artworks, just the amount of hearts the artwork has

| Criteria                                                                                     | Points |
| -------------------------------------------------------------------------------------------- | ------ |
| On the artwork's detail page we see a button with `give heart`                               | 1      |
| When the `give heart` button is clicked the number of hearts changes on the page             | 1      |
| Clicking the `give heart` button sends a PATCH request to the server                         | 1      |
| Clicking the `give heart` button updates the `hearts` property of an artwork in the database | 1      |
| The number of hearts an artwork has is also updated in the list of artworks on `/`           | 1      |
| You have to refresh to see the number of hearts update                                       | -1     |
| Total                                                                                        | 5      |

### 4. As a user interested in buying people's art, I want to be able to make a bid, so I can show my interest in buying an artwork

- On the detail page for an artwork there should be a form with 1 field: `amount`
- This form allows a user to make a bid
- This should only be possible when a user is logged in
- The email value for the bid can be taken from the redux store
- Alternatively make an input for the email as well
- The minimum value of the form should be the highest bid + 1 euro

| 4. Criteria - Bidding                                                                           | Points |
| ----------------------------------------------------------------------------------------------- | ------ |
| When a user is logged in we can see an number input for amount and button to `Bid`              | 1      |
| When the `Bid` button is pressed, it makes a POST request to the server to create a new `Bid`   | 2      |
| The bid created in the database has the correct `artworkId`                                     | 1      |
| The new bid can be seen on the page without refreshing                                          | 2      |
| An Authorization header is set in the request                                                   | 1      |
| The auth middleware is used on the server side to authorize the request                         | 1      |
| The minimum value of the input for amount in the frontend is the highest bid amount + 1         | 1      |
| If there are no bids yet the minimum value is the `minimumBid` value from the artwork           | 2      |
| The backend validates that the new bid is the highest bid so far uses correct HTTP codes if not | 2      |
| Total                                                                                           | 13     |

### 5. As an artist I want to be able to post an artwork, so I can make money with my art

- As an artist (a user with `isArtist: true` and who is logged in) you should be able to post an artwork
- You can build this feature by hardcoding the value of `isArtist` the dynamic value is the next feature
- If you're logged in and an artist you see a `Start an auction` tab in the navbar
- This leads to a form where you can post an artwork

| Criteria                                                                | Points |
| ----------------------------------------------------------------------- | ------ |
| There is a link with `Start an auction` in the navbar                   | 0.5    |
| A user can only see this link when you are logged in and is an Artist   | 1.5    |
| Clicking `Start an auction` links to a page with a form                 | 0.5    |
| The form contains inputs for title, minimum bid & imageUrl              | 0.5    |
| When the form is submitted a POST request is sent to the server         | 1      |
| An Authorization header is set in the request                           | 1      |
| The auth middleware is used on the server side to authorize the request | 1      |
| An artwork is created with the correct data and `userId`                | 2      |
| `userId` is not sent in the body of the request                         | 1      |
| The user sees a success message if the artwork was posted successfully  | 2      |
| The success message is an alert, confirm or prompt popup or console.log | -1     |
| Total                                                                   | 11     |

**Note: You can of course us an `Alert` bootstrap component as a message (just not window.alert())**

### 6. As an administrator to this website, I want users to be able to specify that they are artists, so I know how my platform is being used

- When signing up, we want to users to specify that they are artists
- We can do this by adding a checkbox to the form
- We will also have to write a migration to add a column `isArtist` to our table

| Criteria                                                                           | Points |
| ---------------------------------------------------------------------------------- | ------ |
| A separate migration is created to add a column `isArtist` to our users table      | 2      |
| A checkbox is added to the signup form                                             | 1      |
| The `signUp` action also sends a value for `isArtist` when posting to the server   | 1      |
| When the checkbox is checked on signup, the user created has `isArtist: true`      | 2      |
| When the checkbox is not checked on signup, the user created has `isArtist: false` | 1      |
| Total                                                                              | 7      |

### 7. Finishing up

- Self assess:
  - Make a file called `ASSESSMENT.md`
  - Copy the rubric below into it
  - Score your assessment in the column `Self`
  - Leave room for the evaluator to fill in the `Evaluator` column
- Write a reflection about this assessment & your learning process in `REFLECTION.md`:
  - What did you do well, process wise
  - What would you do differently next time to improve, process wise
- Commit your code and use messages when you commit, push it to your repository using `git push origin master`

| Criteria                                                                   | Points |
| -------------------------------------------------------------------------- | ------ |
| Student performed an accurate self assessment (max off by + or - 7 points) | 2      |
| Student can reflect on their process by writing a reflection of ~200 words | 2      |
| Student has regularly committed changes (at least 1 commit per feature)    | 1      |
| Total                                                                      | 5      |

### Self assessment

| Section                      | Max Points | Self | Evaluator |
| ---------------------------- | ---------- | ---- | --------- |
| 0 Migrations, models & seeds | 8          | 0/8  | 0/8       |
| 1 Artworks list              | 7          | 0/7  | 0/7       |
| 2 Artwork details            | 4          | 0/4  | 0/4       |
| 3 Giving hearts              | 5          | 0/5  | 0/5       |
| 4 Bidding                    | 13         | 0/13 | 0/13      |
| 5 Posting an artwork         | 11         | 0/11 | 0/11      |
| 6 Signing up as an artist    | 7          | 0/7  | 0/7       |
| 7 Finishing up               | 5          | 0/5  | 0/5       |
| Total                        | 60         | 0/60 | 0/60      |

| 0. Criteria - Migrations, models & seeds                                   | Points | Self | Evaluator |
| -------------------------------------------------------------------------- | ------ | ---- | --------- |
| Server contains sequelize models for Artwork and Bid                       | 2      |      |           |
| Required fields for artworks and bids are validated in models & migrations | 2      |      |           |
| User, Artwork and Bid models are correctly related                         | 2      |      |           |
| Seeders are present to create at least 3 artworks and 5 bids               | 2      |      |           |
| Total                                                                      | 8      |      |           |

| 1. Criteria - Artworks list                                                  | Points | Self | Evaluator |
| ---------------------------------------------------------------------------- | ------ | ---- | --------- |
| The frontend route `/` displays a list of artworks                           | 1      |      |           |
| The artworks are fetched from the server                                     | 1      |      |           |
| The artworks are displayed with the number of bids they have in the database | 2      |      |           |
| An array of artworks is stored and managed by redux                          | 1      |      |           |
| A selectors and actions are defined in a separate files                      | 1      |      |           |
| Each artwork has a `View details` button, it links to a artwork's details    | 1      |      |           |
| Total                                                                        | 7      |      |           |

| 2. Criteria - Artwork details                                                  | Points | Self | Evaluator |
| ------------------------------------------------------------------------------ | ------ | ---- | --------- |
| The frontend route `/artworks/:id` displays a detail page for an artwork       | 1      |      |           |
| The artworks are displayed with a title, image and the number of hearts it has | 1      |      |           |
| The bids belonging to the artwork are displayed with email and amount          | 1      |      |           |
| The artwork and its bids are fetched from the server                           | 1      |      |           |
| Total                                                                          | 4      |      |           |

| 3. Criteria - Giving hearts                                                                  | Points | Self | Evaluator |
| -------------------------------------------------------------------------------------------- | ------ | ---- | --------- |
| On the artwork's detail page we see a button with `give heart`                               | 1      |      |           |
| When the `give heart` button is clicked the number of hearts changes on the page             | 1      |      |           |
| Clicking the `give heart` button sends a PATCH request to the server                         | 1      |      |           |
| Clicking the `give heart` button updates the `hearts` property of an artwork in the database | 1      |      |           |
| The number of hearts an artwork has is also updated in the list of artworks on `/`           | 1      |      |           |
| You have to refresh to see the number of hearts update                                       | -1     |      |           |
| Total                                                                                        | 5      |      |           |

| 4. Criteria - Bidding                                                                           | Points | Self | Evaluator |
| ----------------------------------------------------------------------------------------------- | ------ | ---- | --------- |
| When a user is logged in we can see an number input for amount and button to `Bid`              | 1      |      |           |
| When the `Bid` button is pressed, it makes a POST request to the server to create a new `Bid`   | 2      |      |           |
| The bid created in the database has the correct `artworkId`                                     | 1      |      |           |
| The new bid can be seen on the page without refreshing                                          | 2      |      |           |
| An Authorization header is set in the request, and the endpoint works                           | 1      |      |           |
| The auth middleware is used on the server side to authorize the request, and the endpoint works | 1      |      |           |
| The minimum value of the input for amount in the frontend is the highest bid amount + 1         | 1      |      |           |
| If there are no bids yet the minimum value is the `minimumBid` value from the artwork           | 2      |      |           |
| The backend validates that the new bid is the highest bid so far                                | 2      |      |           |
| Total                                                                                           | 13     |      |           |

| 5. Criteria - Posting an artwork                                                            | Points | Self | Evaluator |
| ------------------------------------------------------------------------------------------- | ------ | ---- | --------- |
| There is a link with `Start an auction` in the navbar                                       | 0.5    |      |           |
| A user can only see this link when you are logged in and is an Artist                       | 1.5    |      |           |
| Clicking `Start an auction` links to a page with a form                                     | 0.5    |      |           |
| The form contains inputs for title, minimum bid & imageUrl                                  | 0.5    |      |           |
| When the form is submitted a POST request is sent to the server                             | 1      |      |           |
| An Authorization header is set in the request, and the endpoint works                       | 1      |      |           |
| Auth middleware is used on the server side to authorize the request, and the endpoint works | 1      |      |           |
| An artwork is created with the correct data and `userId`                                    | 2      |      |           |
| `userId` is not sent in the body or as a param of the request                               | 1      |      |           |
| The user sees a success message if the artwork was posted successfully                      | 2      |      |           |
| The success message is an alert, confirm or prompt popup or console.log                     | -1     |      |           |
| Total                                                                                       | 11     |      |           |

| 6. Criteria - Signing up as an artist                                              | Points | Self | Evaluator |
| ---------------------------------------------------------------------------------- | ------ | ---- | --------- |
| A separate migration is created to add a column `isArtist` to our users table      | 2      |      |           |
| A checkbox is added to the signup form                                             | 1      |      |           |
| The `signUp` action also sends a value for `isArtist` when posting to the server   | 1      |      |           |
| When the checkbox is checked on signup, the user created has `isArtist: true`      | 2      |      |           |
| When the checkbox is not checked on signup, the user created has `isArtist: false` | 1      |      |           |
| Total                                                                              | 7      |      |           |

| 7. Criteria - Finishing up                                                 | Points | Self | Evaluator |
| -------------------------------------------------------------------------- | ------ | ---- | --------- |
| Student performed an accurate self assessment (max off by + or - 7 points) | 2      |      |           |
| Student can reflect on their process by writing a reflection of ~200 words | 2      |      |           |
| Student has regularly committed changes (at least 1 commit per feature)    | 1      |      |           |
| Total                                                                      | 5      |      |           |
