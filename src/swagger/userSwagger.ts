import { totalmem } from "node:os";
import { OpenAPIV3 } from "openapi-types";
import { date, success } from "zod";


const userTags: OpenAPIV3.TagObject = {
    name: "User",
    description: "Operations related to users"
}

const userSchema: OpenAPIV3.ComponentsObject['schemas'] = {
    /*
    UserRequest:{
        type:"object",
        properties: {
            email:{
                type: "string",
                description: "The users mail address "
            },
            password: {
                type: "string",
                description: "The users password"
            },
    
        },
        required:["email","password"]
    },
    */
    UserResponse:{
        properties: {
            id:{
                type: "string",
                format: "uuid"
            },
            email:{
                type: "string",
                description: "The users mail address "
            },
            createdAt:{
                type: "string",
                format: "date-time"
            },

        },
      //  required:["titre","prix","quantite"]
    }
}

const userPath: OpenAPIV3.PathsObject = {
    "/user":{
    /*
        post:{
            tags: ["User"],
            summary: "Create an article",
            description: "Create a new article",
            requestBody: {
                required: true,
                content:{
                    "application/json":{
                        schema:{
                            $ref:"#/components/schemas/ArticleRequest"
                        }
                    }
                }
            },
            responses:{
                "200":{
                    description:"User created successful",
                    content:{
                        "application/json":{
                            schema:{
                                type: "object",
                                properties: {
                                    data:{
                                        $ref: "#/components/schemas/UserResponse"
                                    }
                                }
                            }
                        }
                    }
                },
                "400": {
                    description: "invalid input"
                }

            }
        },
    */
        get: {
            tags: ["User"],
            summary: "Get users with pagination",
            security: [{ bearerAuth: []}],
           // description: "Get all users",
            parameters: [
                {
                    name: "page",
                    in: "query",
                    schema: {type: "integer", default: 1},
                    description: "page number"
                },
                {
                    name: "limit",
                    in: "query",
                    schema: {type: "integer", default: 10},
                    description: "numbre of items per page"
                }
            ],
            responses:{
                "200":{
                    description:"Paginated User",
                    content:{
                        "application/json":{
                            schema:{
                                type: "object",
                                properties: { 
                                    success: { type: "boolean"},
                                    data: {
                                        type: "object",
                                        properties: {
                                            users: { 
                                                type: "array",
                                                items: {
                                                        $ref: "#/components/schemas/UserResponse"
                                                }
                                            },
                                            total: {type: "integer"},
                                            page: {type: "integer"},
                                            limit: {type:"integer"}
                                        }
                                    }
                                }
                               
                            }
                        }
                    },
                },
                "401": {description: "Token manquant ou invalide"}
            }
        }
    },
    "/user/{id}": {
        get: {
            tags: ["User"],
            summary: "Get users by ID",
            security: [{ bearerAuth: []}],
            //description: "Retrieve a user by their unique id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {type: "string", format:"uuid"},
                    description: "The unique identifier of the user"
                },
                
            ],
            responses:{
                "200":{
                    description:"User found",
                    content:{
                        "application/json":{
                            schema:{
                                type: "object",
                                properties: {
                                    success: { type: "boolean"},
                                    data:{
                                        $ref: "#/components/schemas/UserResponse"
                                    }
                                }
                            }
                        }
                    }
                },
                "401": { description: "Missing or invalid token"},
                "404": { description: "User not found"}
            }
        },
        delete:{
            tags: ["User"],
            summary: "Delete user by ID",
            description: "Delete an user by their unique id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {type: "string"},
                    description: "The unique identifier of the user"
                },
                
            ],
            responses:{
                "200":{
                    description:"User delete successfully"
                },
                "404": {
                    description: "Usernot found"
                }
            }
        }
        },

        "/user/{email}": {
        get: {
            tags: ["User"],
            summary: "Get user by EMAIL",
            security: [{ bearerAuth: []}],
            description: "Retrieve a user by their mail address",
            parameters: [
                {
                    name: "email",
                    in: "path",
                    required: true,
                    schema: {type: "string"},
                    description: "The unique identifier of the user"
                },
                
            ],
            responses:{
                "200":{
                    description:"User found",
                    content:{
                        "application/json":{
                            schema:{
                                type: "object",
                                properties: {
                                    success: { type: "boolean"},
                                    data:{
                                        $ref: "#/components/schemas/UserResponse"
                                    }
                                }
                            }
                        }
                    }
                },
                "401": { description: "Missing or invalid token"},
                "404": { description: "User not found"}
            }
        },
        
    }
}

export {
    userTags,
    userSchema,
    userPath
}