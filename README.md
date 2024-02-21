# Features:

1. **Technology Stack:**

   Frontend:

   - [x] React
   - [x] Typescript
   - [x] Redux
   - [x] Webpack 5
   - [x] Tests: Jest + React-library-testing
   - [] Cypress

2. **Task Management Features:**

   1. **User Authentication:**
      - New users can seamlessly create an account on our App without password.
      - Returning users can easily access their accounts.
   2. **Task Creation:**

      - Users can create new tasks effortlessly.
      - The task description allows users to select a color for better organization.

   3. **Checklist Creation:**

      - Users have the capability to create checklists nested within tasks.
      - Checklists provide a structured way to manage and track sub-tasks related to a main task.

   4. **Todo Item Creation:**

      - Users can add new to-do items nested within checklists.
      - Each to-do item allows users to select a color for categorization and choose an emoji for quick identification.

# ✔️ Pre-requisites

- Install [Node.js](https://nodejs.org/en/)

To run program, run the following command.

# Setup and Usage

1. Clone the repository: `git clone https://github.com/hocineismail/cendas-mini-task.git`

## 🔨 Running Code

To run program, run the following command.

1. Use the terminal to execute the following commands:

   - Use `cd cendas-mini-task` to navigate to the "cendas-mini-task" directory where the frontend code is located
   - Use `npm install -f` or `yarn install  -f` to install the dependencies for the React application.
   - Use`npm start` or `yarn start`to run the application

1. Open your browser on `http://localhost:3000` to see the page

### 🔨 Running Test

1. To run tests, run the following command.

```bash
  npm run test
```

### 🔨 Production

1. To build the production version, run the following command.

```bash
  npm run build
```

## Task 1

    - [x]  Latest React is used , latest rxdb is used
    - [x]  A State management library should be used
    - [x] Tasks should be associated with a selected checklist.
    - [x] Display created tasks in a list along with their respective checklist items.
    - [x] Users should be able to check off items in the checklist.
    - [x] All data should be saved and accessible offline.
    - [x] There can be multiple users using this application
    - [x]  Users don’t need to authenticate, instead the user has just to type its name without a password
        - [x]  Everything should be handled inside the DB
    - [x] If the user doesn’t exist, a new user is created
    - [x] the data from the users is separated so that user A can’t access user’s Checklist
    - [x] Basic Routing is required.

## Task 2: Offline-First Strategy Considerations\*\*

Considering you have an intricate backend with numerous functionalities and a frontend that currently interfaces with the backend using GraphQL, please address the following points:

1. Outline the initial steps you would take to transition the frontend/backend to support an offline-first approach.

   Answer 1 :
   Transitioning to an Offline-first approach requires a thorough analysis of Data Requirements, given that the size of the data could be immense, we must assess which parts of the data are important to store offline. Secondly, we need to implement a local storage using indexedDb or similar technology (rxDb), this needs to match the GraphQL queries. Moreover, by using tools like Apollo client we can modify the GraphQL queries to fetch data from local storage when offline. Finally, depending on the situation, these steps are taken, Data synchronisation, to correct for discrepancies between local storage and online storage, Additionally, the use of service workers is important to cache GraphQL API responses for offline use.

2. Drawing from your own experience with offline functionalities, what challenges have you encountered when implementing or maintaining offline modes?

   I am currently working on a project wherein the main task is to ensure high fidelity of transition potential from an online-first approach to an Offline-First Approach. I have come to realise that the task requires meticulous planning before implementing the transition steps mentioned above.

   During the planning phase, I analysed as thoroughly as possible the needs of our data. Given that the context of the web app is educational content, including, single page applications wherein considerable amount of user input and interaction occurs on the client side or the front-end. Therefore, implementing an efficient strategy requires careful planning.

   The main challenge was tweaking GraphQL queries in order to clone a subset of the database into the front-end or the client side. Additionally, implementing efficient data-pipelines can be beneficial in the long run, as well as, using a signal conversion algorithm i.e image conversion 10 fold, will yield considerable saving in the initial connection from back-end to front-end.

   We deemed necessary to establish an offline-first approach strategy beforehand, as typescript-based AI plugins will be used in the front-end browser to run small client side models, such as text generation. This constitutes an end goal of the Offling-First Approach.

3. How did you overcome these challenges, or what solutions did you implement?

   overcoming challenges in transitioning to an offline-first approach with GraphQL involved identifying critical assets for offline access, such as user forms, video editing tools, and recent activity. Solutions included adapting GraphQL queries for local data fetching and synchronization, implementing service workers for asset caching, and employing Apollo Client for state management and offline data handling. These strategies ensured seamless offline functionality and data integrity, enhancing the user experience regardless of network connectivity.

4. Are there any particular tools, libraries, or practices you've found especially helpful or problematic in this context?
   Tools and Libraries: Apollo Client is highly recommended for GraphQL data management, offering features like caching and local state management beneficial for offline functionality. Service Workers are crucial for caching strategies, and IndexedDB is a robust choice for local storage. Avoiding overly complex synchronization logic can mitigate potential issues.

5. Are there any emerging technologies or trends that might influence how we think about offline experiences?
   Emerging Trends: Progressive Web Apps (PWAs) are shaping the future of offline experiences, offering app-like functionalities with offline support. WebAssembly (Wasm) is emerging as a technology that enhances performance, crucial for processing data offline. Edge Computing is also gaining traction, pushing data processing closer to the user, reducing the need for constant connectivity.

## Pages

- **http://localhost:3000/**: Home page that contains tasks
- **http://localhost:3000/login**: Login page that contains form to `sign up` or `sign in`

## Directory Hierarchy

```

|—— public
|    |—— favicon.ico
|    |—— index.html
|    |—— logo192.png
|    |—— logo512.png
|    |—— manifest.json
|—— src
|    |—— components
|        |—— button
|            |—— Button.test.tsx
|            |—— Button.tsx
|        |—— checklists
|            |—— AddChecklist.test.tsx
|            |—— AddChecklist.tsx
|            |—— ChecklistsSection.tsx
|        |—— container
|            |—— Container.test.tsx
|            |—— Container.tsx
|        |—— icon
|            |—— Icon.test.tsx
|            |—— Icon.tsx
|        |—— input
|            |—— Input.test.tsx
|            |—— Input.tsx
|        |—— items-todo
|            |—— AddItemTodo.test.tsx
|            |—— AddItemTodo.tsx
|            |—— TodosSection.tsx
|        |—— layout
|            |—— Layout.test.tsx
|            |—— Layout.tsx
|        |—— list
|            |—— index.ts
|            |—— item
|                |—— Item.test.tsx
|                |—— Item.tsx
|            |—— list
|                |—— List.test.tsx
|                |—— List.tsx
|            |—— title
|                |—— Title.tsx
|                |—— Tittle.test.tsx
|        |—— modal
|            |—— Modal.tsx
|        |—— navbar
|            |—— Navbar.test.tsx
|            |—— Navbar.tsx
|        |—— slidedown
|            |—— SlideDown.test.tsx
|            |—— SlideDown.tsx
|        |—— tasks
|            |—— AddTask.tsx
|            |—— TasksSection.test.tsx
|            |—— TasksSection.tsx
|    |—— database
|        |—— collections.ts
|        |—— database.tsx
|        |—— models
|            |—— checklistSchema.ts
|            |—— itemSchema.ts
|            |—— taskSchema.ts
|            |—— userSchema.ts
|    |—— index.tsx
|    |—— pages
|        |—— login
|            |—— index.tsx
|        |—— tasks
|            |—— index.d.ts
|            |—— index.tsx
|    |—— redux
|        |—— actions
|            |—— tasksActions.ts
|        |—— hooks.ts
|        |—— reducers
|            |—— tasksSlice.ts
|        |—— store.ts
|    |—— HOC
|        |—— PrivateRoutes.text.tsx
|        |—— ProtectedRoute.tsx
|    |—— types
|        |—— schema.ts
|        |—— types.ts
|    |—— utils
|        |—— contstants.ts
|        |—— helper.ts
|    |—— workbox.ts
|    |—— App.tsx
|    |—— service-worker.js
|    |—— style.css
|—— .eslintrc.js
|—— .gitignore
|—— README.md
|—— package.json
|—— tsconfig.json
|—— webpack.config.js
```

## Author

- [@Ismail Hocine](https://github.com/hocineismail)
