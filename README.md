# Web-3D-Museum
An interactive web 3D museum application showcasing exhibitions in a virtual space.

## Requirements
Make sure you have the following installed:
- Node.js
- npm

## How to Set Up the App
### Backend Setup
To run the app, you need to set up your own Firebase Cloud Storage and a local PostgreSQL database.

1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file:
   ```
   PORT = 3000
   JWT_SECRET = <add-jwt-secret>

   DB_USER = <add-posgresql-user>
   DB_HOST = <add-posgresql-host>
   DB_NAME = <add-posgresql-db-name>
   DB_PASSWORD = <add-posgresql-db-password>
   DB_PORT = <add-posgresql-port>
   ```
4. Set up Firebase Cloud Storage
5. Use the `firebase-admin` npm package to connect your storage
6. Download your Firebase service account key (`firebase_key.json`) and place in the `backend\` folder
7. Adjust the following files to match your Firebase project:
   - `backend\cloudStorage.js`
   - `backend\.firebaserc`
9. Set up your local PostgreSQL database using `backend\init\db-structure.sql` file

### Frontend Setup
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Build the frontend: `npm run build`

## How to run the app
1. Navigate to the backend directory: `cd backend`
3. Start the server: `npm start`
By default, the app runs on http://localhost:3000.

## How to run tests
1. Navigate to the test directory: `cd test`
2. Run all tests: `npx playwright test`

## Credits
- **Favicon:** ["Museum icon"](https://www.iconfinder.com/icons/8723147/museum_icon) by Chunk Icons from Iconfinder, used under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
- **Draco 3D Compression:** This project uses the Draco 3D compression library by Google (Apache 2.0 license).
