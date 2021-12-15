import { Router } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepo, UserLoginInput } from "../db/repository/UserRepo";
import { sign, verify } from "jsonwebtoken";

export const AuthRouter = Router();

let refreshTokens = [];

// POST login
AuthRouter.post("/login", async (req, res) => {
  const userRepo = getCustomRepository(UserRepo);
  const userLoginReqObject: UserLoginInput = {
    email: req.body.email,
    password: req.body.password,
  };
  try {
    if (!userLoginReqObject.email || !userLoginReqObject.password) {
      throw new Error(req.t("invalid_email_or_password"));
    }
    const user = await userRepo.loginUser(userLoginReqObject);
    const accessToken = generateAccessToken(user.id);
    const refereshToken = sign(
      { userId: user.id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    refreshTokens.push(refereshToken);
    res.status(201).json({
      accessToken: accessToken,
      refreshToken: refereshToken,
      message: "logged in",
    });
  } catch (err) {
    if (err.message) {
      res.status(404).json({ errors: err.message });
      return;
    }
    res.status(404).json({ errors: err.details });
    return;
  }
});

// POST logout
AuthRouter.delete("/logout", (req, res) => {
  refreshTokens.filter((token) => token !== req.body.refereshToken);
  res.sendStatus(204);
});

// POST -> create new refreshToken
AuthRouter.post("/token", (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  // if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    console.log("user from /token endpoint", user);
    const newAccessToken = generateAccessToken(user.userId);
    res.status(201).json({
      accessToken: newAccessToken,
      refereshToken: refreshToken,
      message: "new access token granted",
    });
  });
});

const generateAccessToken = (id: string): string => {
  return sign({ userId: id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
