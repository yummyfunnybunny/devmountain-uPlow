# Project Name: uPlow

## Description:

This app allows users to create accounts as either customers or workers. Customers can create properties, and jobs associated with their properties. Customers can
also search the interactive map and request service from workers. Workers can search for jobs and request to service jobs.

## Features:

- signup and login
- get, create, update, delete properties
- get, create, update, delete jobs
- workers => request to service a customers jobs
- customers => request service from workers
- Workers => accept or decline service offers from customers
- customers => accept or decline service offers from workers

To Do List

==== FEATURES ====

- weather API alerts
- file uploads into the DB
- pricing and payment system
- counter offers
- service jobs, verify service, create service
- service history
- dashboard home -> helpful widgets
- Home-page testimonials -> carousel
- contact-page -> mapbox with HQ location, contact info,
- FAQ page -> accordian
- Sass for styling
- bcrypt + json webtokens
- jobs multiple pictures carousel

==== ISSUES ====

- fix issue with stacked nodes on the mapbox
- fix DashMyJobs not refreshing/updating after unsubscribing a worker (user perspective)
- alerts need date/time they were created
- add timestamps to properties and jobs and add SORTBY when fetching

==== ERROR HANDLING ====

==== FORM VALIDATION ====

- remove extra white space
- lowercase everything but first letters of words
- format phone numbers (dashes, numbers only)

==== NORMALIZATION, NAME CHANGES, condensing code ====

- RENAME: customer rejects/accepts/counters worker offer (modalType, modal submit function, endpoint, controller function)
- RENAME: worker rejects/accepts/counters customer offer (modalType, modal submit function, endpoint, controller function)
- CONDENSE: combine all of my modal redux states into the modalReducer!
- RENAME: all dashnav components by removing 'Dash' (file name AND component name)
- RENAME: change all redux variable names to 'reduxName'
- CONDENSE: combine all modal form states into single states that can be updated with a single onChange function
- CONDENSE: change all dispatch functions to use the spread operator instead of listing each attribute
- CONDENSE: combine css files (dashMyProperties & property)

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
