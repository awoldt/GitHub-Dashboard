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
const getRepoCommits_1 = __importDefault(require("./getRepoCommits"));
function getRepositories(oktokit, view, ownerLogin, repositoriesPerPage) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield oktokit.request("GET /users/{username}/repos", {
                type: "all",
                username: ownerLogin,
                sort: view,
                per_page: repositoriesPerPage,
            });
            if (data.status === 200) {
                return yield Promise.all(data.data.map((x) => __awaiter(this, void 0, void 0, function* () {
                    //get commit data for each repo
                    const commitData = yield (0, getRepoCommits_1.default)(oktokit, ownerLogin, x, repositoriesPerPage);
                    return {
                        name: x.name,
                        private: x.private,
                        html_url: x.html_url,
                        description: x.description,
                        created_at: x.created_at,
                        updated_at: x.updated_at,
                        homepage: x.homepage,
                        language: x.language,
                        default_branch: x.default_branch,
                        commit_history: commitData,
                    };
                })));
            }
            else {
                return null;
            }
        }
        catch (e) {
            console.log(e);
            return null;
        }
    });
}
exports.default = getRepositories;
