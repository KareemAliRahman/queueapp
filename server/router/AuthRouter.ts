import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepo } from '../db/repository/UserRepo';
import { sign, verify } from 'jsonwebtoken'

export const AuthRouter = Router();

let refreshTokens = [];

// POST login
AuthRouter.post('/login', async (req, res) => {
  const userRepo = getCustomRepository(UserRepo);
  try{
    const email = req.body.email;
    const password = req.body.password;
    if(!email || ! password){
      throw new Error("empty email or password");
    }
    const user = await userRepo.loginUser(email , password);
    const accessToken = generateAccessToken(user.id);
    const refereshToken = sign({userid: user.id}
      , process.env.REFRESH_TOKEN_SECRET , {expiresIn: "7d"});
    refreshTokens.push(refereshToken);
    res.status(201).json({accessToken : accessToken
      , refreshToken: refereshToken 
      , message: "logged in"}); 
  }
  catch(err){
    if(err.message){
      res.status(404).json({message: err.message});
      return;
    }
    res.status(404).json({message: err.details});
    return;
  }
});

// POST logout
AuthRouter.delete('/logout', (req, res) => {
  console.log(req);
  refreshTokens.filter((token => token !== req.body.refereshToken));
  res.sendStatus(204);
});


// POST -> create new refreshToken
AuthRouter.post('/token', (req, res) => {
  const refreshToken = req.body.refreshToken;
  if(!refreshToken) return res.sendStatus(401);
  if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, userId) => {
    if (err) return res.sendStatus(403)
    const newAccessToken = sign({userId: userId}, process.env.ACCESS_TOKEN_SECRET);
    res.status(201).json({ accessToken: newAccessToken, refereshToken: refreshToken, message: "new access token granted"});
  });
});

const generateAccessToken = (id: string) : string => {
    return sign({userId: id }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '7d'});
}
