var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
import * as express from "express";
import * as expressJWT from "express-jwt";
const Report = require("../../apps/scrum/models/Report");
import { secret } from "../../../private/config";
const app = express();
const regPublic = new RegExp("/public/*");
const regAPI = new RegExp("/api/*");
app.use(expressJWT({ secret: secret }).unless({ path: [regPublic, regAPI] }));
app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Credentials", true);
    response.header("Access-Control-Allow-Origin", request.headers.origin);
    response.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    response.header("Access-Control-Allow-Headers", "X-ACCESS_TOKEN, Access-Control-Allow-Origin, Authorization, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    next();
});
module.exports = function () {
    app.get("/api/test", function (req, res) {
        res.send("ok");
    });
    app.get("/api/reports", function (req, res) {
        getReports()
            .then(success, fail);
        function success(reports) {
            res.json(reports);
        }
        function fail(err) {
            console.log(err);
        }
    });
    app.get("/api/slackyoutube/login/:id", function (req, res) {
        res.send(req.params.id);
    });
    app.listen(8080, function () {
        console.log("Web server listening on port 8080!");
    });
};
function getReports() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Report.model.find().exec();
    });
}
