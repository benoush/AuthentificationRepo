import { OpenAPIV3 } from "openapi-types";


const articleTags: OpenAPIV3.TagObject = {
    name: "Article",
    description: "Operations related to article"
}

const articleSchema: OpenAPIV3.ComponentsObject['schemas'] = {
    ArticleRequest:{
        type:"object",
        properties: {
            titre:{
                type: "string",
                description: "Title of the article"
            },
            prix: {
                type: "number",
                description: "Price of the article"
            },
            quantite: {
                type: "number",
                description: "Quantity of the article"
            }
        },
        required:["titre","prix","quantite"]
    },
    ArticleResponse:{
        properties: {
            id:{
                type: "string",
                format: "uuid"
            },
            titre:{
                type: "string",
                description: "Title of the article"
            },
            prix: {
                type: "number",
                description: "Price of the article"
            },
            quantite: {
                type: "number",
                description: "Quantity of the article"
            },
            createdAt:{
                type: "string",
                format: "date-time"
            },
            updateAt:{
                type: "string",
                format: "date-time"
            }
        },
        required:["titre","prix","quantite"]
    }
}

const articlePath: OpenAPIV3.PathsObject = {
    "/article":{
        post:{
            tags: ["Article"],
            summary: "Create an article",
            security:[{bearerAuth:[]}],
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
                    description:"Article created successful",
                    content:{
                        "application/json":{
                            schema:{
                                type: "object",
                                properties: {
                                    data:{
                                        $ref: "#/components/schemas/ArticleResponse"
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
        get: {
            tags: ["Article"],
            summary: "Get articles with pagination",
            description: "Get all articles",
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
                    description:"Paginated Article",
                    content:{
                        "application/json":{
                            schema:{
                                $ref: "#/components/schemas/ArticleResponse"
                            }
                        }
                    }
                }
            }
        },
    },
    "/article/{id}": {
        get: {
            tags: ["Article"],
            summary: "Get article by ID",
            description: "Retrieve an article by their unique id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {type: "string", format:"uuid"},
                    description: "The unique identifier of the article"
                },
                
            ],
            responses:{
                "200":{
                    description:"Article found",
                    content:{
                        "application/json":{
                            schema:{
                                type: "object",
                                properties: {
                                    data:{
                                        $ref: "#/components/schemas/ArticleResponse"
                                    }
                                }
                            }
                        }
                    }
                },
                "404": {
                    description: "Article not found"
                }
            }
        },
        patch:{
            tags: ["Article"],
            summary: "Update article by id",
            description: "update the information of the article by their unique id",
            parameters:[
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {type: "string", format: "uuid"},
                    description: "The unique identifier of the article"
                },
            ],
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
                    description:"Article update successful",
                    content:{
                        "application/json":{
                            schema:{
                                type: "object",
                                properties: {
                                    data:{
                                        $ref: "#/components/schemas/ArticleResponse"
                                    }
                                }
                            }
                        }
                    }
                },
                "404": {
                    description: "Article not found"
                }
            }
        },
        delete:{
            tags: ["Article"],
            summary: "Delete article by ID",
            description: "Delete an article by their unique id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {type: "string"},
                    description: "The unique identifier of the article"
                },
                
            ],
            responses:{
                "200":{
                    description:"Article delete successfully"
                },
                "404": {
                    description: "Article not found"
                }
            }
        }
    }
}

export {
    articleTags,
    articleSchema,
    articlePath
}