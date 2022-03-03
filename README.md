# Introduction
Boiler Plate for building web application
1. React
2. TypeScript
3. Tachyons (CSS)
4. React-Query 
5. Jest (Unit and Integration Testing Library)
6. TestCafe (Functional Testing Library)
7. GraphQL (Apollo-express server)
---

## Start app server

Run `yarn start` to run the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Start graphql server

Run `yarn server` to execute bring up apollo-express graphql server in watch mode. <br />
Open [http://localhost:3600/graphql](http://localhost:3600/graphql) to view graphql playground or to connect to server.

### Running unit tests

Run `yarn test` to execute the unit tests via [Jest](https://jestjs.io).

### Running end-to-end tests

Run `yarn e2e ` to execute the end-to-end tests via [Test Cafe ](https://devexpress.github.io/testcafe/).

## Exercise 1
   #### The goal of this exercise is to build a “Nutrition Table” user interface using above tech stack. <br/>
    #### Key UI Elements
    * UI Table with selection -Done
    * Delete Nutrition -Done
    * Sort - Done
    * No need of Pagination
   
    #### Remarque (note)
    1. Typescript with React  
    2. Tachyons for CSS
    3. Use Graphql mock server and react-query to fetch data for your react components state
    4. Write Unit and Integration Tests using Jest & RTL
    5. Write Functional Tests using TestCafe & TTL
    
![image](./src/assets/nutrition.png)

---

## Exercise 2
   #### The goal of this exercise is to build a “Purchase Order Summary” user interface using above tech stack. <br/>
    #### Key UI Elements
    * Sub Total
    * Delivery or PickUp Fees
    * Tax
    * Estimated Total
   
    #### Remarque (note)
    1. Typescript with React  
    2. Tachyons for CSS
    3. Use Graphql mock server and react-query to fetch data for your react components state
    4. Write Unit and Integration Tests using Jest & RTL
    5. Write Functional Tests using TestCafe & TTL

![image](./src/assets/pos.png)
# react-query-testcafe-graphql-trachyons-seconds-steps
