import { OpenAPIV3 } from "openapi-types";

export const userTags: OpenAPIV3.TagObject = {
  name: "Users",
  description: "Gestion des utilisateurs",
};

export const userSchema: OpenAPIV3.ComponentsObject["schemas"] = {
  UserResponse: {
    type: "object",
    properties: {
      id: { type: "integer" },
      email: { type: "string", format: "email" },
      createdAt: { type: "string", format: "date-time" },
    },
  },
};

export const userPath: OpenAPIV3.PathsObject = {
  "/users": {
    get: {
      tags: ["Users"],
      summary: "Liste paginée des users",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "page",
          in: "query",
          schema: { type: "integer", default: 1 },
          description: "Numéro de page",
        },
        {
          name: "limit",
          in: "query",
          schema: { type: "integer", default: 10 },
          description: "Nombre d'éléments par page",
        },
      ],
      responses: {
        "200": {
          description: "Liste des users",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: {
                    type: "object",
                    properties: {
                      users: {
                        type: "array",
                        items: { $ref: "#/components/schemas/UserResponse" },
                      },
                      total: { type: "integer" },
                      page: { type: "integer" },
                      limit: { type: "integer" },
                    },
                  },
                },
              },
            },
          },
        },
        "401": { description: "Token manquant ou invalide" },
      },
    },
  },
  "/users/{id}": {
    get: {
      tags: ["Users"],
      summary: "Récupérer un user par ID",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "integer" },
          description: "ID du user",
        },
      ],
      responses: {
        "200": {
          description: "User trouvé",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/UserResponse" },
                },
              },
            },
          },
        },
        "401": { description: "Token manquant ou invalide" },
        "404": { description: "User introuvable" },
      },
    },
  },
};