"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const octokit_1 = require("octokit");
const getRepositories_1 = __importDefault(require("./functions/getRepositories"));
const body_parser_1 = __importDefault(require("body-parser"));
const getOwner_1 = __importDefault(require("./functions/getOwner"));
const getRepoCommits_1 = __importDefault(require("./functions/getRepoCommits"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, "..", ".env") });
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
console.log(express_1.default.static(path_1.default.join(__dirname, "..", "..", "frontend", "build")));
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "..", "frontend", "build")));
console.log(process.env.GITHUB_API_KEY);
const OKTOKIT = new octokit_1.Octokit({
    auth: process.env.GITHUB_API_KEY,
});
app.get("/", (req, res) => {
    console.log(path_1.default.join(__dirname, "..", "..", "frontend", "build", "index.html"));
    res.sendFile(path_1.default.join(__dirname, "..", "..", "frontend", "build", "index.html"));
});
app.post("/api/get-user-dashboard", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("POST view is " + req.body.view);
    const OWNER_DATA = yield (0, getOwner_1.default)(OKTOKIT, req.body.username);
    const REPO_DATA = yield (0, getRepositories_1.default)(OKTOKIT, req.body.view, OWNER_DATA.login, req.body.numberOfRepos);
    const RETURNDATA = {
        repos: REPO_DATA,
        owner: OWNER_DATA,
    };
    yield res.json(RETURNDATA);
}));
app.post("/api/get-repo-commits", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const COMMIT_DATA = yield (0, getRepoCommits_1.default)(OKTOKIT, req.body.owner, req.body.repo);
    console.log(COMMIT_DATA);
    console.log("commit data above");
    return res.json(COMMIT_DATA);
}));
app.listen(8080, () => {
    console.log("APP LISTENING ON PORT 8080");
});
