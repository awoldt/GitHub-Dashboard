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
function default_1(oktokit, owner, repo) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield oktokit.request("GET /repos/{owner}/{repo}/commits", {
                owner: owner,
                repo: repo,
                per_page: 10,
            });
            return data.data.map((x) => {
                return {
                    sha: x.sha,
                    message: x.commit.message,
                    author: x.commit.author.name,
                    html_url: x.html_url,
                };
            });
        }
        catch (e) {
            return null;
        }
    });
}
exports.default = default_1;
