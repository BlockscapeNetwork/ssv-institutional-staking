import { SQ, SQF, SQW, SQR } from './sq'

type Expression = string | SQ
type Value = { [column: string]: any }
type Row = { [column: string]: any }
type Conditions = (SQ | { [field: string]: SQ | any })[]
type Simplify<T> = { [key in keyof T]: T[key] };

export interface With {
   /**
    * **WITH clause** - table arguments
    * 
    * Constructs a Common Table Expression (CTE)
    *
    * A table is an object where each key is an alias and each value may be:
    *   * a subquery
    *   * an array of data values
    * 
    * Call `.withRecursive` to make the CTE recursive.
    * 
    * Multiple calls to `.with` are joined with ', '.
    * 
    * @example
 ```js
 sq.with({
     width: sq.return({ n: 10 }),
     height: sq.sql`select ${20} as n`
   })
   .return({ area: sq.txt`width.n * height.n`})
 // with width as (select 10 as n), height as (select 20 as n)
 // select width.n * height.n as area
 
 const people = [{ age: 7, name: 'Jo' }, { age: 9, name: 'Mo' }]
 sq.with({ people }).return('max(age)').from('people')
 // with people(age, name) as (values (7, 'Jo'), (9, 'Mo'))
 // select max(age) from people
 ```
    */
   with(...tables: { [table: string]: SQ | Value[] }[]): this

   /**
    * **WITH RECURSIVE** - recursive CTE
    * 
    * Makes the Common Table Expression recursive.
    * 
    * `.withRecursive` is idempotent. 
    * 
    * @example
 ```js
 const one = sq.return`1`
 const next = sq.return`n + 1`.from`t`.where`n < 100`
 sq.withRecursive({ 't(n)': one.unionAll(next) })
   .from`t`
   .return`sum(n)`
 ```
    *
 ```sql
 -- SQL
 with recursive t(n) as (
   select 1 union all (
     select n + 1 from t where (n < 100)
   )
 )
 select sum(n) from t'
 ```
    */
   withRecursive(...tables: { [table: string]: SQ | Value[] }[]): this
}

interface Execute extends Promise<Row[]> {
   /**
    * In a Select query, executes the query and returns a Promise for an array of rows.
    * 
    * Insert, Delete, and Update queries return a Promise for an array of numbers rather than a Record<string, any>[].
    * 
    * @example
    * ```js
    * const table = Easybase.EasybaseProvider({ ebconfig }).db("MYTABLE");
    * const { e } = table; // Optional query expressions
    * 
    * await table.return().where(e.eq("title", "The Lion King")).all();
    * ```
    */
   all(trx?: Transaction): Promise<Record<string, any>[] | number[]>

   /**
    * In a Select query, executes the query and returns a Promise for the first row.
    * 
    * If no row is returned, the Promise resolves to `undefined`.
    * 
    * Insert, Delete, and Update queries return a Promise for a number rather than a Record<string, any>.
    * 
    * @example
    * ```js
    * const table = Easybase.EasybaseProvider({ ebconfig }).db("MYTABLE");
    * const { e } = table; // Optional query expressions
    * 
    * await table.return().where(e.eq("title", "The Lion King")).one();
    * ```
    */
   one(trx?: Transaction): Promise<Record<string, any> | number>
}


interface ExpressFrom {
   /**
    * **FROM clause** - table arguments - express `.from`
    * 
    * A table may be:
    * * an expression
    * * an object where each key is an alias and each value may be
    *   * an expression
    *   * an array of data values
    * 
    * An expression may be a string or subquery
    * 
    * The first call to `.from` specifies the query table.
    * 
    * Subsequent calls have different effects based on query type.
    * 
    * * `select * from a, b, c`
    * * `update a from b, c`
    * * `delete a using b, c`
    * * `insert into a`
    *
    * @example
 ```js
 sq('book')
 // select * from book
 
 sq('book').where({ id: 8 }).set({ authorId: 7 })
 // update book set author_id = $1 where id = $2
 
 sq.delete().where({ id: 7 })
 
 sq('book').insert({ title: 'Moby Dick', authorId: 8 })
 // insert into book (title, author_id) values ($1, $2)
 
 sq(sq.txt`unnest(array[1, 2, 3])`)
 // select * from unnest(array[1, 2, 3])
 
 sq({ b: 'book' a: 'author' })
 // select * from book as b, author as a
 
 sq({ b: 'book' a: 'author' })
 // select * from book as b, author as a
 
 sq({ old: sq('person').where`age > 60` })
 // select * from (select * from person where age > 60) as old
 
 sq({ p: [{ id: 7, name: 'Jo' }, { id: 9, name: 'Mo' }] })
 // select * from (values ($1, $2), ($3, $4)) as p(id, name)
 
 sq({ countDown: sq.txt`unnest(${[3, 2, 1]})` }).query
 // select * from unnest($1) as count_down'
 ```
    */
   (...tables: (Expression | { [alias: string]: Expression | Value[] })[]): SQW
}

export interface Return {
   /**
    * **SELECT or RETURNING clause** - https://easybase.github.io/EasyQB/docs/select_queries.html#select
    *
    * Pass `.return` the fields the query should return.
    * 
    * A field may be:
    * * an expression
    * * a non-string argument to parameterize
    * * an object where each key is an alias and each value is:
    *   * an expression
    *   * a non-string argument to parameterize
    * 
    * An expression may be a string or subquery.
    * 
    *
    * @example
    * ```
    * db('MY-TABLE').return().one() // all columns
    * db('MY-TABLE').return('title', 'rating').one()
    * ```
    */
   return(...fields: (Expression | any | { [alias: string]: Expression | any })[]): this
}

export interface ExpressReturn {
   /**
    * **SELECT or RETURNING clause** - field arguments - express `.return`
    *
    * Pass `.return` the fields the query should return.
    * 
    * A field may be:
    * * an expression
    * * a non-string argument to parameterize
    * * an object where each key is an alias and each value is:
    *   * an expression
    *   * a non-string argument to parameterize
    * 
    * An expression may be a string or subquery.
    * 
    * **To prevent SQL injection, never source string fields from user input**
    *
    */
   (...fields: (Expression | any | { [alias: string]: Expression | any })[]): SQ
}

export interface Where {
   /**
    * **WHERE clause** - query filters
    *
    * Pass `.where` the filter conditions.
    * 
    * A condition may be:
    * * a manual subquery
    * * an object such that each value is
    *   * a manual subquery and its key is ignored
    *   * or checked for equality against its key
    * 
    * Multiple conditions are joined with _" or "_.
    * 
    * Properties within an object are joined with _" and "_.
    * 
    * Multiple calls to `.where` are joined with _" and "_.
    *
    * @example
    * ```js
    * await table.return().where({ title: "The Lion King", rating: 55 }).all()
    * await table.return().where(
    *    e.or(
    *       e.eq("title", "The Lion King"), // Equals
    *       e.gt("rating", 80) // Greater than
    *    )
    * ).all()
    * await table.return().where({ rating: [55, 56, 57, 58, 59] }).all()
    * ```
    * 
    */
   where(...conditions: Conditions): this
}

export interface ExpressWhere {
   /**
    * **WHERE clause** - query filters - express `.where`
    *
    * Pass `.where` the filter conditions.
    * 
    * A condition may be:
    * * a manual subquery
    * * an object such that each value is
    *   * a manual subquery and its key is ignored
    *   * or checked for equality against its key
    * 
    * Multiple conditions are joined with _" or "_.
    * 
    * Properties within an object are joined with _" and "_.
    * 
    * Multiple calls to `.where` are joined with _" and "_.
    *
    * @example
 ```js
 sq('person')({ id: 7 })
 // select * form person where (id = $1)
 
 sq('person')(sq.txt`age >= ${18}`).set({ adult: true })
 // update person set adult = $1 where (age >= ${2})
 
 sq.delete('person')({ age: 20, id: 5 }, { age: 30 })
 // delete from person where (age = $1 and id = $1 or age = $2)
 
 sq('person')(sq.txt`name = ${'Jo'}`, { age: 17 })
 // select * from person where (name = $1 or age = $2)
 
 sq('person')({ minAge: sq.txt`age < ${17}` })
 // select * from person where (age = $1)
 
 sq('person')({ age: 7, gender: 'male' })
 // select * from person where (age = $1 and gender = $2)
 
 sq('person')({ age: 7 }).where({ name: 'Joe' })
 // select * from person where (age = $1) and name = $2
 ```
    */
   (...conditions: Conditions): SQR
}

interface Logic extends And, Or { }

export interface And {
   /**
    * **AND condition** - https://easybase.github.io/EasyQB/docs/operations.html#and
    * 
    * Condition to chain after `.where`, `.on`, or `.having`.
    * 
    * @example
    * ```js
    * await table.return().where(
    *    e.and(
    *       e.eq("title", "The Lion King"), // Equals
    *       e.gt("rating", 80) // Greater than
    *    )
    * ).all()
    * ```
    */
   and(...conditions: Conditions): this
}

interface Or {
   /**
    * **OR condition** - https://easybase.github.io/EasyQB/docs/operations.html#or
    * 
    * Condition to chain after `.where`, `.on`, or `.having`.
    * 
    * @example
    * ```js
    * await table.return().where(
    *    e.or(
    *       e.eq("title", "The Lion King"), // Equals
    *       e.gt("rating", 80) // Greater than
    *    )
    * ).all()
    * ```
    */
   or(...conditions: Conditions): this
}

export interface Distinct {
   /**
    * **SELECT DISTINCT**
    * 
    * Filters the query results so only distinct rows are returned. Duplicate result rows are eliminated.
    * 
    * `.distinct` filters rows using every column. To filter on a subset of columns use `.distinctOn` instead.
    * 
    * `.distinct` is idempotent.
    * 
    * @example
 ```js
 sq.return('name', 'age').distinct.from('person')
 // select distinct name from person
 ```
    */
   distinct: this

   /**
    * **SELECT DISTINCT ON** - columns
    * 
    * Filters query results on a subset of columns.
    * 
    * If multiple rows share values for the distinct columns, only the first is returned. An order by clause is needed to make the result set deterministic.
    * 
    * Columns may be strings or subqueries.
    * 
    * Multiple calls to `.distinctOn` are joined with ', '.
    * 
    * @example
 ```js
 sq.from('person').return('name', 'age').distinctOn('name').orderBy('name')
 // select distinct on (name) name, age from person order by name
 
 sq.from('person').distinctOn('name', 'age').distinctOn('gender')
 // select distinct on (name, age, gender) * from person
 ```
    */
   distinctOn(...columns: (string | SQ)[]): this

   /**
    * **SELECT DISTINCT ON** - template string
    * 
    * Filters query results on a subset of columns.
    * 
    * If multiple rows share values for the distinct columns, only the first is returned. An order by clause is needed to make the result set deterministic.
    * 
    * Multiple calls to `.distinctOn` are joined with ', '.
    * 
    * @example
 ```js
 sq.from`person`.return`name, age`.distinctOn`name`.orderBy`name`
 // select distinct on (name) name, age from person order by name
 
 sq.from`person`.distinctOn`name, age`.distinctOn`gender`
 // select distinct on (name, age, gender) * from person
 ```
    */
   distinctOn(...columns: (string | SQ)[]): this
}

interface GroupItems extends Array<Expression | RollupItem | CubeItem | GroupingSetsItem | GroupItems> { }
interface ExpressionItems extends Array<Expression | ExpressionItems> { }

interface RollupItem {
   type: 'rollup'
   args: ExpressionItems
}
interface CubeItem {
   type: 'cube'
   args: ExpressionItems
}
interface GroupingSetsItem {
   type: 'grouping sets',
   args: GroupItems
}

export interface GroupHelpers {
   /**
    * **[ROLLUP item](https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-GROUPING-SETS)** - creates rollup grouping sets for use in a group by clause
    * 
 ```sql
 rollup (a, b, c)
 ```
    * is equivalent to
 ```sql
 grouping sets ((a, b, c), (a, b), (a), ())
 ```
    * 
    * @example
 ```js
 sq.from`t`.groupBy(sq.rollup('a', ['b', sq.txt`c`], 'd'))
 // select * from t group by rollup (a, (b, c)), d
 ```
    */
   rollup(...args: ExpressionItems): RollupItem

   /**
    * **[CUBE item](https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-GROUPING-SETS)** - creates cube grouping sets for use in a group by clause
    * 
 ```sql
 cube (a, b, c)
 ```
    * is equivalent to
 ```sql
 grouping sets ((a, b, c), (a, b), (a, c), (a), (b, c), (b), (c), ())
 ```
    * 
    * @example
 ```js
 sq.from`t`.groupBy(sq.cube('a', ['b', sq.txt`c`], 'd'))
 // select * from t group by cube (a, (b, c)), d
 ```
    */
   cube(...args: ExpressionItems): CubeItem

   /**
  * **[Grouping Sets item](https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-GROUPING-SETS)** - creates grouping sets for use in a group by clause
  * 
  * Accepts the same arguments as `.groupBy`. Grouping sets can be nested.
  * 
  * @example
```js
sq.from`t`.groupBy(
 sq.groupingSets(
   ['a', 'b', 'c'],
   sq.groupingSets(['a', 'b']),
   ['a'],
   [],
   sq.cube('a', 'b')
 )
)
// select * from t group by grouping sets ((a, b, c), grouping sets ((a, b)), (a), (), cube (a, b))
```
  */
   groupingSets(...args: GroupItems): GroupingSetsItem
}

export interface GroupBy {
   /**
    * **GROUP BY clause** - https://easybase.github.io/EasyQB/docs/select_queries.html#group-by
    * `.groupBy` accepts a column name and builds *group by* clauses. You may also provide some aggregator function in `return`. This often has no effect on the resulting aggregation.
    * An expression may be a string or subquery.
    *
    * The following aggregators can be used in `.return` from the expression object: `.min`, `.max`, `.sum`, `.avg`, and `.count`.
    * Multiple `.groupBy` calls are joined with ', '.
    * 
    * @example
    * ```js
    * await table.return(e.avg('rating')).groupBy('rating').all()
    * 
    * [ { avg_rating: 68 } ]
    * ```
    */
   groupBy(...args: GroupItems): this
}

export interface Having {
   /**
    * **HAVING clause** - group conditions
    *
    * A condition may be:
    * * a manual subquery
    * * an object such that each value is
    *   * a manual subquery and its key is ignored
    *   * or checked for equality against its key
    * 
    * @example
    */
   having(...conditions: Conditions): this
}

export interface OrderBy {
   /**
    * **ORDER BY clause** - https://easybase.github.io/EasyQB/docs/select_queries.html#order-by
    * 
    * Specify row ordering with `.orderBy`. This function accepts objects.
    * 
    * The property `by` is used for ordering. Set property `sort` to either `'asc'` or `'desc'`.
    * 
    * Multiple `.orderBy` calls are joined with ', '.
    * 
    * @example
    * ```js
    * await table().return().orderBy({ by: "rating", sort: "asc" }).all()
    * 
    * [
    *    { "title": "The Lion King", "rating": 55 },
    *    { "title": "Jurassic World", "rating": 59 },
    *    { "title": "Titanic", "rating": 75 },
    *    { "title": "Avatar", "rating": 83 }
    * ]
    *```
    */
   orderBy(...orderItems: (Expression | {
      by: Expression
      sort?: 'asc' | 'desc'
      using?: string
      nulls?: 'first' | 'last'
   })[]): this
}


export interface Limit {
   /**
    * **LIMIT clause** - https://easybase.github.io/EasyQB/docs/select_queries.html#limit
    *
    * Specify the maximum number of results to return
    * 
    * Only the last call to `.limit` is used.
    * 
    * @example
    * ```js
    * await table.return().limit(2).all()
    * 
    * [
    *    { "title": "Avatar", "rating": 83 },
    *    { "title": "Titanic", "rating": 75 }
    * ]
    * ```
    */
   limit(limit: number): this
}


export interface Offset {
   /**
    * **OFFSET clause** - https://easybase.github.io/EasyQB/docs/select_queries.html#offset
    *
    * Specify the number of results to skip before returning
    * 
    * Only the last call to `.offset` is used.
    * 
    * @example
    * ```js
    * await table.return().offset(1).all()
    * 
    * [
    *    { "title": "Titanic", "rating": 75 },
    *    { "title": "The Lion King", "rating": 55 },
    *    { "title": "Jurassic World", "rating": 59 }
    * ]
    * ```
    */
   offset(offset: number): this
}

export interface Joiner<T> {
   /**
    * **JOIN clause** - table arguments
    */
   join(...tables: (Expression | { [alias: string]: Expression | Value[] })[]): T
}

export interface Join {
   /**
    * **JOIN clause** - table arguments
    * 
    * Creates a join table.
    * 
    * Accepts the same arguments as `.from`
    * 
    * Joins are inner by default. Specify the join type with a prior call to `.inner`, `.left`, `.right`, `.full`, or `.cross`.
    * 
    * Joins are natural by default. Call `.on` or `.using` after `.join` to specify join conditions.
    * 
    * @example
 ```js
 sq.from('book').join('author')
 // select * from book natural join author
 
 sq.from({ b: 'book' }).join({ a: 'author'}).on`b.author_id = a.id`
 // select * from book as b join author as a on (b.author_id = a.id)
 
 sq.from({ b: 'book' }).join({ a: 'author'})
   .on({ 'b.author_id': sq.raw('a.id') }).on({ 'b.genre': 'Fantasy' })
 // select * from book as b join author as a on (b.author_id = a.id) and (b.genre = 'Fantasy')
 
 sq.from({ b: 'book' }).join({ a: 'author'}).on`${sq.raw('b.author_id')} = ${sq.raw('a.id')}`
   .and({ 'b.genre': 'Fantasy' }).or({ 'b.special': true })
 // select * from book as b join author as a on (b.author_id = a.id) and (b.genre = $1) or (b.special = true)
 
 sq.from('book').join('author').using('author_id')
 // select * from book join author using (author_id)
 
 sq.from('a').join('b').using('x', 'y').using('z')
 // select * from a join b using (x, y, z)
 
 sq.from('book').leftJoin('author').rightJoin`publisher`
 // select * from book natural left join author natural right join publisher
 
 sq.from('book').naturalRightJoin('author').crossjoin`publisher`
 // select * from book natural right join author natural join publisher
 ```
    */
   join(...tables: (Expression | { [alias: string]: Expression | Value[] })[]): this

   /**
    * **INNER JOIN** - (inner) join
    * 
    * Sets the join type to inner. This method is not usually needed because joins are inner by default.
    * 
    * @example
 ```js
 sq.from`book`.join`author`
 // select * from book natural join author
 
 sq.from`book`.join`author`
 // select * from book natural join author
 
 sq.from`book`.join`author`.on`book.author_id = author.id`
 // select * from book join author on book.author_id = author.id
 ```
    */
   inner: Joiner<this>

   /**
    * **LEFT JOIN** - left (outer) join
    * 
    * Sets the join type to left
    * 
    * @example
 ```js
 sq.from`book b`.leftJoin`author a`
 // select * from book natural left join author
 
 sq.from`book b`.leftJoin`author a`.on`b.author_id = a.id`
 // select * from book b left join author a on b.author_id = a.id
 ```
    */
   left: Joiner<this>

   /**
    * **RIGHT JOIN** - right (outer) join
    * 
    * Sets the join type to right
    * 
    * @example
 ```js
 sq.from`book b`.rightJoin`author a`
 // select * from book natural right join author
 
 sq.from`book b`.rightJoin`author a`.on`b.author_id = a.id`
 // select * from book b right join author a on b.author_id = a.id
 ```
    */
   right: Joiner<this>

   /**
    * **FULL JOIN** - full (outer) join
    * 
    * Sets the join type to full
    * 
    * @example
 ```js
 sq.from`book b`.fullJoin`author a`
 // select * from book natural full join author
 
 sq.from`book b`.fullJoin`author a`.on`b.author_id = a.id`
 // select * from book b full join author a on b.author_id = a.id
 ```
    */
   full: Joiner<this>

   /**
    * **CROSS JOIN** - cross join
    * 
    * Sets the join type to cross
    * 
    * @example
 ```js
 sq.from`book b`.crossJoin`author a`
 // select * from book cross join author
 
 sq.from`book b`.crossJoin`author a`.on`b.author_id = a.id`
 // select * from book b cross join author a on b.author_id = a.id
 ```
    */
   cross: Joiner<this>

   /**
    * **JOIN CONDITION** - join conditions
    * 
    * Specifies join conditions for the previous join.
    *
    * A condition may be:
    * * a manual subquery
    * * an object such that each value is
    *   * a manual subquery and its key is ignored
    *   * or checked for equality against its key
    * 
    * Multiple conditions are joined with _" or "_.
    * 
    * Properties within an object are joined with _" and "_.
    * 
    * Multiple calls to `.on` are joined with _" and "_.
    * 
    * @example
 ```js
 sq.from({ b: 'book' }).join({ a: 'author'}).on`b.author_id = a.id`
 // select * from book as b join author as a on (b.author_id = a.id)
 
 sq.from({ b: 'book' }).join({ a: 'author'})
   .on({ 'b.author_id': sq.raw('a.id') }).on({ 'b.genre': 'Fantasy' })
 // select * from book as b join author as a on (b.author_id = a.id) and (b.genre = 'Fantasy')
 
 sq.from({ b: 'book' }).join({ a: 'author'}).on`${sq.raw('b.author_id')} = ${sq.raw('a.id')}`
   .and({ 'b.genre': 'Fantasy' }).or({ 'b.special': true })
 // select * from book as b join author as a on (b.author_id = a.id) and (b.genre = $1) or (b.special = true)
 ```
    */
   on(...conditions: Conditions): this

   /**
    * **JOIN USING** - column names
    * 
    * Specifies the shared column for the previous join
    * 
    * Multiple `.using` calls are joined with ', '.
    * 
    * @example
 ```js
 sq.from('book').join('author').using('author_id')
 // select * from book join author using (author_id)
 
 sq.from('a').join('b').using('x', 'y').using('z')
 // select * from a join b using (x, y, z)
 ```
    */
   using(...columns: string[]): this
}

interface SetOperators {
   /**
    * **UNION Clause** - union queries
    * 
    * Pass `.union` the queries to union with the current query.
    * 
    * Union is a set operator, so duplicate result rows are eliminated.
    * 
    * Call `.unionAll` to keep duplicates.
    * 
    * @example
 ```js
 sq`a`.union(sq`b`)
 // select * from a union (select * from b)
 
 sq`a`.union(sq`b`, sq`c`)
 // select * from a union (select * from b) union (select * from c)
 
 sq`a`.union(sq`b`).union(sq`c`)
 // select * from a union (select * from b) union (select * from c)
 ```
    */
   union(...queries: SQ[]): this

   /**
    * **UNION ALL Clause** - unionAll queries
    * 
    * Pass `.unionAll` the queries to union with the current query.
    * 
    * Use `.unionAll` instead of `.union` to keep duplicate result rows.
    * 
    * @example
 ```js
 sq`a`.unionAll(sq`b`)
 // select * from a union all (select * from b)
 
 sq`a`.unionAll(sq`b`, sq`c`)
 // select * from a union all (select * from b) union all (select * from c)
 
 sq`a`.unionAll(sq`b`).unionAll(sq`c`)
 // select * from a union all (select * from b) union all (select * from c)
 ```
    */
   unionAll(...queries: SQ[]): this

   /**
    * **INTERSECT Clause** - intersect queries
    * 
    * Pass `.intersect` the queries to intersect with the current query.
    * 
    * intersect is a set operator, so duplicate result rows are eliminated.
    * 
    * Call `.intersectAll` to keep duplicates.
    * 
    * @example
 ```js
 sq`a`.intersect(sq`b`)
 // select * from a intersect (select * from b)
 
 sq`a`.intersect(sq`b`, sq`c`)
 // select * from a intersect (select * from b) intersect (select * from c)
 
 sq`a`.intersect(sq`b`).intersect(sq`c`)
 // select * from a intersect (select * from b) intersect (select * from c)
 ```
    */
   intersect(...queries: SQ[]): this

   /**
    * **INTERSECT ALL Clause** - intersectAll queries
    * 
    * Pass `.intersectAll` the queries to intersect with the current query.
    * 
    * Use `.intersectAll` instead of `.intersect` to keep duplicate result rows.
    * 
    * @example
 ```js
 sq`a`.intersectAll(sq`b`)
 // select * from a intersect all (select * from b)
 
 sq`a`.intersectAll(sq`b`, sq`c`)
 // select * from a intersect all (select * from b) intersect all (select * from c)
 
 sq`a`.intersectAll(sq`b`).intersectAll(sq`c`)
 // select * from a intersect all (select * from b) intersect all (select * from c)
 ```
    */
   intersectAll(...queries: SQ[]): this

   /**
    * **EXCEPT Clause** - except queries
    * 
    * Pass `.except` the queries to except with the current query.
    * 
    * except is a set operator, so duplicate result rows are eliminated.
    * 
    * Call `.exceptAll` to keep duplicates.
    * 
    * @example
 ```js
 sq`a`.except(sq`b`)
 // select * from a except (select * from b)
 
 sq`a`.except(sq`b`, sq`c`)
 // select * from a except (select * from b) except (select * from c)
 
 sq`a`.except(sq`b`).except(sq`c`)
 // select * from a except (select * from b) except (select * from c)
 ```
    */
   except(...queries: SQ[]): this

   /**
    * **EXCEPT ALL Clause** - exceptAll queries
    * 
    * Pass `.exceptAll` the queries to except with the current query.
    * 
    * Use `.exceptAll` instead of `.except` to keep duplicate result rows.
    * 
    * @example
 ```js
 sq`a`.exceptAll(sq`b`)
 // select * from a except all (select * from b)
 
 sq`a`.exceptAll(sq`b`, sq`c`)
 // select * from a except all (select * from b) except all (select * from c)
 
 sq`a`.exceptAll(sq`b`).exceptAll(sq`c`)
 // select * from a except all (select * from b) except all (select * from c)
 ```
    */
   exceptAll(...queries: SQ[]): this
}

export interface Insert {
   /**
    * **INSERT clause** - https://easybase.github.io/EasyQB/docs/insert_queries.html
    * 
    * Specifies the data to insert as objects.
    * 
    * Column names are inferred from object keys.
    * 
    * Values may be subqueries
    * 
    * Only the last call to `.insert` is used.
    * 
    * Executing an Insert query returns a Promise for a number or an array of numbers, for `.one` or `.all`, respectively.
    * 
    * @example
    * ```js
    * await table.insert.insert({ title: "Forest Gump", rating: 82 }).one()
    * // > 1
    * 
    * await table.insert(
    *    { title: "Forest Gump", rating: 82 },
    *    { title: "Joker", rating: 58 },
    *    { title: "Inception" }
    * ).one()
    * // > 3
    * ```
    */
   insert(...values: Value[]): this

   /**
    * **INSERT clause** - https://easybase.github.io/EasyQB/docs/insert_queries.html
    * 
    * Specifies the data to insert as objects.
    * 
    * Column names are inferred from object keys.
    * 
    * Values may be subqueries
    * 
    * Only the last call to `.insert` is used.
    * 
    * Executing an Insert query returns a Promise for a number or an array of numbers, for `.one` or `.all`, respectively.
    * 
    * @example
    * ```js
    * await table.insert.insert({ title: "Forest Gump", rating: 82 }).one()
    * // > 1
    * 
    * await table.insert(
    *    { title: "Forest Gump", rating: 82 },
    *    { title: "Joker", rating: 58 },
    *    { title: "Inception" }
    * ).one()
    * // > 3
    * ```
    */
   insert(values: Value[]): this

   /**
    * **INSERT clause** - https://easybase.github.io/EasyQB/docs/insert_queries.html
    * 
    * Specifies the data to insert as objects.
    * 
    * Column names are inferred from object keys.
    * 
    * Values may be subqueries
    * 
    * Only the last call to `.insert` is used.
    * 
    * Executing an Insert query returns a Promise for a number or an array of numbers, for `.one` or `.all`, respectively.
    * 
    * @example
    * ```js
    * await table.insert.insert({ title: "Forest Gump", rating: 82 }).one()
    * // > 1
    * 
    * await table.insert(
    *    { title: "Forest Gump", rating: 82 },
    *    { title: "Joker", rating: 58 },
    *    { title: "Inception" }
    * ).one()
    * // > 3
    * ```
    */
   insert(query: SQ): this
}

export interface Set {
   /**
    * **SET clause** - https://easybase.github.io/EasyQB/docs/update_queries.html#set
    *
    * Pass `.set` the values to update.
    * 
    * Multiple `.set` calls are joined with ', '.
    * 
    * @example
    *
    * ```js
    * await table.set({ title: "Pulp Fiction" }).one()
    * // > 1
    * 
    * await table.set({ title: "Pulp Fiction" }).all()
    * // > 4
    * ```
    */
   set(...values: Value[]): this
}


export interface Delete {
   /**
    * DELETE - marks the query as a delete query - https://easybase.github.io/EasyQB/docs/delete_queries.html
    *
    * @example
    * await table.delete().one();
    * // > 1
    * 
    * await table.delete().where(e.gt('rating', 55)).all();
    * // > 3
    * 
    * await table.delete().where({ _key: res[0]._key }).one();
    * // > 1
    */
   readonly delete: this
}

interface End {
   /**
    * Closes the database connection.
    * 
    * Subsequent attempts to execute using the query builder will fail.
    */
   end(): Promise<void>
}

interface Transaction {
   /**
    * Commits the transaction
    */
   commit(): Promise<void>;

   /**
    * Rolls back the transaction
    */
   rollback(): Promise<void>;
}

interface TransactionMethods {
   /**
    * Creates a transaction
    * 
    * Pass an asynchronous callback containing queries that should be executed
    * in the context of the transaction. If an error is throw in `callback`,
    * the transaction is rolled back. Otherwise, the transaction is committed,
    * and the value returned by the callback is returned.
    * 
    * The callback's first argument `trx` must be passed to every query within
    * the transaction, or queries will not be part of the transaction.
    * 
    * @example
 ```js
 const id = await sq.transaction(async trx => {
     const { id } = await Account.insert({ username: 'jo' }).one(trx)
     await Auth.insert({ accountId: id, password: 'secret' }).all(trx)
  return id
 })
 ```
    */
   transaction<T>(callback: (trx: Transaction) => Promise<T>): Promise<T>

   /**
    * Creates a transaction
    * 
    * When called without arguments, `.transaction` returns a transaction
    * object `trx`. You MUST call `trx.commit()` or `trx.rollback()`.
    * 
    * This overload is less convenient but more flexible than the callback
    * transaction method.
    * 
    * @example
 ```js
 let trx
 try {
   trx = await sq.transaction()
   const { id } = await Account.insert({ username: 'jo' }).one(trx)
   await Auth.insert({ accountId: id, password: 'secret' }).all(trx)
   await trx.commit()
 } catch (error) {
   await trx.rollback()
 }
 ```
    */
   transaction(): Promise<Transaction>
}