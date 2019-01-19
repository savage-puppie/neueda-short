# neueda-short

### A blazingly fast - *and short* - URL shortener

## Local Test (Requires [Docker Compose](https://docs.docker.com/compose/install/))

1. Clone the repository
2. Enter the project directory: `cd neueda-short`
3. Enter the back-end directory: `cd neueda-short-server`
4. Create a `.env` file by running `cp .env.example .env`
5. Go to [mlab](https://mlab.com), create a new database and fill in the variables in the `.env` file accordingly with the newly created database/credentials on [mlab](https://mlab.com)
6. Go back to the project directory: `cd ..`
7. Run `docker-compose up --build` and wait it to finish, then access `http://localhost` in your browser

## Live Test

I've deployed this project on an EC2 instance on Amazon so you can try it out:
### [52.90.136.44](http://52.90.136.44)

## Improvements Made
1. SSR (Server side rendering)
2. Code Splitting

## Info
- This project is configured to use a MongoDB database hosted in the cloud, preferably on [mlab](https://mlab.com). You should just create a new database with your [mlab](https://mlab.com) account and fill in the values in the `.env` file inside the `neueda-short-server` directory before proceeding to step 5 in the "usage" section.

## Todo

1. ~~Create a frontend web application where you can submit a long URL and display the registered shorten URL. Implement the matching backend that will persist the data and handle redirect.~~
2. Gather different statistics and present them in the front end
3. ~~Write tests (unit / bit / e2e) with the framework of your choice.
  Please note, this should demonstrate your ability to write tests, 100% coverage is **NOT** the target.~~
4. Implement and document up to 5 improvements of your choice
5. ~~Use Docker / Docker compose~~

## Tests

To run the tests, `cd neueda-short-server` and `yarn test`
