import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
const db = new JsonDB(new Config("myDataBase", true, false, '/'));

db.push("/templates", [
    {"id": 1,"name": "test1","note": "Dapibus ut urna.","status": "working","create_date": "123"},
    {"id": 2,"name": "XXXXXXXX","note": "XXXXXXXXX","status": "done","create_date": "123"}
]);


const templates = function () {
    return {
        findAll: async function (req, res, next) {
            res.send( db.getData("/templates"))
        },

        create: async function (req, res, next) {
            let newItem = Object.assign({}, req.body, {id: Date.now(), create_date: "asdasdadasd"});
            db.push('/templates', [newItem], false)
            res.status(201).send(newItem);
        },

        update: async function (req, res, next) {
            const data = db.getData("/templates");
            const item = data.find( el => el.id === req.params.templateKey);
            if(!item) return res.status(404).send({code: 404, message: "no such fool or directory"});
            const idx = data.indexOf(item);
            data[idx] = Object.assign({}, item, req.body)
            db.push('/templates', data);
            res.status(200).send(data[idx])
        },

        delete: async function (req, res, next) {
            const data = db.getData("/templates");
            console.log(req.params)
            const item = data.find( el => el.id === req.params.templateKey);
            if(!item) return res.status(404).send({code: 404, message: "no such fool or directory"});
            const idx = data.indexOf(item);
            data.splice(idx, 1);
            db.push('/templates', data);
            res.status(200).send({code:200, message: "has been deleted"})
        }
    }
}

// For a PUT request: HTTP 200 or HTTP 204 should imply "resource updated successfully".
// For a DELETE request: HTTP 200 or HTTP 204 should imply "resource deleted 
// https://stackoverflow.com/questions/2342579/http-status-code-for-update-and-delete

module.exports = templates;
