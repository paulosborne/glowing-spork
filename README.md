Hello 😊

## Instructions

1. Clone the repository.
2. `brew install yarn` if you don't have it installed.
3. `yarn install` to install dependencies.
4. `yarn build-css` to generate the stylesheet.
5. Rename `.env.sample` to `.env.local`.
6. Obtain a `football-data.org` API token from [here](https://www.football-data.org/client/register).
7. Paste API token into `.env.local` and save.
8. The GoogleMaps API key is optional.
9. `yarn start` to start the application.
10. `yarn test` to run the unit tests.

## Issues & Observations

1. Some of the Premier League teams had incorrect postal codes causing the postcode lookup API to return `404 not found`. I reported the following errors to the maintainer who's already fixed them 👍🏻.
   - Liverpool and Spurs's postcodes contained the letter O instead of a zeroes.
   - West Ham's address hadn't been updated since they moved in 2016.
2. The instructions on the tech test mentioned sorting the crimes by year & month. Unfortunatley the `crimes-by-location` API only returns a single month of crimes and only returns a `month` property making sorting them redundant. If the goal is to list several months worth of crimes then that API is currently not fit for purpose.
3. `crimes-by-location` throws a `500` error when querying for the current month so I've set the default to the previous month.
4. May and June of 2020 seemed to be a busy month for the Burnley police force. 😉
5. I've added some basic responsiveness to the app so it should look OK when viewed at mobile resolutions.

# Images

![WelcomeScreen](./docs/WelcomeScreen.png)
![Leeds](./docs/Leeds.png)
![WestHam](./docs/WestHam.png)
![Burnley](./docs/Burnley.png)
