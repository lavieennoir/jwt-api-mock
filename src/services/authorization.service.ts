import ClientError from "../models/client-error";
import { jwtService } from "./jwt.service";
import { userService } from "./user.service";

const signIn = async (email: string, password: string) => {
  const user = await userService.getByEmail(email);

  if (!user || password !== user.password) {
    throw new ClientError("Email or password is invalid");
  }

  return jwtService.createJwtPair({ id: user.id, role: user.role });
};

const refreshTokens = async (refreshToken: string) => {
  const payload = jwtService.getJwtPayloadIfVerified(refreshToken);

  if (!payload) {
    throw new ClientError("Refresh token is invalid");
  }

  const user = await userService.getById(payload.id);

  if (!user) {
    throw new ClientError("Your account was deleted");
  }

  return jwtService.createJwtPair({ id: user.id, role: user.role });
};

export const authorizationService = {
  signIn,
  refreshTokens,
};
