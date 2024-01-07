This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, setup your environment variables, you can see the example in `.env.sample` and copy the content to `.env.local`, this sets up the `BASE_URL` for the API.

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## App Preview

In the first interaction, you will be prompted to select one of the 4 categories

![Homepage Image](/public/homepage.png)

After selecting a certain category, you will again be prompted to select a certain vehicle ride
![Homepage Selected Category](/public/homepage_selected_category.png)

After selecting a certain ride, the site will then show the details of that ride, alongside some Call To Action buttons to share, save to wishlist, and book a certain vehicle
![Vehicle Detail](/public/vehicle_detail.png)

You can also select specific vehicles from the navigation bar
![Vehicle Select](/public/select.png)

After Pressing the book button, the site will redirect you to this page, showing all the booking's you've made
![My Bookings Page](/public/mybookings.png)

The same thing happens when you add a certain vehicle to your wishlist
![My Wishlist Page](/public/wishlist.png)

## Testing

Most components excluding `Navbar.tsx` has coverage of more than 50%, I wasn't able to make a unit test for navbar since this app uses Redux + RTK Query, and I was not able to figure out how to setup the mock environments in time.

![Testing Coverage](/public/coverage_result.png)

## Server Side Rendering and Client Side Rendering

The homepage prefetches the vehicles from the api to mantain better SEO, but most of the other API calls are made in the client-side using RTK Query, RTK Query caches and stores the data fetched in the store, only refetching when a certain tag is invalidated.

Unfortunately, I was unable to finish data fetching using RTK Query on the server side in time, so any server side data fetching is done using the `fetch` API from javascript, which is a native function and has no caching whatsoever.

## What could be done better

For future reference, some things that could be improved are:

- Data fetching with RTK Query on the server side
- Setting up redux environment for unit testing
- Responsive design implementation for the application
- PWA implementation or AMP pages (though i think PWA is a better option)

## Atomic Design System

This project follow the rules of [Atomic Design System](https://atomicdesign.bradfrost.com/chapter-2/)

The components folder contain 4 subfolders:

- `atoms/`
- `molecules/`
- `organisms/`
- `templates/`

Atomic design is a methodology for creating and managing user interfaces in a systematic and efficient way. It was introduced by Brad Frost and is widely used in web and app development. The core concept of atomic design is breaking down a user interface into its fundamental building blocks, called "atoms," and then organizing them into higher-level components.

The atomic design system is composed of five distinct levels, each representing a different level of abstraction:

- Atoms

  These are the basic building blocks of the UI, such as buttons, input fields, and icons. Atoms are small, reusable elements that cannot be broken down further.

- Molecules

  Molecules are combinations of atoms that work together as a functional unit, like a search bar or a navigation menu.

- Organisms

  Organisms are more complex components that combine multiple molecules and/or atoms to form a distinct section of the UI, like a header or a product card.

- Templates

  Templates are page-level layouts that define the overall structure and the placement of organisms on a page.

- Pages

  Pages are the final implementation of the design, where specific content is added to the templates to create fully functional user interfaces.

The atomic design system promotes consistency, reusability, and scalability in UI development. By breaking the design down into discrete components, developers and designers can easily maintain and modify the interface. It also fosters collaboration among team members as they can refer to the shared language of atoms, molecules, organisms, templates, and pages. Overall, atomic design helps create cohesive and user-friendly experiences across different digital products and platforms.

## Better Code Practices

This boilerplate is integrated with:

- [Prettier](https://prettier.io/)

  `.prettierrc` configures the default prettier configuration of the project, this will make sure any use of auto formatting follow the prettier rules listed in the file

- [ESLint](https://eslint.org/)

  `.eslintrc.js` configures the rules that will be applied in the codebase. For example, each line has to end with a semicolon, and the linter will throw an error whenever this rule is not followed.

  Make sure you have the Eslint extension installed in your editor of choice :)

  In my VSCode user settings, i had to add the following line in order for VSCode to automatically fix the code to follow the ESLint rules:

  ```json
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  ```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
