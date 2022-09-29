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
function getRepoCommits(oktokit, ownerName, repos) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let commitData = [];
            const data = yield oktokit.request("GET /repos/{owner}/{repo}/commits", {
                owner: ownerName,
                repo: repos.name,
            });
            //for each commit
            //only need the latest 10 commits 
            data.data.length > 10 ? data.data.splice(10) : null;
            for (let y = 0; y < data.data.length; ++y) {
                commitData.push({
                    message: data.data[y].commit.message,
                    html_url: data.data[y].html_url,
                    sha: data.data[y].sha,
                });
            }
            return commitData;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    });
}
exports.default = getRepoCommits;
