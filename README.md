## Splitwise clone (Frontend)

### See this project live [here]()


### data format:

```jsx
user: {
    name: string,
    email: string
}

expenses: Array<expense>

expense: {
    id: string,
    description: string,
    amount: number,
    currency: string,
    date: Date(),
    createdBy: user,
    paidByMe: number,
    splitByMe: number,
    users: Array<{email: string, paidAmount: number, splitAmount: number}>
}   
```


<br/>

### Conditions to decide owing amount:

```
let user = loggedInUser

if user.paidByMe == user.splitByMe:
  user don't owe anyone
  no one owes user

else if user.paidByMe < user.splitByMe:
  for all users whose paidAmount > splitAmount:
    user owes (user.splitByMe - user.paidByMe) / (total users for this condition) to all those

else:
  for all users whose paidAmount < splitAmount:
    all of them owe user (user.paidByMe - user.splitByMe) / (total users for this condition)
```

<br/>

### The backbones of this project are [Next JS](https://nextjs.org/), [Chakra UI](https://chakra-ui.com/) and your browser's [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

<br/>

### Why did I choose [Next JS](https://nextjs.org/) ?

- The main reason behind choosing Next JS for this project is that it is a full stack framework (Which can be used only for frontend as well). 
- So, later on if I want to store the data (users and expenses) in an actual database instead of localStorage, then I can write APIs in pages/api folder of Next js, without having to setup anything else.
- The features of Next JS in frontend like file based routing, server side rendering, better SEO than React, Image optimizations, faster page loads, etc. are some other reasons.

<br/>

### Why did I choose [Chakra UI](https://chakra-ui.com/) ?

- I used Chakra UI for UI components in this project, so I could focus more on implementing the features of the app, instead of writing css styles for  basic components like buttons and flexbox.
- One main reason behind using Chakra UI instead of vanilla css was the `Modal` component, which I'm using for taking user inputs.


<br/>

### Third party libraries (npm packages) used:
- [tabler icons](https://www.npmjs.com/package/@tabler/icons) for icons 
- [dayjs](https://www.npmjs.com/package/dayjs) for displaying dates in pretty format
- [nanoid](https://www.npmjs.com/package/nanoid) for generating unique IDs for each expense object
- [react hot toast](https://www.npmjs.com/package/react-hot-toast) for displaying notification alerts


<br/>

### Steps to run locally:
1> Clone this github repository 
```git
git clone
```

2> Move to the project folder 
```bash
cd splitwise
```

3> Install all dependencies 
```node
npm install
```

4> Run development server 
```node
npm run dev
```

5> Go to `localhost:3000` in your browser 

<br/>

### Features done:

- [x] Create a new expense
  - [x] The expense can be split between any number of users
  - [x] The expense can be paid for by any number of users
  - [x] The expense can be split equally / by percentage / manually
- [x] View the list of all expenses split with you, regardless of which user created the expense
- [x] View outstanding balances with all the users you have split expenses with in the past
- [x] View your overall outstanding balance
- [x] User can login and logout
- [x] Taking inputs from user in Modals


<br/>

### Possible features

- Creating groups with any number of users
- Support multiple currencies
- Selecting date for expense (Currently date of creation of expense is taken by default)
- Add notes / images with expense (Needs some cloud storage)

<br/>

### Minor performance improvement:

While checking the <b>owed by loggedInUser</b> from the expense

- As currently we are storing data in localStorage, so while fetching the expenses before loading the page, loggedInUser is not available (it is usable after page load). So we have to fetch all the expenses from storage and in UI we need to check if a particular expense is split with loggedInUser or not.
- There are 2 solutions possible to this:
  - Using an actual database, we can fetch expenses split with a particular user, instead of getting all
  - Filtering in the UI after page load by calling a function (But it will lead to memory leak)
- So in this scenario this approach seemed to be more feasible.