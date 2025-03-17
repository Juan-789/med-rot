import twilio from "twilio";
import { ActionOptions } from "gadget-server";

export const run: ActionRun = async ({ logger, config }) => {
  // Initialize Twilio client
  const accountSid = config.TWILIO_SID;
  const authToken = config.TWILIO_AUTH;
  const client = twilio(accountSid, authToken);

  try {
    // Create the call with medication reminder message
    const call = await client.calls.create({
      from: config.PHONE_NUMBER,
      to: "+16132865120",
      twiml: "<Response><Play> https://boysenberry-mongoose-2952.twil.io/assets/w_x36z7cib.mp3</Play></Response>",
    });

    logger.info(`Call initiated with SID: ${call.sid}`);
    return { success: true, callSid: call.sid };
  } catch (error) {
    logger.error("Failed to make Twilio call", error);
    throw error;
  }
};

export const options: ActionOptions = {
  // Make sure this action is exposed to the API
  triggers: { api: true }
};
