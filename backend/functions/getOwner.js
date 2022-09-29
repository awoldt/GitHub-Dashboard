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
function getOwner(oktokit, username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield oktokit.request("GET /users/{username}", {
                username: username,
            });
            if (data.status === 200) {
                return {
                    avatar: data.data.avatar_url,
                    html_url: data.data.html_url,
                    name: data.data.name,
                    location: data.data.location,
                    email: data.data.email,
                    bio: data.data.bio,
                    twitter_username: data.data.twitter_username,
                    num_of_followers: data.data.followers,
                    num_of_following: data.data.following,
                    acct_created_on: data.data.created_at,
                };
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
exports.default = getOwner;
