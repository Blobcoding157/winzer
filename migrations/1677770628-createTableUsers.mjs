export async function up(sql) {
  await sql`
  CREATE TABLE users (
    id integer  PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(10) NOT NULL UNIQUE,
    password_hash VARCHAR(110) NOT NULL UNIQUE,
    first_name VARCHAR(20) ,
    last_name VARCHAR(20) ,
    role_id INTEGER NOT NULL
  )`;
}

export async function down(sql) {
  await sql`
  DROP TABLE users
  `;
}