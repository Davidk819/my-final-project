import cors, { CorsOptions } from "cors";

const corsOptions: CorsOptions = {
  origin: true,
};

export const corsOrigin = cors(corsOptions);
