# GameSphere

##### Nashville Software School Front End Capstone

An online gaming library app where users can search for and add video games to their personal library and label them as owned or played.

This individual project is the product of my cumulative experience in the front-end section of the NSS full-stack web development program.

The deployed site is available [here](https://games-phere.firebaseapp.com/).

#### Technologies used:

- HTML (with JSX)
- CSS (with Sass)
- JavaScript
- [React.js](https://reactjs.org/) (bootstrapped with `create-react-app`)
- [`axios`](https://www.npmjs.com/package/axios)
- [Firebase](https://firebase.google.com/) (hosting and data storage)
- Bootstrap 3 (with [`react-bootstrap`](https://react-bootstrap.github.io/))

# How to use:

When you access the site for the first time, you will come to the homepage which includes all games currently on the GameSphere database. Upon clicking the `login` button in the navbar, you will be presented with a login prompt.  Use the `Register a new account` link to head over to the registration form.  Upon filling out the form, click `Register` and you should be automatically logged in.  On future logins, the email and password you provided should be used.

Once you are logged in, you will see the app's main view. From here you can access most of the app's functionality from the navbar.  The different menu items and their detailed explanations are listed below.

## Home

This view displays all games on the GameSphere database. Each individual game can be added to the user's collection.

## My Collection

This view displays the current user's game collection and provides the option to delete individual reviews as well as update the game status to 'played'.

## Search

This view allows the user to search the GameSphere database using the provided search bar. Search results can be added to the current user's collection.

## New Game

Use this to add a game you don't see to the website's database. Each new game should include the following information:
- Game Title
- Development Team
- Platform
- Description
- Image Url
- Release Date

### V2 Ideas
- I'd like for the users to be able to search a real database of all games by using an API.
- User will be able to rate and review games after updating their status to played.