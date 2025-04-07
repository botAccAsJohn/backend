import connectDb from "./db/index.js";
import isLoggedIn from "./middelware/loggedIn.js";
import refreshAccessToken from "./middelware/refreshAceesToken.js";
import expressServer from "./utils/index.js";
import irrigationRoutes from './router/irrigationRoutes.js';
// import authenticateUser from "../utils/auth.js";
import apiResponse from "./utils/apiResponse.js";
import userRouter from "./router/user.router.js";
import plotRoutes from "./router/plot.route.js";




const app = expressServer();

//import routes

// routes
app.use("/api/auth", userRouter);

app.use('/api/irrigation', irrigationRoutes);

app.use("/api/plot", plotRoutes);


//Home Route
app.get("/", refreshAccessToken, isLoggedIn, (req, res) => {
  // res.render("index", { isLoggedIn: req.isLoggedIn, error: "error" });
  res.json(
    new apiResponse(
      200,
      { isLoggedIn: req.isLoggedIn, error: "" },
      "Welcome to Home Page"
    )
  );
});

//404 Route
app.use((req, res) => {
  // res.status(404).render("error", { error: "Page not found" });
  res.json(new apiResponse(404, { error: "" }, "Page not found"));
});

//Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.json(new apiResponse(500, { error: err.stack }, "Internal Server Error"));
});

//Connection Checking
const connection = await connectDb();
const port = process.env.PORT ?? 8000;
if (connection) {
  console.log(
    "Successfully connected to database : ",
    connection.connection.host
  );
  app.listen(port, () => {
    console.log(`listening on ${port}`);
  });
}
