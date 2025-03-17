import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "medication" model, go to https://hackathon-website.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "Qctk_arp1O_R",
  comment:
    "This model represents a medication, storing its name, description, dosage, side effects, interactions, and AI-generated information, with a relationship to the user who added it.",
  fields: {
    aiGeneratedInfo: { type: "json", storageKey: "Y7wOvYIYYbYp" },
    description: { type: "string", storageKey: "3m5P30eObGZZ" },
    dosage: { type: "string", storageKey: "zEZfFweAjmEl" },
    interactions: { type: "string", storageKey: "xsjnlJ2BCGZi" },
    name: {
      type: "string",
      validations: { required: true },
      storageKey: "-cwIwHkCjsxE",
    },
    sideEffects: { type: "string", storageKey: "vHb2vSN3GOev" },
    user: {
      type: "belongsTo",
      validations: { required: true },
      parent: { model: "user" },
      storageKey: "j9H8wd7OlYNY",
    },
  },
};
