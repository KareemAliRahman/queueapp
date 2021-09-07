module.exports = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "queueappdb",
  synchronize: true,
  logging: ["error"],
  entities: ["build/db/entity/**/*.js"],
  migrations: ["build/db/migration/**/*.js"],
  subscribers: ["build/db/subscriber/**/*.js"],
  cli: {
    entitiesDir: "build/db/entity",
    migrationsDir: "build/db/migration",
    subscribersDir: "build/db/subscriber",
  },
};
