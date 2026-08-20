import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  labels: {
    singular: "Потребител",
    plural: "Потребители",
  },
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  fields: [
    // Email и password се добавят автоматично от auth: true.
  ],
};
