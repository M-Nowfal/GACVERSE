declare module "mongoose-sanitize" {
  import { Schema } from "mongoose";
  export default function mongooseSanitize(schema: Schema): void;
}
