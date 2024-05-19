# LINK ===> [DEMO](https://deployment--melodic-gumption-1c183e.netlify.app/)
<div style="display: flex; flex-direction: row;">
  <img src="https://github.com/hocineismail/cendas-mini-task/blob/main/examples/example1.png?raw=true" alt="Example 1" width="400" />
   <img src="https://github.com/hocineismail/cendas-mini-task/blob/main/examples/example2.png?raw=true" alt="Example 2" width="400" />
</div>
<div style="display: flex; flex-direction: row;">
  <img src="https://github.com/hocineismail/cendas-mini-task/blob/main/examples/example3.png?raw=true" alt="Example 3" width="400" />
   <img src="https://github.com/hocineismail/cendas-mini-task/blob/main/examples/example4.png?raw=true" alt="Example 4" width="400" />
</div>

# Tasks:

1. **Technology Stack:**

   Frontend:

   - [x] React
   - [x] Typescript
   - [x] Redux
   - [x] Webpack 5
   - [x] Tests: Jest + React-library-testing
   - [] Cypress

2. **Task Management Features:**

   1. **User:**

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

## 👻 Running Code

To run program, run the following command.

1. Use the terminal to execute the following commands:

   - Use `cd cendas-mini-task` to navigate to the "cendas-mini-task" directory where the frontend code is located
   - Use `npm install` or `yarn install` to install the dependencies for the React application.
   - Use`npm start` or `yarn start`to run the application
   - Open your browser on `http://localhost:3000` to see the page

## 📣📣📣Additional Notes📣📣📣

If you encounter any dependency resolution issues during installation, consider using the `npm install -f` to force the installation. This can be helpful in cases where there are conflicting dependencies.

### 🔌 Running Test and Linting

1. To run tests, run the following command.

```bash
  npm run test
```

```bash
  npm run lint
```

### 🏢 Production

1. To build the production version, run the following command.

```bash
  npm run build
```
[DEMO](https://deployment--melodic-gumption-1c183e.netlify.app/)
### 😌 Answers

I completed the mini tasks in 3 days, including:

- Conception and Strategies
- Creating components,for UI with styled-components [Strecture](#strecture)
- Integrating functionalities as per requirements

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
    
## Pages

- **http://localhost:3000/**: Home page that contains tasks
- **http://localhost:3000/login**: Login page that contains form to `sign up` or `sign in`

## Directory Hierarchy <a id="strecture"></a>

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
