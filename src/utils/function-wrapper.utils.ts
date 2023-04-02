import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import ClientError from "../models/client-error";

export type WrappedHandler = (
  event: HandlerEvent,
  context: HandlerContext
) => Promise<Record<string, unknown>>;

export interface IFunctionWrapperOptions {
  allowedMethods: string[];
}
const responseHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
};

export const functionWrapper =
  (handler: WrappedHandler, options?: IFunctionWrapperOptions): Handler =>
  async (event: HandlerEvent, context: HandlerContext) => {
    try {
      if (event.httpMethod === "OPTIONS") {
        return {
          statusCode: 200,
          headers: responseHeaders,
        };
      }
      if (
        options?.allowedMethods &&
        !options?.allowedMethods.includes(event.httpMethod)
      ) {
        return {
          statusCode: 405,
          headers: responseHeaders,
          body: JSON.stringify({ message: "Method not allowed" }),
        };
      }

      const body = await handler(event, context);
      return {
        statusCode: 200,
        headers: responseHeaders,
        body: JSON.stringify(body),
      };
    } catch (e) {
      if (e instanceof ClientError) {
        return {
          statusCode: e.status,
          headers: responseHeaders,
          body: JSON.stringify({ message: e.message, payload: e.payload }),
        };
      }

      console.error(e);
      return {
        statusCode: 500,
        headers: responseHeaders,
        body: JSON.stringify({ message: "Internal server error" }),
      };
    }
  };
