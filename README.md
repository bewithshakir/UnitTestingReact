# Readme will be updated soon

# To run test cases written in this application

Go to the Repository Directory:
For test - Enter _npm test_ command to verify the test results.
For coverage - Enter _npm test -- --coverage_ or _npm run coverage_ command, after running successfully, it will create coverage folder in the directory. When you open coverage/index.html in the browser you will be able to see all the information related code coverage.

# To Play with the UI Components(StoryBook)

Go to the Repository Directory and Enter _npm run storybook_

# Dev url

https://tapupglobal-webapp-dev.azurewebsites.net/

# To Formate code files - Prettier

Go to the Repository Directory:
For single file run - npx prettier --write <File_Name_Location> (npx prettier --write src/App.tsx)
For complete project run- npx prettier --write .


# Step to run the project locally 
### 1. install npm
https://nodejs.org/en/download/ 
### 2. install yarn 
https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable

### 3. environment setup
#### To run project with Dev environment 

* create dev.env on project root level
* copy-paste the all content from .env.local file to dev.env
```
yarn install
yarn start 
```
#### To run project with Qa environment
* create qa.env on project root level
* copy-paste the all content from .env.local file to qa.env
```
yarn install
yarn start-qa
```

