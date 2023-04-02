import { Handler, HandlerEvent } from "@netlify/functions";
import { jwtService } from "../../src/services/jwt.service";
import { userService } from "../../src/services/user.service";
import { functionWrapper } from "../../src/utils/function-wrapper.utils";

const handler: Handler = functionWrapper(
  async (event: HandlerEvent) => {
    const payload = await jwtService.tryGetJwtPayloadFromEvent(event);
    const user = userService.getById(payload.id);
    return { user };
  },
  { allowedMethods: ["GET"] }
);

export { handler };
