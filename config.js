const DB_URI =
  "mongodb+srv://zhiyuzhong:XVlldaK2u9Od6ELb@cluster0.zvjyu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const API =
  process.env.NODE_ENV === "production"
    ? "https://freshstarteshop-r6pq42zvx-zhiyusprojects.vercel.app"
    : "http://localhost:3000/api";
const NEXTAUTH_SECRET = "5P/Amm0cc7Vl/fKL7ORtYU366Z2wsmvI2sUO2Qo3Tpg=";
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
