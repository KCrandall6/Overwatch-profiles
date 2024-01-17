
![Overwatch PR logo](https://github.com/KCrandall6/Overwatch-profiles/blob/main/src/figures/OverwatchPR.png)
![Overwatch team](https://github.com/KCrandall6/Overwatch-profiles/blob/main/src/figures/overwatchteam.png)

<h1 align="center">Overwatch PR</h1>

Welcome to Overwatch PR, a mobile-centric web app built to track your favorite online Overwatch 2 profiles, learn more about the game's characters and their stories, as well as stay up to date on the latest OW2 news. You can access the deployed site [here](https://overwatchpr.netlify.app/).

## How it works
Overwatch PR is built using [create-react-app](https://create-react-app.dev/) on the frontend and deployed via [Netlify](https://www.netlify.com/). The frontend app relies on the [OverFast API](https://overfast-api.tekrop.fr/) to receive character and player data and components are customized [react-bootstrap](https://react-bootstrap.netlify.app/) components.

The app's UI is built to be mobile-centric, and can be downloaded to your phone's home screen. To download the app to your phone, follow these [instructions](https://overwatchpr.netlify.app/share).

For the OverFast API to work, a user must already exist for the Overwatch game. The name needed for the API is the Blizzard name followed by a dash and numeric code (ex: mL7-21877). This digit code can be found in the URL when searching a profile on Blizzard's [profile search](https://overwatch.blizzard.com/en-us/search/) site.

### Install
Installation and start follows normal [create-react-app](https://create-react-app.dev/) conventions which are as follows:
1. ``npm install``
2. ``npm start``

### Usage and Features
The Overwatch PR app by default shows a handful of different overwatch profiles along with their stats. The profiles that are loaded in can be changed via the code in the users array via the Home.jsx component.

The profiles include a favorite button that saves the specific profile via a cookie using the [js-cookie](https://github.com/js-cookie/js-cookie) library. Further player details can be accessed on the My Profile page.

There is a page where users can learn more information about each hero, including their bio, place of origin, and artwork.

Patch notes and Overwatch news can be accessed via links that link to the respective Blizzard links.

## Limitations
* It is important to note that player profiles need to be set to 'Open' to be accessed through the API. This can be done via the user's profile settings in the Overwatch game menu.
* Blizzard has sometimes disabled profile views for console-exclusive or console-first players. At this time all player profiles are available to view, but they could be disabled in the future for a period of time. To check a profile's status, see [here](https://overwatch.blizzard.com/en-us/search/).

## Contributing
I'd love for you to test this library out and submit any issues you encounter. also feel free to fork your own repo and submit pull requests!