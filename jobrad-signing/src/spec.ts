export default  {
  "openapi": "3.0.2",
  "info": {
     "title": "Assona",
     "version": "2.0.0",
     "termsOfService": "http://swagger.io/terms/",
     "contact": {
        "name": "Swagger API Team",
        "email": "apiteam@swagger.io",
        "url": "http://swagger.io"
     },
     "license": {
        "name": "Apache 2.0",
        "url": "https://www.apache.org/licenses/LICENSE-2.0.html"
     },
     "x-audience": "company-internal",
     "description": "Ihr kompetenter Partner für Spezialversicherungen\n<img src=\"https://www.assona.com/themes/assona/images/logo_assona.png\" style=\"float:right; width:100px, top:100px\"/>\n\n#### Documentazione\n- la descrizione dei dati, eg. *Cartografia catastale in scala 1:2000*\n- la copertura geografica\n- la data di creazione e/o pubblicazione e/o ultima modifica dei dati\n- i contatti dell'ente che li pubblica, eg. *Agenzia delle Entrate Direzione Centrale Catasto* con la relativa email\n<img src=\"https://cdn.ppolyzos.com/wp-content/uploads/2017/10/jwt-support-swagger-aspnet-core.png\" style=\"float:right;width:200px\"/>\n"
  },
  "servers": [
     {
        "url": "http://localhost:3000"
     }
  ],
  "tags": [
     {
        "name": "StatusController",
        "description": "Everything about your Pets",
        "externalDocs": {
           "description": "Find out more",
           "url": "http://assona.io"
        }
     }
  ],
  "paths": {
     "/status": {
        "get": {
           "summary": "API-Health-Check",
           "x-controller-name": "StatusController",
           "x-operation-name": "getStatus",
           "operationId": "getStatus",
           "tags": [
              "StatusController"
           ],
           "responses": {
              "200": {
                 "description": "A list of datasources.",
                 "headers": {
                    "X-RateLimit-Limit": {
                       "$ref": "#/components/headers/X-RateLimit-Limit"
                    },
                    "X-RateLimit-Remaining": {
                       "$ref": "#/components/headers/X-RateLimit-Remaining"
                    },
                    "X-RateLimit-Reset": {
                       "$ref": "#/components/headers/X-RateLimit-Reset"
                    }
                 },
                 "content": {
                    "application/json": {
                       "schema": {
                          "type": "object",
                          "properties": {
                             "received_at": {
                                "description": "Vertragseingang am Assona-Server",
                                "type": "string",
                                "format": "date-time",
                                "example": "2019-08-10T13:32:12.203Z"
                             }
                          }
                       }
                    }
                 }
              },
              "400": {
                 "$ref": "#/components/responses/400BadRequest"
              },
              "404": {
                 "$ref": "#/components/responses/404NotFound"
              },
              "422": {
                 "$ref": "#/components/responses/422SchemaError"
              },
              "429": {
                 "$ref": "#/components/responses/429TooManyRequests"
              },
              "503": {
                 "$ref": "#/components/responses/503ServiceUnavailable"
              },
              "default": {
                 "$ref": "#/components/responses/default"
              }
           }
        }
     }
  },
  "components": {
     "securitySchemes": {
        "OAuth2": {
           "type": "oauth2",
           "flows": {
              "authorizationCode": {
                 "authorizationUrl": "https://example.com/oauth/authorize",
                 "tokenUrl": "https://example.com/oauth/token",
                 "scopes": {
                    "read": "Grants read access",
                    "write": "Grants write access",
                    "admin": "Grants access to admin operations"
                 }
              }
           }
        }
     },
     "schemas": {
        "Contract": {
           "title": "Contract",
           "properties": {
              "contractId": {
                 "type": "string"
              },
              "vendor": {
                 "type": "string"
              },
              "price": {
                 "type": "string"
              },
              "done": {
                 "type": "boolean"
              },
              "phone": {
                 "type": "string"
              }
           },
           "required": [
              "vendor",
              "price",
              "done",
              "phone"
           ]
        },
        "Addressee": {
           "description": "a (natural or legal) person that gets addressed",
           "type": "object",
           "properties": {
              "salutation": {
                 "description": "a salutation and/or title used for personal contacts to some\naddressee; not to be confused with the gender information!\n",
                 "type": "string",
                 "example": "Mr"
              },
              "first_name": {
                 "description": "given name(s) or first name(s) of a person; may also include the\nmiddle names.\n",
                 "type": "string",
                 "example": "Hans Dieter"
              },
              "last_name": {
                 "description": "family name(s) or surname(s) of a person\n",
                 "type": "string",
                 "example": "Mustermann"
              },
              "business_name": {
                 "description": "company name of the business organization. Used when a business is\nthe actual addressee; for personal shipments to office addresses, use\n`care_of` instead.\n",
                 "type": "string",
                 "example": "Consulting Services GmbH"
              }
           },
           "required": [
              "first_name",
              "last_name"
           ]
        },
        "Address": {
           "description": "an address of a location/destination",
           "type": "object",
           "properties": {
              "care_of": {
                 "description": "(aka c/o) the person that resides at the address, if different from\naddressee. E.g. used when sending a personal parcel to the\noffice /someone else's home where the addressee resides temporarily\n",
                 "type": "string",
                 "example": "Consulting Services GmbH"
              },
              "street": {
                 "description": "the full street address including house number and street name\n",
                 "type": "string",
                 "example": "Schönhauser Allee 103"
              },
              "additional": {
                 "description": "further details like building name, suite, apartment number, etc.\n",
                 "type": "string",
                 "example": "2. Hinterhof rechts"
              },
              "city": {
                 "description": "name of the city / locality\n",
                 "type": "string",
                 "example": "Berlin"
              },
              "zip": {
                 "description": "zip code or postal code\n",
                 "type": "string",
                 "example": 14265
              },
              "country_code": {
                 "description": "the country code according to\n[iso-3166-1-alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)\n",
                 "type": "string",
                 "example": "DE"
              }
           },
           "required": [
              "street",
              "city",
              "zip",
              "country_code"
           ]
        },
        "Money": {
           "type": "object",
           "properties": {
              "amount": {
                 "type": "number",
                 "description": "The amount describes unit and subunit of the currency in a single value, where the integer part (digits before the decimal point) is for the major unit and fractional part (digits after the decimal point) is for the minor unit.\n",
                 "format": "decimal",
                 "example": 99.95
              },
              "currency": {
                 "type": "string",
                 "description": "3 letter currency code as defined by ISO-4217",
                 "format": "iso-4217",
                 "example": "EUR"
              }
           },
           "required": [
              "amount",
              "currency"
           ]
        },
        "GeneralEvent": {
           "description": "A general kind of event. Event kinds based on this event define their\ncustom schema payload as the top level of the document, with the\n\"metadata\" field being required and reserved for standard metadata. An\ninstance of an event based on the event type thus conforms to both the\nEventMetadata definition and the custom schema definition. Previously\nthis category was called the Business Category.\n",
           "required": [
              "metadata"
           ],
           "properties": {
              "metadata": {
                 "type": "object",
                 "description": "Carries metadata for an Event along with common fields. The required\nfields are those expected to be sent by the producer, other fields may be\nadded by intermediaries such as publish/subscribe broker.\n",
                 "required": [
                    "eid",
                    "occurred_at"
                 ],
                 "properties": {
                    "eid": {
                       "description": "Identifier of this event.",
                       "type": "string",
                       "format": "uuid",
                       "example": "105a76d8-db49-4144-ace7-e683e8f4ba46"
                    },
                    "event_type": {
                       "description": "The name of the EventType of this Event.",
                       "type": "string",
                       "example": "example.important-business-event"
                    },
                    "occurred_at": {
                       "description": "When the event was created according to the producer.",
                       "type": "string",
                       "format": "date-time",
                       "example": "1996-12-19T16:39:57-08:00"
                    },
                    "received_at": {
                       "description": "When the event was seen by an intermediary such as a broker.\n",
                       "type": "string",
                       "readOnly": true,
                       "format": "date-time",
                       "example": "1996-12-19T16:39:57-08:00"
                    },
                    "version": {
                       "description": "Version of the schema used for validating this event. This may be\nenriched upon reception by intermediaries. This string uses semantic\nversioning.\n",
                       "type": "string",
                       "readOnly": true
                    },
                    "parent_eids": {
                       "description": "Event identifiers of the Event that caused the generation of\nthis Event. Set by the producer.\n",
                       "type": "array",
                       "items": {
                          "type": "string",
                          "format": "uuid"
                       },
                       "example": "105a76d8-db49-4144-ace7-e683e8f4ba46"
                    },
                    "flow_id": {
                       "description": "A flow-id for this event (corresponds to the X-Flow-Id HTTP header).\n",
                       "type": "string",
                       "example": "JAh6xH4OQhCJ9PutIV_RYw"
                    },
                    "partition": {
                       "description": "Indicates the partition assigned to this Event. Used for systems\nwhere an event type's events can be sub-divided into partitions.\n",
                       "type": "string",
                       "example": "0"
                    }
                 }
              }
           }
        },
        "EventType": {
           "description": "An event type defines the schema and its runtime properties. The required\nfields are the minimum set the creator of an event type is expected to\nsupply.\n",
           "required": [
              "name",
              "category",
              "owning_application",
              "schema"
           ],
           "properties": {
              "name": {
                 "description": "Name of this EventType. The name must follow the functional naming\npattern `<functional-name>.<event-name>` to preserve global\nuniqueness and readability.\n",
                 "type": "string",
                 "pattern": "[a-z][a-z0-9-]*\\.[a-z][a-z0-9-]*",
                 "example": "transactions.order.order-cancelled\ncustomer.personal-data.email-changed\n"
              },
              "audience": {
                 "type": "string",
                 "x-extensible-enum": [
                    "component-internal",
                    "business-unit-internal",
                    "company-internal",
                    "external-partner",
                    "external-public"
                 ],
                 "description": "Intended target audience of the event type, analogue to audience definition for REST APIs\nin rule #219 -- see https://opensource.zalando.com/restful-api-guidelines/#219\n"
              },
              "owning_application": {
                 "description": "Name of the application (eg, as would be used in infrastructure\napplication or service registry) owning this `EventType`.\n",
                 "type": "string",
                 "example": "price-service"
              },
              "category": {
                 "description": "Defines the category of this EventType.",
                 "type": "string",
                 "x-extensible-enum": [
                    "data",
                    "general"
                 ]
              },
              "compatibility_mode": {
                 "description": "The compatibility mode to evolve the schema.\n",
                 "type": "string",
                 "x-extensible-enum": [
                    "compatible",
                    "forward",
                    "none"
                 ],
                 "default": "forward"
              },
              "schema": {
                 "description": "The most recent payload schema for this EventType.",
                 "type": "object",
                 "properties": {
                    "version": {
                       "description": "Values are based on semantic versioning (eg \"1.2.1\").",
                       "type": "string",
                       "default": "1.0.0"
                    },
                    "created_at": {
                       "description": "Creation timestamp of the schema.",
                       "type": "string",
                       "readOnly": true,
                       "format": "date-time",
                       "example": "1996-12-19T16:39:57-08:00"
                    },
                    "type": {
                       "description": "The schema language of schema definition. Currently only\njson_schema (JSON Schema v04) syntax is defined, but in the\nfuture there could be others.\n",
                       "type": "string",
                       "x-extensible-enum": [
                          "json_schema"
                       ]
                    },
                    "schema": {
                       "description": "The schema as string in the syntax defined in the field type.\n",
                       "type": "string"
                    }
                 },
                 "required": [
                    "type",
                    "schema"
                 ]
              },
              "ordering_key_fields": {
                 "type": "array",
                 "description": "Indicates which field is used for application level ordering of events.\nIt is typically a single field, but also multiple fields for compound\nordering key are supported (first item is most significant).\n\nThis is an informational only event type attribute for specification of\napplication level ordering. Nakadi transportation layer is not affected,\nwhere events are delivered to consumers in the order they were published.\n\nScope of the ordering is all events (of all partitions), unless it is\nrestricted to data instance scope in combination with\n`ordering_instance_ids` attribute below.\n\nThis field can be modified at any moment, but event type owners are\nexpected to notify consumer in advance about the change.\n\n*Background:* Event ordering is often created on application level using\nascending counters, and data providers/consumers do not need to rely on the\nevent publication order. A typical example are data instance change events\nused to keep a slave data store replica in sync. Here you have an order\ndefined per instance using data object change counters (aka row update\nversion) and the order of event publication is not relevant, because\nconsumers for data synchronization skip older instance versions when they\nreconstruct the data object replica state.\n",
                 "items": {
                    "type": "string",
                    "description": "Indicates a single ordering field. This is a JsonPointer, which is applied\nonto the whole event object, including the contained metadata and data (in\ncase of a data change event) objects. It must point to a field of type\nstring or number/integer (as for those the ordering is obvious).\n\nIndicates a single ordering field. It is a simple path (dot separated) to\nthe JSON leaf element of the whole event object, including the contained metadata and data (in\ncase of a data change event) objects. It must point to a field of type\nstring or number/integer (as for those the ordering is obvious), and must be\npresent in the schema.\n",
                    "example": "data.order_change_counter"
                 }
              },
              "ordering_instance_ids": {
                 "type": "array",
                 "description": "Indicates which field represents the data instance identifier and scope in\nwhich ordering_key_fields provides a strict order. It is typically a single\nfield, but multiple fields for compound identifier keys are also supported.\n\nThis is an informational only event type attribute without specific Nakadi\nsemantics for specification of application level ordering. It only can be\nused in combination with `ordering_key_fields`.\n\nThis field can be modified at any moment, but event type owners are expected\nto notify consumer in advance about the change.\n",
                 "items": {
                    "type": "string",
                    "description": "Indicates a single key field. It is a simple path (dot separated) to the JSON\nleaf element of the whole event object, including the contained metadata and\ndata (in case of a data change event) objects, and it must be present in the\nschema.\n"
                 },
                 "example": "data.order_number"
              },
              "created_at": {
                 "description": "When this event type was created.",
                 "type": "string",
                 "pattern": "date-time"
              },
              "updated_at": {
                 "description": "When this event type was last updated.",
                 "type": "string",
                 "pattern": "date-time"
              }
           }
        },
        "User": {
           "type": "object",
           "properties": {
              "id": {
                 "type": "integer",
                 "format": "int64"
              },
              "name": {
                 "type": "string"
              }
           }
        },
        "Greeting": {
           "description": "A message together with translations in several languages.",
           "type": "object",
           "properties": {
              "message_key": {
                 "type": "string",
                 "description": "The message key."
              },
              "translations": {
                 "description": "The translations of this message into several languages. The keys are [IETF BCP-47 language tags](https://tools.ietf.org/html/bcp47).",
                 "type": "object",
                 "additionalProperties": {
                    "type": "string",
                    "description": "the translation of this message into the language identified by the key."
                 }
              }
           }
        },
        "ValidationError": {
           "description": "AJV Validation Error",
           "type": "object",
           "properties": {
              "path": {
                 "type": "string",
                 "example": "/properties/vendor"
              },
              "code": {
                 "type": "string",
                 "example": "required"
              },
              "message": {
                 "type": "string",
                 "example": "should have required property 'vendor'"
              },
              "info": {
                 "type": "object",
                 "properties": {
                    "missingProperty": {
                       "type": "string",
                       "example": "vendor"
                    }
                 }
              }
           }
        },
        "AssonaError": {
           "description": "The request body is invalid.",
           "type": "object",
           "properties": {
              "error": {
                 "type": "object",
                 "properties": {
                    "statusCode": {
                       "type": "integer",
                       "default": 0,
                       "example": 503
                    },
                    "name": {
                       "type": "string",
                       "example": "Bad Req"
                    },
                    "message": {
                       "type": "string"
                    },
                    "code": {
                       "type": "string",
                       "example": "VALIDATION_FAILED"
                    },
                    "details": {
                       "type": "array",
                       "items": {
                          "$ref": "#/components/schemas/ValidationError"
                       }
                    }
                 }
              }
           }
        }
     },
     "parameters": {
        "limit": {
           "name": "limit",
           "in": "query",
           "description": "How many items to return at one time (max 100)",
           "schema": {
              "type": "integer",
              "format": "int32"
           }
        },
        "offset": {
           "name": "offset",
           "in": "query",
           "description": "The zero-ary offset index into the results",
           "schema": {
              "type": "integer",
              "default": 0,
              "format": "int32"
           }
        },
        "sort": {
           "name": "sort",
           "in": "query",
           "description": "Sorting order",
           "schema": {
              "type": "string",
              "example": "+name"
           }
        }
     },
     "headers": {
        "X-RateLimit-Limit": {
           "description": "The number of allowed requests in the current period",
           "schema": {
              "type": "integer",
              "format": "int32"
           }
        },
        "X-RateLimit-Remaining": {
           "description": "The number of remaining requests in the current period",
           "schema": {
              "type": "integer",
              "format": "int32"
           }
        },
        "X-RateLimit-Reset": {
           "description": "The number of seconds left in the current period",
           "schema": {
              "type": "integer",
              "format": "int32"
           }
        }
     },
     "responses": {
        "400BadRequest": {
           "description": "Bad Request",
           "content": {
              "application/problem+json": {
                 "schema": {
                    "type": "object",
                    "properties": {
                       "type": {
                          "type": "string",
                          "format": "uri",
                          "description": "An absolute URI that identifies the problem type.  When dereferenced,\nit SHOULD provide human-readable documentation for the problem type\n(e.g., using HTML).\n",
                          "default": "about:blank",
                          "example": "https://tools.ietf.org/html/rfc7231#section-6.6.4"
                       },
                       "title": {
                          "type": "string",
                          "description": "A short, summary of the problem type. Written in english and readable\nfor engineers (usually not suited for non technical stakeholders and\nnot localized); example: Service Unavailable\n"
                       },
                       "status": {
                          "type": "integer",
                          "format": "int32",
                          "description": "The HTTP status code generated by the origin server for this occurrence\nof the problem.\n",
                          "minimum": 100,
                          "maximum": 600,
                          "exclusiveMaximum": true,
                          "example": 503
                       },
                       "detail": {
                          "type": "string",
                          "description": "A human readable explanation specific to this occurrence of the\nproblem.\n",
                          "example": "Connection to database timed out"
                       },
                       "instance": {
                          "type": "string",
                          "format": "uri",
                          "description": "An absolute URI that identifies the specific occurrence of the problem.\nIt may or may not yield further information if dereferenced.\n"
                       }
                    }
                 }
              }
           }
        },
        "404NotFound": {
           "description": "Not Found",
           "content": {
              "application/problem+json": {
                 "schema": {
                    "$ref": "#/components/responses/400BadRequest/content/application~1problem%2Bjson/schema"
                 }
              }
           }
        },
        "429TooManyRequests": {
           "description": "Too many requests",
           "headers": {
              "X-RateLimit-Limit": {
                 "$ref": "#/components/headers/X-RateLimit-Limit"
              },
              "X-RateLimit-Remaining": {
                 "$ref": "#/components/headers/X-RateLimit-Remaining"
              },
              "X-RateLimit-Reset": {
                 "$ref": "#/components/headers/X-RateLimit-Reset"
              },
              "Retry-After": {
                 "description": "Retry contacting the endpoint *at least* after seconds.\nSee https://tools.ietf.org/html/rfc7231#section-7.1.3",
                 "schema": {
                    "type": "integer",
                    "format": "int32"
                 }
              }
           },
           "content": {
              "application/problem+json": {
                 "schema": {
                    "$ref": "#/components/responses/400BadRequest/content/application~1problem%2Bjson/schema"
                 }
              }
           }
        },
        "503ServiceUnavailable": {
           "description": "Service Unavailable",
           "headers": {
              "Retry-After": {
                 "$ref": "#/components/responses/429TooManyRequests/headers/Retry-After"
              }
           },
           "content": {
              "application/problem+json": {
                 "schema": {
                    "$ref": "#/components/responses/400BadRequest/content/application~1problem%2Bjson/schema"
                 }
              }
           }
        },
        "default": {
           "description": "Unexpected error",
           "content": {
              "application/problem+json": {
                 "schema": {
                    "$ref": "#/components/responses/400BadRequest/content/application~1problem%2Bjson/schema"
                 }
              }
           }
        },
        "422SchemaError": {
           "description": "Schema validation failed.",
           "content": {
              "application/problem+json": {
                 "schema": {
                    "$ref": "#/components/schemas/AssonaError"
                 }
              }
           }
        }
     }
  }
}
