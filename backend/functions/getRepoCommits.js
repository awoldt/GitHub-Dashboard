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
Object.defineProperty(exports, "__esModule", { value: true });
function getRepoCommits(oktokit, ownerName, repos, reposPerPage) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let commitData = [];
            const data = yield oktokit.request("GET /repos/{owner}/{repo}/commits", {
                owner: ownerName,
                repo: repos.name,
                per_page: reposPerPage === 25 ? 7 : reposPerPage === 50 ? 5 : reposPerPage === 75 ? 3 : 2,
            });
            if (data.status === 200) {
                for (let y = 0; y < data.data.length; ++y) {
                    commitData.push({
                        message: data.data[y].commit.message,
                        html_url: data.data[y].html_url,
                        sha: data.data[y].sha,
                    });
                }
                return commitData;
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
exports.default = getRepoCommits;
