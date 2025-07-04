export const dbConfig = {
  username: "postgres",
  password: "YTSjIaFilzeKqJuZgvKhgcxjotbhoSKZ",
  database: "railway",
  host: "hopper.proxy.rlwy.net",   // ✅ only the hostname, not full URL
  port: 43961,                     // ✅ extract the port
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
};

