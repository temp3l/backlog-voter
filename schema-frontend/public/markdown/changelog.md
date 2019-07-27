# samples

- refs, circular, formats

# Usecases

1. Specification
2. Documentation
3. Validation
4. Testing

# Validation

```javascript
var valid = ajv.validate(schema, data);
```

- java

```java
import org.everit.json.schema.Schema;
import org.everit.json.schema.loader.SchemaLoader;
import org.json.JSONObject;
import org.json.JSONTokener;
// ...
try (InputStream inputStream = getClass().getResourceAsStream("/path/to/your/schema.json")) {
  JSONObject rawSchema = new JSONObject(new JSONTokener(inputStream));
  Schema schema = SchemaLoader.load(rawSchema);
  schema.validate(new JSONObject("{\"hello\" : \"world\"}")); // throws a ValidationException if this object is invalid
}
```

# sample error

```js
[
  { stack: "voucherCode: is a required property" },
  { stack: "birthday: is a required property" }
];
```

# sample test / JSON-Pointers

```json
{
  "vegetables": {
    "type": "array",
    "items": { "$ref": "#/definitions/voucherCode" }
  },
  "fruits": {
    "type": "array",
    "items": { "$ref": "#/definitions/assonaFruits" }
  }
}
```

```bash
	wget http://assona.io/protectonaut-signing -O contract.json
	wget http://schemas.assona.net/schema.json -O schema.json
	./validate ...
```

# JSON-Pointers

- allOf - validate against all of the given subschemas.
- anyOf - valid against any (one or more) of the given subschemas.
- not - validate against none
- ifthenelse - sample

# 2.6.10
