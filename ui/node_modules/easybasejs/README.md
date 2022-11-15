

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://easybase.io">
    <img src="https://easybase.io/assets/images/logo_black.png" alt="Logo" width="80" height="80" href="easybase logo black">
  </a>
</p>

<br />

<p align="center">
  <img alt="npm" src="https://img.shields.io/npm/dw/easybasejs">
  <img alt="GitHub" src="https://img.shields.io/github/license/easybase/easybasejs">
  <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/easybasejs">
  <img alt="npm" src="https://img.shields.io/npm/v/easybasejs">
</p>

<br />

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Documentation](#documentation)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)


<!-- ABOUT THE PROJECT -->
## About The Project


### Built With

* [microbundle](https://github.com/developit/microbundle)
* [webpack](https://webpack.js.org/)
* [cross-fetch](https://github.com/lquixada/cross-fetch)
* [Easybase.io](https://easybase.io)
* [object-observer](https://github.com/gullerya/object-observer)


<!-- GETTING STARTED -->
## Getting Started
Browser and Node.js compatible library for Easybase **Projects** and **Node Integrations**. This project also serves as the core for [_easybase-react_](https://github.com/easybase/easybase-react).

### Prerequisites

* npm for node projects
* *There are no prerequisites for usage in browser*

### Installation
* Node:
```sh
npm install easybasejs
```
* Browser:
```html
<head>
    ...
    <script src="https://cdn.jsdelivr.net/npm/easybasejs/dist/bundle.js"></script>
    ...
</head>

```

<!-- USAGE EXAMPLES -->
## Usage

The node framework integration uses a query builder, [_EasyQB_](https://easybase.github.io/EasyQB/), to execute CRUD operations.

The `db()` function will point to your database. Execute queries with `.all` and `.one`. [Read the documentation for `.db` here](https://easybase.github.io/EasyQB/).

```javascript
import Easybase from "easybasejs";
import ebconfig from "./ebconfig"; // Download from Easybase.io

// Initialize
const table = Easybase.EasybaseProvider({ ebconfig }).db();
const { e } = table; // Expressions

// Delete 1 record where 'app name' equals 'MyAppRecord'
await table.delete.where(e.eq('app name', 'MyAppRecord')).one();

// Basic select example 'rating' is greater than 15, limited to 10 records.
const records = await table.return().where(e.gt('rating', 15)).limit(10).all();
console.log(records);
```

A detailed walkthrough of [using serverless database is available here](https://easybase.io/react/).

<br />

### **Cloud Functions**

The *EasybaseProvider* pattern is not necessary for invoking cloud functions, only *callFunction* is needed.
```jsx
import { callFunction } from 'easybase-react';

function App() {
    async function handleButtonClick() {
        const response = await callFunction("123456-YOUR-ROUTE", {
            hello: "world",
            message: "Find me in event.body"
        });

        console.log("Cloud function: " + response);
    }

    //...
}
```

Learn more about [deploying cloud functions here](https://easybase.io/react/2021/03/09/The-Easiest-Way-To-Deploy-Cloud-Functions-for-your-React-Projects/).

<!-- DOCUMENTATION EXAMPLES -->
## Documentation

Documentation for this library included in the `easybase-react` library [available here](https://easybase.io/docs/easybase-react/).

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/easybase/easybasejs/issues) for a list of proposed features (and known issues).


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/EasybaseFeature`)
3. Commit your Changes (`git commit -m 'feature'`)
4. Push to the Branch (`git push origin feature/EasybaseFeature`)
5. Open a Pull Request

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.


<!-- CONTACT -->
## Contact

Your Name - [@easybase_io](https://twitter.com/easybase_io) - hello@easybase.io

Project Link: [https://github.com/easybase/easybasejs](https://github.com/easybase/easybasejs)


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
<!-- [contributors-shield]: https://img.shields.io/github/contributors/easybase/repo.svg?style=flat-square
[contributors-url]: https://github.com/easybase/repo/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/easybase/repo.svg?style=flat-square
[forks-url]: https://github.com/easybase/repo/network/members
[stars-shield]: https://img.shields.io/github/stars/easybase/repo.svg?style=flat-square
[stars-url]: https://github.com/easybase/repo/stargazers
[issues-shield]: https://img.shields.io/github/issues/easybase/repo.svg?style=flat-square
[issues-url]: https://github.com/easybase/repo/issues
[license-shield]: https://img.shields.io/github/license/easybase/repo.svg?style=flat-square
[license-url]: https://github.com/easybase/repo/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/easybase
[product-screenshot]: images/screenshot.png -->