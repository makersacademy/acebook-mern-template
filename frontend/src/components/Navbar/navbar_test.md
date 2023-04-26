To test navbar: 

Run both test servers using the following: 

Backend

Starting server
cd api
JWT_SECRET=SUPER_SECRET npm run start:test

Run tests 
cd api
JWT_SECRET=SUPER_SECRET npm run test

Frontend
Start the server in test mode (so that it connects to the test DB)

cd frontend
JWT_SECRET=SUPER_SECRET npm start
Then run the tests in a new terminal session

cd frontend
JWT_SECRET=SUPER_SECRET npm run test

THEN run test

Current test failed as we are not pointing to the element inside the data-cy string- adjust when back from break