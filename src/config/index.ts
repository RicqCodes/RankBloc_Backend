import "dotenv/config";

const { PORT } = process.env;

export const port = PORT || 7200;
