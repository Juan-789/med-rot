import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "user" model, go to https://lebron.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "klHsXWBO7kmP",
  fields: {
    email: {
      type: "email",
      validations: { required: true, unique: true },
      storageKey: "Kny9iXbJGDlC",
    },
    emailVerificationToken: {
      type: "string",
      storageKey: "7zi6x06psm6I",
    },
    emailVerificationTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "_4_gYBN0dusP",
    },
    emailVerified: {
      type: "boolean",
      default: false,
      storageKey: "lFHPPNVxlUrC",
    },
    firstName: { type: "string", storageKey: "LD7elNmjwNlt" },
    googleImageUrl: { type: "url", storageKey: "xx2tgFjfqVpk" },
    googleProfileId: { type: "string", storageKey: "LeUjdsBCZIkY" },
    lastName: { type: "string", storageKey: "9DFqsDDuVQV4" },
    lastSignedIn: {
      type: "dateTime",
      includeTime: true,
      storageKey: "sQBhmw89rC8C",
    },
    password: {
      type: "password",
      validations: { strongPassword: true },
      storageKey: "v5jwbofJMqcc",
    },
    resetPasswordToken: {
      type: "string",
      storageKey: "ejiz24-6jzYV",
    },
    resetPasswordTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "v9jdtSRLFqVP",
    },
    roles: {
      type: "roleList",
      default: ["unauthenticated"],
      storageKey: "rm5FHWv8EPnw",
    },
  },
};
