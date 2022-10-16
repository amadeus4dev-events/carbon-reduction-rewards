# Carbonify

[Find the hosted version of our app here](https://carbon-reduction-rewards.vercel.app/trips)

## Project Idea

We've spent 48 hours researching, scoping and building carbonify.

With carbonify we're allowing employers to disincentivise unnecessary emissions from business travel. To do this we grant cash rewards to those employees who reduce their emissions during every quarter.

Employees use our web app to enter the data of their trips. We subsequently calculate the emissions of their trip and provide comparisons to global averages and their company peers.

## Sustainable Coding Practices

- Server-Side rendering to achieve greater server resource utilization instead of offloading work to client devices
- Offline capability to save on bandwith
- No unused features
- Local caching of almost all data provided by the backend
- Asynchronous methods calls everywhere to not block any resources

## Technology & APIs

- Next.js: Next.js is a React framework which allows us to provide a web-based frontend as well as custom backend API routes.
- Amadeus Self Service: We use the Amadeus self-service API to let users search for hotels and add them to a trip.
- Chooose: We use the Chooose API to calculate emissions of flights, train rides and hotel stays.
- TripAdvisor: We scraped TripAdvisor for the sustainability data of their listed hotels. We then trained a machine learning model with Python based on a paper by [Hoffmann et. al (2022)](https://epjdatascience.springeropen.com/articles/10.1140/epjds/s13688-022-00354-6) which allows us to predict the sustainability of hotels not included in the TripAdvisor dataset. Finally, we exported the model from a Python-specific data format to a format we can directly use in our JavaScript backend.

## Datasets

- Flight emissions: ICAO Carbon Emissions Calculator Methodology, Version 11
- Train emissions: European Environment Agency: average rail emissions in the EU per passenger-km
- Hotel emissions: Hotel sustainability benchmarking index 2021
- Trip Advisor: Scraped hotel sustainability data set
