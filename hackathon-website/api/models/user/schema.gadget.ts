import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "user" model, go to https://hackathon-website.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "o8tADAv-h14h",
  fields: {
    email: {
      type: "email",
      validations: { required: true, unique: true },
      storageKey: "B94uo5IxFt_M",
    },
    emailVerificationToken: {
      type: "string",
      storageKey: "_Zo1Zf13eDYy",
    },
    emailVerificationTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "nOpyPFcLbcao",
    },
    emailVerified: {
      type: "boolean",
      default: false,
      storageKey: "sye10KY3cWzr",
    },
    firstName: { type: "string", storageKey: "y27yKXm3QNAg" },
    googleImageUrl: { type: "url", storageKey: "ZYEbjLbzKkyN" },
    googleProfileId: { type: "string", storageKey: "kUZpCZ-DmK8j" },
    lastName: { type: "string", storageKey: "E6TcR3K3si2B" },
    lastSignedIn: {
      type: "dateTime",
      includeTime: true,
      storageKey: "dwWGS0u6ikYZ",
    },
    password: {
      type: "password",
      validations: { strongPassword: true },
      storageKey: "hq_ppc6rAoFs",
    },
    resetPasswordToken: {
      type: "string",
      storageKey: "BNUFL_-C1Bbd",
    },
    resetPasswordTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "BibAh7Muf-Wk",
    },
    roles: {
      type: "roleList",
      default: ["unauthenticated"],
      storageKey: "YhgX5WQwFSos",
    },
  },
};
