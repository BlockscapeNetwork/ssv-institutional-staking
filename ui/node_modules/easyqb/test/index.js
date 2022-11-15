var sq = require('../');

const easyqb = (tableName) => {
  const n = sq({ 
    oneCallback: async (trx, tableName, userAssociatedRecordsOnly) => {
      trx.count = "one";
      trx.tableName = tableName;
      if(userAssociatedRecordsOnly) trx.userAssociatedRecordsOnly = userAssociatedRecordsOnly;
      console.log(trx)
    },
    allCallback: async (trx, tableName, userAssociatedRecordsOnly) => {
      trx.count = "all";
      trx.tableName = tableName;
      if(userAssociatedRecordsOnly) trx.userAssociatedRecordsOnly = userAssociatedRecordsOnly;
      console.log(trx)
    },
    tableName: tableName || "untable",
    userAssociatedRecordsOnly: tableName? true : false
  })(tableName || "untable");
  return n;
}

async function main() {
  const table1 = easyqb();
  table1.delete()
  const e = table1.e;
  console.log(easyqb().e.or(e.eq('app_name', 'asdf'), e.between('rating', 10, 660)).query)
  // await table1.return().where(e.dateGte('dateCol', new Date())).all()
  await table1.return().where({ hello: "word", _key: 123 }).all()
  // await table1.delete().where({ _key: "wer" }).one()
  // await table1.return().where(e.between('rating', 10, 660)).all()
  e.gtAll('rating', [1, 2, 3])
  // await table1.delete().where(e.or(
  //   e.eq('hello', 15),
  //   e.between('rating', 10, 660)
  // )).one()
  // await table1.delete().one()
  // await table1.return().where({ hello: "world"}).one()
  // await table1.return().one()
}
// table2.return().where(e.dateLt('dateCol', new Date())).all()
// table2.return().where(e.dateNeq('dateCol', new Date())).all()
// table1.return(e.max('Hello Table')).where(e.eq('app_name', 'asdf')).all()
// table1.insert({ "hello world": "123" }).one();

main();