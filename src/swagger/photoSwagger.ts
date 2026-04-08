import { OpenAPIV3 } from "openapi-types";

const photoTags: OpenAPIV3.TagObject = {
  name: "Photo",
  description: "Operations related to users",
};

const photoSchema: OpenAPIV3.ComponentsObject["schemas"] = {
  PhotoResponse: {
    properties: {
      id: { type: "string"},
      userId: { type: "string" },
      url: { type: "string" },
      createdAt: { type: "string", format: "date-time" },
    },
  },
};

const photoPath: OpenAPIV3.PathsObject = {
  
  "/user/profile/photo": {
    patch: {
      tags: ["User"],
      summary: "Upload photo de profil",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                avatar: { type: "string", format: "binary" },
              },
              required: ["avatar"],
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Photo de profil mise à jour",
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
        "400": { description: "Aucun fichier envoyé" },
        "401": { description: "Token manquant ou invalide" },
        "404": { description: "User introuvable" },
      },
    },
  },

  "/user/gallery": {
    post: {
      tags: ["User"],
      summary: "Ajouter une photo à la galerie",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                photos: {
                    type:"array",
                    items:{ type: "string", format: "binary" },
                    maxItems: 10
                },
             },
             required: ["photos"],
          },
        },
      },
    },
      responses: {
        "201": {
          description: "Photo ajoutée",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/PhotoResponse" },
                },
              },
            },
          },
        },
        "400": { description: "Aucun fichier envoyé" },
        "401": { description: "Token manquant ou invalide" },
      },
    },
    get: {
      tags: ["User"],
      summary: "Récupérer la galerie",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "page",
          in: "query",
          schema: { type: "integer", default: 1 },
          description: "page number",
        },
        {
          name: "limit",
          in: "query",
          schema: { type: "integer", default: 10 },
          description: "nombre of items per page",
        },
      ],
      responses: {
        "200": {
          description: "Galerie récupérée",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: {
                    type: "array",
                    items: { $ref: "#/components/schemas/PhotoResponse" },
                  },
                  total: { type: "integer" },
                  page: { type: "integer" },
                  limit: { type: "integer" },
                },
              },
            },
          },
        },
        "401": { description: "Token manquant ou invalide" },
      },
    },
  },
}


export { photoTags, photoSchema,photoPath };