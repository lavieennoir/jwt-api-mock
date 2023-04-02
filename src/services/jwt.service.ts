import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { HandlerEvent } from "@netlify/functions";
import ClientError from "../models/client-error";

const JWT_SECRET = process.env.JWT_SECRET ?? "";
const ACCESS_TOKEN_EXPIRATION_TIME = "3m";
const REFRESH_TOKEN_EXPIRATION_TIME = "10m";

const createJwt = (
  payload: Record<string, string | number>,
  expiresIn: string | number
) =>
  jwt.sign(payload, JWT_SECRET, {
    expiresIn,
  });

const createJwtPair = (payload: Record<string, string | number>) => {
  return {
    accessToken: createJwt(payload, ACCESS_TOKEN_EXPIRATION_TIME),
    refreshToken: createJwt(payload, REFRESH_TOKEN_EXPIRATION_TIME),
  };
};

const getJwtPayloadIfVerified = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
};

const tryGetJwtPayloadFromEvent = (event: HandlerEvent) => {
  const authHeader = event.headers.authorization;
  // Header should have format of Bearer token (Bearer {access_token})
  const accessToken = authHeader?.split(" ")[1];

  if (!accessToken) {
    throw new ClientError("Unauthorized", 401);
  }

  try {
    return jwt.verify(accessToken, JWT_SECRET) as JwtPayload;
  } catch (e) {
    throw new ClientError("Unauthorized", 401);
  }
};

export const jwtService = {
  createJwtPair,
  getJwtPayloadIfVerified,
  tryGetJwtPayloadFromEvent,
};
