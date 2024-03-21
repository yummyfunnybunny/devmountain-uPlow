# uPlow

## Description:

This app allows users to create accounts as either customers or workers. Customers can create properties, and jobs associated with their properties. Customers can
also search the interactive map and request service from workers. Workers can search for jobs and request to service jobs.

## Features:

- authentication includes sign-up, logg-in, logout, editing and deleting accounts. includes password hashing with bcrypt.
- signup as one of two roles: customer or worker
- create properties and jobs associated with your account. includes uploading your own photos for your properties and jobs.
- use the interactive map to either search for workers (as a customer) or search for jobs (as a worker) and make requests to get jobs serviced
- stay updated on your jobs with automatic alert system that lets you know when things change regarding your jobs

## Future Considerations

New Features:

- pricing and payment system with stripe
- counter offers
- service jobs, verify service, create service
- service history
- help page

Styling:

- migrate to Sass
- contact-page -> mapbox with HQ location
- jobs multiple pictures carousel
- loading spinner when map is loading
- style the mapbox map
- responsive to all screen sizes

Weather:

- save weather data to reduce fetches to weatherAPI
- weather alerts

form validation:

- remove extra white space
- lowercase everything but first letters of words
- format phone numbers (dashes, numbers only)

Condensing, normalizing, cohesion:

- RENAME: customer rejects/accepts/counters worker offer (modalType, modal submit function, endpoint, controller function)
- RENAME: worker rejects/accepts/counters customer offer (modalType, modal submit function, endpoint, controller function)
- CONDENSE: combine all of my modal redux states into the modalReducer!
- RENAME: all dashnav components by removing 'Dash' (file name AND component name)
- RENAME: change all redux variable names to 'reduxName'
- CONDENSE: combine all modal form states into single states that can be updated with a single onChange function
- CONDENSE: change all dispatch functions to use the spread operator instead of listing each attribute
- CONDENSE: combine css files (dashMyProperties & property)

Error Handling:

- create error handling loop to handle all errors with one system

Security:

- rate limiting
- form validation for SQL injection

Image Uploading:

- limit file sizes and use sharp to format images before saving to the database

## Known Issues

- fix issue with stacked nodes on the map
- fix DashMyJobs not refreshing/updating after unsubscribing a worker (user perspective)
- alerts need date/time they were created
- first faq accordian doesnt open
