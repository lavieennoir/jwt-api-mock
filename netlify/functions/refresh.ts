import { Handler, HandlerEvent } from "@netlify/functions";
import { authorizationService } from "../../src/services/authorization.service";
import { functionWrapper } from "../../src/utils/function-wrapper.utils";

const handler: Handler = functionWrapper(
  async (event: HandlerEvent) => {
    const body = JSON.parse(event.body ?? "{}");

    const tokens = await authorizationService.refreshTokens(
      body.refreshToken ?? ""
    );
    return tokens;
  },
  { allowedMethods: ["POST"] }
);

export { handler };
