const MONGODB_URI =
  "mongodb+srv://zhiyuzhong:v5i4LyG7pWgIMYfH@cluster0.zvjyu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const API =
  process.env.NODE_ENV === "production"
    ? "https://freshstarteshop-nrn6dxibu-zhiyusprojects.vercel.app/api"
    : "http://localhost:3000/api";

const NEXTAUTH_SECRET = "lz36Kb7mIFlXZPLeLTgKlNnQvjp21jnu7TEDyUD7JnQ=";
const GOOGLE_CLIENT_ID =
  "917135036277-rcihdhn5hlp6imvmn4ib765lluc29ds9.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

const CLOUDINARY_CLOUD_NAME = "dp0azmck8";
const CLOUDINARY_API_KEY = "556972825685387";
const CLOUDINARY_API_SECRET = "oqbMXXoqiNg7zBpb17GWwl6e6Ik";

const STRIPE_PUBLISHABLE_KEY =
  "pk_test_51QlGtSAKpYQsObFhPheBgBLQ2eqRxANiIN8cKKxXkhCWIM670IY9lO00mTCMZ2utmT7CabXo8eBtabmNe0GLUITT00ISWBvoCN";
const STRIPE_SECRET_KEY =
  "sk_test_51QlGtSAKpYQsObFhojhDYlNMHt4FJUUXYHhMlNUE4bLhfC9zzKLHQBlKn5S9r6HQGRCyRzksPB6dwUDw2W67ccjj00h6dUb6Nt";
const STRIPE_TAX_RATE = "txr_1QlfNTAKpYQsObFhqEqeD37I";
const STRIPE_SHIPPING_RATE = "shr_1QlHa3AKpYQsObFhUkJnC4Q1";
const STRIPE_WEBHOOK_SECRET =
  "whsec_8d94ac7649797aca8a6852abe64865ab8b8962cd23484461427bc867d1b3a5cf";
const DOMAIN =
  process.env.NODE_ENV === "production"
    ? "https://freshstarteshop-nrn6dxibu-zhiyusprojects.vercel.app"
    : "http://localhost:3000";

module.exports = {
  MONGODB_URI,
  API,
  NEXTAUTH_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  STRIPE_PUBLISHABLE_KEY,
  STRIPE_SECRET_KEY,
  STRIPE_TAX_RATE,
  DOMAIN,
  STRIPE_SHIPPING_RATE,
  STRIPE_WEBHOOK_SECRET,
};
