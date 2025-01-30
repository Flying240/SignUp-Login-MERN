npm create vite@latest

npm i
npm i react-router-dom
npm i axios
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# as user needs to shown /home page everytime he visits.

# so it is taken care by refresh handler.

# how it works?

    if user token exists in local storage, i will navigate to him to /home page,
        if he his in / or /login or /signup pages

    else
        navigate to login page

    The `RefreshHandler` runs whenever the pathname or navigation state changes,
    ensuring that the user cannot bypass authentication checks.
    as we have passed it as useEffect component.
