import express, { Request, Response } from "express";
import { createConnection } from "typeorm";
import { UserRouter } from "./router/UserRouter";
import { QueueRouter } from "./router/QueueRouter";
import { AuthRouter } from "./router/AuthRouter";
import { verify } from "jsonwebtoken";
import i18next from "i18next";
import i18nextFsBackend from "i18next-fs-backend";
import i18nextMiddleware from "i18next-http-middleware";
import { join } from "path";

const app = express();
// app.use(i18nextMiddleware.handle(i18next));

const authenticateToken = (req: Request, res: Response, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);
  const accessToken = authHeader.split(" ")[1];
  verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // console.log("---------------authenticateToken------------------------");
    // console.log(user);
    // console.log("---------------authenticateToken------------------------");
    if (err) return res.sendStatus(403);
    req["user"] = user;
    next();
  });
};

const startServer = async () => {
  // connecting to postgres db
  await createConnection();
  i18next
    .use(i18nextFsBackend)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
      fallbackLng: "en",
      backend: {
        loadPath: join("./locales/{{lng}}/translation.json"),
      },
    });

  // middleware for post requests
  app.use(express.json());
  app.use(i18nextMiddleware.handle(i18next));

  app.get("/", (_req, res, _next) => {
    res.send("Hello world");
  });

  // logging request
  app.use((req, _res, next) => {
    console.log(req.method, req.url);
    // console.log(req.headers);
    console.log(req.body);
    next();
  });

  // // logging response
  // const afterLogger = (_req, res, next) => {
  //   next();
  //   console.log(res.statusCode);
  // };

  // routes
  app.use("/", AuthRouter);
  app.get("/ayklam", (req, res) => {
    res.status(200).json(req.t("password_required"));
  });

  app.use("/users", UserRouter);
  app.use("/queues", authenticateToken, QueueRouter);

  app.listen(process.env.PORT || 4000, () => {
    console.log("server started");
  });
  // app.listen(4000, "0.0.0.0", () => {
  //   console.log("server started");
  // });
};

startServer();
