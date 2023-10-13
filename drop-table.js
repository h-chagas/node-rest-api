import { sql } from './db.js'

sql`
DROP TABLE IF EXISTS videos;
`.then(() => {
    console.log("Table dropped!");
})