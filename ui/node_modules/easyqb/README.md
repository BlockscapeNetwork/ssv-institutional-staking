<p align="center">
  <a href="https://easybase.io">
    <img src="https://easybase.io/assets/images/logo_black.png" alt="easybase logo black" width="80" height="80">
  </a>
</p>

## EasyQB — Query Builder for Easybase

<br />

Query Builder used in Easybase's JavaScript-based packages for [serverless frontend applications](https://easybase.io/about/2021/01/30/What-Is-a-Serverless-Application/). This project is based on Sqorn using functional expressions and conditionals. **If you're just starting out, [head to the Select page to begin](/docs/select_queries.html).**

EasyQB is built into both [_easybase-react_](https://github.com/easybase/easybase-react) and [_easybasejs_](https://github.com/easybase/easybasejs), through the exported `db` function. This function allows developers to logically create Easybase CRUD operations in code. It will become the standard query functionality for Easybase, replacing `Frame`.

The documentation outlined here is very much a modified version of that available on the [Sqorn website](https://sqorn.org/docs/about.html).

### Basic Usage:

Note that queries are not executed until a call to `.one` or `.all`.

```js
import Easybase from "easybasejs";
import ebconfig from "./ebconfig.js";

const table = Easybase.EasybaseProvider({ ebconfig }).db();
const { e } = table; // Expressions

// Delete 1 record
await table.delete.where(e.eq('app name', 'right now')).one();

// Basic select example
const records = await table.return().where(e.gt('rating', 15)).limit(10).all();
console.log(records);
```

To use this library you must first create and account an account at [easybase.io](https://easybase.io/), then [configure your project](https://easybase.io/react/#setup).

<hr />

### Built With

* [Sqorn](https://github.com/sqorn/sqorn)
* [easybase.io](https://easybase.io)
* [microbundle](https://github.com/developit/microbundle)