TODO:

- display different versions of the Jobs component based on the role of the loggeed-in user

- ALERTS - allow workers to request service for a job

- ALERTS - allow customers to request service from a worker

- allow uploading of pictures into the DB

- allow serving up of pictures from the db

- change all redux variable names to 'reduxName'

- change all dispatch functions to use the spread operator instead of listing each attribute

- rename all dashnav components by removing 'Dash' (file name AND component name)

- fix issue with stacked nodes on the mapbox

- fix DashMyJobs not refreshing/updating after unsubscribing a worker (user perspective)

-- ERROR HANDLING

-- FORM VALIDATION

- remove extra white space
- lowercase everything but first letters of words
- format phone numbers (dashes, numbers only)
-

MVC:

STRETCH:

- style the mapbox map
- contact page
- help page
- FAQ page
- loading spinner when map is loading
- bcrypt replaces express sessions
- weather alerts and weather forecasts on home dashboard

<!-- NOTE -->

<!-- SECTION -- MAPBOX -->
<!-- create the map -->

mapbox with react: https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/

<!-- Add points to a web map, part 1: prepare your data -->

https://docs.mapbox.com/help/tutorials/add-points-pt-1/

<!-- Add points to a web map, part 2: create a map style -->

https://docs.mapbox.com/help/tutorials/add-points-pt-2/

<!-- Add points to a web map, part 3: add interactivity -->

https://docs.mapbox.com/help/tutorials/add-points-pt-3/

<!-- Markers and Controls API Reference -->

https://docs.mapbox.com/mapbox-gl-js/api/markers/#marker#getelement

<!-- CSS styling for popups as well as custome markers -->

https://docs.mapbox.com/help/tutorials/building-a-store-locator/

<!-- geocoding api playground page -->

https://docs.mapbox.com/playground/geocoding/?search_text=1264%20N%20Commerce%20Dr%2C%20Saratoga%20Springs%2C%20UT%2084045&proximity=-73.990593%2C40.740121&access_token=pk.eyJ1IjoieXVtbXlmdW5ueWJ1bm55IiwiYSI6ImNrODZwNzQydDA1bjEzZW15NTRqa2NpdnEifQ.6y8NFU2qjw6mTgINZYaRyg

<!-- Formatting your address for forward geocoding -->

https://docs.mapbox.com/help/troubleshooting/address-geocoding-format-guide/

<!-- !SECTION -->

<!-- ANCHOR -- .env files with Vite & React -->

https://stackoverflow.com/questions/73834404/react-uncaught-referenceerror-process-is-not-defined

- in your files that call your environment variables, call them like this:
  import.meta.env.VITE*REACT_APP*[your variable name]
- and in your .env files, name your variables like this:
  VITE*REACT_APP*[your variable name]
