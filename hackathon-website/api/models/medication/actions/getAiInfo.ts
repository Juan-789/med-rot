import { ActionOptions } from "gadget-server";
import { preventCrossUserDataAccess } from "gadget-server/auth";
import { getMedicationInfo } from "../../../utils/geminiAI";
// This import is unused and can be removed
import { SomeFrameworkParamsType } from "gadget-api";

// Define structure of params
interface ParamsType {
  userId: string;
}

// Define structure of a medication record
interface MedicationRecord {
  name: string;
}

export const run: ActionRun = async ({
  params,
  record,
  logger,
  api,
}: {
  params: ParamsType;
  record: MedicationRecord;
  logger: { error: (msg: string) => void };
  api: any; // Could be more strongly typed if API structure is known
}) => {
  // Ensure user can only access their own medications - good security practice
  await preventCrossUserDataAccess(params, record);
  
  // Get medication name from record
  const medicationName = record.name;
  
  try {
    // Call the Gemini AI utility to get information about the medication
    const aiGeneratedInfo = await getMedicationInfo(medicationName);
    
    // Return the AI-generated information
    return {
      name: medicationName,
      aiGeneratedInfo,
    };
  } catch (error: any) {
    // Good error handling with logging
    logger.error(
      `Error fetching AI information for medication ${medicationName}: ${error}`
    );
    throw new Error(
      `Failed to retrieve AI information for ${medicationName}: ${error.message}`
    );
  }
};

export const options: ActionOptions = {
  actionType: "custom",
  returnType: true // Return the result of the run function instead of the record
};