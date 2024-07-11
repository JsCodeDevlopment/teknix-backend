import { CorsOptions } from "cors";
import doteenv from "dotenv";

doteenv.config();

const whitelistUrls: string[] = process.env.WHITELIST_URLS?.split(",") || [];

export const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (whitelistUrls.indexOf(origin!) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
