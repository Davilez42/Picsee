DB_CONFIG = {
  host: "localhost",
  password: "root",
  user: "postgres",
  port: 5432,
  database: "picmont_dev_local",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

SERVER_CONFIG = {
  PORT: 5000,
  HOST: "localhost",
  Logger: true,
};

CONFIG_CORS = {
  origin: ["http://127.0.0.1:5500"],
};

IMAGE_KIT_CONFIG = {
  publicKey: "public_tN+GbIXQt6n+37QgX8Du6L7FSm4=",
  privateKey: "private_NPAxmrhLYKVEYAsfp5souoh/B5Y=",
  urlEndpoint: "https://ik.imagekit.io/picmont/",
  images_folder_dest: "/StorageDev/images",
  avatars_folder_dest: "/StorageDev/avatars",
};

module.exports = {
  DB_CONFIG,
  SERVER_CONFIG,
  IMAGE_KIT_CONFIG,
};