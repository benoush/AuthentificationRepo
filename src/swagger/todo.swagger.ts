import { OpenAPIV3 } from "openapi-types";


const todoTags: OpenAPIV3.TagObject = {
    name: "Todo",
    description: "Operations related to Todo"
}

const todoSchema: OpenAPIV3.ComponentsObject['schemas'] = {
    TodoRequest:{
        type:"object",
        properties: {
            title:{
                type: "string",
                description: "Title of the todo"
            },
            description: {
                type: "string",
                description: "description of the todo"
            },
            /*completed: {
                type: "boolean",
                description: "copleted of the todo"
            }*/
        },
        required:["title","description"]
    },
    TodoResponse:{
        type:"object",
        properties: {
            id:{
                type: "string",
                format: "uuid"
            },
            title:{
                type: "string",
                description: "Title of the todo"
            },
            description: {
                type: "string",
                description: "description of the todo"
            },
            completed: {
                type: "boolean",
                description: "completed of the todo"
            },
            completedAt: {
                type: "string",
                format: "date-time"
            },
        },
        required:["title","description","completed"]
    }
}

const todoPath: OpenAPIV3.PathsObject = {
    "/todo":{
        post:{
            tags: ["Todo"],
            summary: "Create an todoList",
            description: "Create a new todoLidt",
            requestBody: {
                required: true,
                content:{
                    "application/json":{
                        schema:{
                            $ref:"#/components/schemas/TodoRequest"
                        }
                    }
                }
            },
            responses:{
                "200":{
                    description:"TodoList created successful",
                    content:{
                        "application/json":{
                            schema:{
                                type: "object",
                                properties: {
                                    data:{
                                        $ref: "#/components/schemas/TodoResponse"
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
            tags: ["Todo"],
            summary: "Get todoList with pagination",
            description: "Get all todoList",
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
                },
                {
                    name: "title",
                    in: "query",
                    schema: {type:"string"},
                    description: ""
                },
                {
                    name: "date",
                    in: "query",
                    schema: {type:"string"},
                    description: ""
                }
            ],
            responses:{
                "200":{
                    description:"Paginated Todo",
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    data:{
                                        type: "array",
                                        items: {
                                            $ref: "#/components/schemas/TodoResponse"
                                        }
                                    },
                                    page: {type:"integer"} ,
                                    limit:{type:"integer"}                          
                                }                    
                            }
                        }
                    }
                }
            }
        },
    },
    "/todo/{id}": {
        get: {
            tags: ["Todo"],
            summary: "Get todo by ID",
            description: "Retrieve an todo by their unique id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {type: "string", format:"uuid"},
                    description: "The unique identifier of the todo"
                },
                
            ],
            responses:{
                "200":{
                    description:"Todo found",
                    content:{
                        "application/json":{
                            schema:{
                                type: "object",
                                properties: {
                                    data:{
                                        $ref: "#/components/schemas/TodoResponse"
                                    }
                                }
                            }
                        }
                    }
                },
                "404": {
                    description: "Todo not found"
                }
            }
        },
        patch:{
            tags: ["Todo"],
            summary: "Update todo by id",
            description: "update the information of the todo by their unique id",
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
                            $ref:"#/components/schemas/TodoRequest"
                        }
                    }
                }
            },
            responses:{
                "200":{
                    description:"Todo update successful",
                    content:{
                        "application/json":{
                            schema:{
                                type: "object",
                                properties: {
                                    data:{
                                        $ref: "#/components/schemas/TodoResponse"
                                    }
                                }
                            }
                        }
                    }
                },
                "404": {
                    description: "Todo not found"
                }
            }
        },
        delete:{
            tags: ["Todo"],
            summary: "Delete todo by ID",
            description: "Delete an todo by their unique id",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {type: "string"},
                    description: "The unique identifier of the todo"
                },
                
            ],
            responses:{
                "200":{
                    description:"Todo delete successfully"
                },
                "404": {
                    description: "Todo not found"
                }
            }
        }
    },
    "/todo/{id}/toggle": {
    patch: {
        tags: ["Todo"],
        summary: "Toggle todo completion status",
        description: "Inverse le statut completed du todo (true → false / false → true)",
        parameters: [
            {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string", format: "uuid" },
                description: "The unique identifier of the todo"
            }
        ],
        responses: {
            "200": {
                description: "Todo status toggled successfully",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                data: {
                                    $ref: "#/components/schemas/TodoResponse"
                                }
                            }
                        }
                    }
                }
            },
            "404": {
                description: "Todo not found"
            }
        }
    }
},
    
}

export {
    todoTags,
    todoSchema,
    todoPath
}