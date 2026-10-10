// instrumentation.js
import connectDB from "./config/db";

export async function register() {
  await connectDB();
}