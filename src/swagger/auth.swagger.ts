import { OpenAPIV3 } from "openapi-types";

export const authTags: OpenAPIV3.TagObject = {
  name: "Auth",
  description: "Authentification — register et login",
};

export const authSchema: OpenAPIV3.ComponentsObject["schemas"] = {
  RegisterRequest: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { type: "string", format: "email", example: "user@example.com" },
      password: { type: "string", minLength: 6, example: "123456" },
    },
  },
  LoginRequest: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { type: "string", format: "email", example: "user@example.com" },
      password: { type: "string", example: "123456" },
    },
  },
  AuthResponse: {
    type: "object",
    properties: {
      success: { type: "boolean", example: true },
      data: {
        type: "object",
        properties: {
          token: { type: "string", example: "eyJhbGci..." },
        },
      },
    },
  },
};

export const authPath: OpenAPIV3.PathsObject = {
  "/auth/register": {
    post: {
      tags: ["Auth"],
      summary: "Créer un compte",
      security: [],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/RegisterRequest" },
          },
        },
      },
      responses: {
        "201": {
          description: "Compte créé avec succès",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: {
                    type: "object",
                    properties: {
                      id: { type: "integer" },
                      email: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
        "400": { description: "Données invalides ou email déjà utilisé" },
      },
    },
  },
  "/auth/login": {
    post: {
      tags: ["Auth"],
      summary: "Se connecter",
      security: [],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/LoginRequest" },
          },
        },
      },
      responses: {
        "200": {
          description: "Connexion réussie",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AuthResponse" },
            },
          },
        },
        "401": { description: "Identifiants invalides" },
      },
    },
  },
  "/auth/me": {
  get: {
    tags: ["Auth"],
    summary: "Profil du user connecté",
    security: [{ bearerAuth: [] }],
    responses: {
      "200": {
        description: "Profil retourné",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: { type: "boolean" },
                data: {
                  type: "object",
                  properties: {
                    id: { type: "integer" },
                    email: { type: "string" },
                    createdAt: { type: "string", format: "date-time" },
                  },
                },
              },
            },
          },
        },
      },
      "401": { description: "Token manquant ou invalide" },
      "404": { description: "Utilisateur introuvable" },
    },
  },
},
};