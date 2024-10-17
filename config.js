const DB_URI =
  "mongodb+srv://zhiyuzhong:XVlldaK2u9Od6ELb@cluster0.zvjyu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const API =
  process.env.NODE_ENV === "production"
    ? "https://nextecom-9od382cdd-zhiyus-projects-c87b6705.vercel.app/api"
    : "http://localhost:3000/api";
const NEXTAUTH_SECRET = "c2YgseOPSYxhicyp0l/6WGmQASgjhaQh/H0MskaBre4=";
const GOOGLE_CLIENT_ID =
  "917135036277-rcihdhn5hlp6imvmn4ib765lluc29ds9.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
module.exports = {
  DB_URI,
  API,
  NEXTAUTH_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
};
