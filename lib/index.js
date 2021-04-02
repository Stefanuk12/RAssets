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
// Dependencies
const got_1 = __importDefault(require("got"));
const form_data_1 = __importDefault(require("form-data"));
// RAssets namespace
var RAssets;
(function (RAssets) {
    // Vars
    const HttpClient = got_1.default.extend({
        prefixUrl: "https://publish.roblox.com/v1/",
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36 OPR/73.0.3856.421",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Dest": "empty",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
        }
    });
    // Check if a cookie is valid / Get CSRF
    function getCSRF(cookie) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get Response
            const response = yield got_1.default.post("https://auth.roblox.com/v2/logout", {
                throwHttpErrors: false,
                headers: {
                    Cookie: `.ROBLOSECURITY=${cookie};`
                }
            });
            // Return CSRF
            if (response.headers["x-csrf-token"]) {
                return response.headers["x-csrf-token"].toString();
            }
        });
    }
    RAssets.getCSRF = getCSRF;
    // Get __RequestVerificationToken
    function getRequestVerificationToken(cookie) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get Response
            const response = yield got_1.default.get("https://roblox.com/build/upload", {
                ignoreInvalidCookies: false,
                headers: {
                    "Host": "www.roblox.com",
                    Cookie: `.ROBLOSECURITY=${cookie};`,
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36 OPR/72.0.3815.473"
                }
            });
            // Match the token and return it
            const result = response.body.match(/<input name=__RequestVerificationToken type=hidden value=(.+?)>/);
            if (result) {
                return result[1];
            }
            return "N/A";
        });
    }
    RAssets.getRequestVerificationToken = getRequestVerificationToken;
    // Upload an audio
    function uploadAudio(cookie, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get CSRF
            const xcsrf = yield RAssets.getCSRF(cookie);
            if (!xcsrf) {
                throw (new Error("Invalid cookie"));
            }
            // Send request
            const response = yield HttpClient.post("audio", {
                throwHttpErrors: false,
                headers: {
                    cookie: `.ROBLOSECURITY=${cookie};`,
                    "x-csrf-token": xcsrf
                },
                json: data
            });
            // Get response body
            const responseBody = JSON.parse(response.body);
            // Check for any errors
            if (responseBody["errors"]) {
                const error = responseBody["errors"][0];
                const errorMessage = error["message"];
                if (errorMessage) {
                    throw (new Error(errorMessage));
                }
            }
            // Return
            return responseBody;
        });
    }
    RAssets.uploadAudio = uploadAudio;
    // Upload an asset - broken have no idea how to fix this
    function upload(cookie, file, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get verification token
            const RequestVerificationToken = yield RAssets.getRequestVerificationToken(cookie);
            // Form Data
            const form = new form_data_1.default();
            form.append("__RequestVerificationToken", RequestVerificationToken);
            form.append("assetTypeId", data.assetTypeId);
            form.append("isOggUploadEnabled", data.isOggUploadEnabled || "True");
            form.append("groupId", data.groupId || "");
            form.append("onVerificationPage", data.onVerificationPage || "False");
            form.append("captchaEnabled", data.captchaEnabled || "False");
            form.append("captchaToken", data.captchaToken || "");
            form.append("captchaProvider", data.captchaProvider || "");
            form.append("file", file.content, {
                filename: `${file.name}.${file.type}`,
                contentType: data.mime,
            });
            form.append("name", file.name);
            // Body
            const body = form.getBuffer().toString("base64");
            // Send request
            const response = yield got_1.default.post("https://roblox.com/build/upload", {
                followRedirect: false,
                headers: {
                    Host: "www.roblox.com",
                    Cookie: `.ROBLOSECURITY=${cookie}; __RequestVerificationToken=${RequestVerificationToken};`,
                    "Content-Length": body.length.toString(),
                    "Content-Type": `multipart/form-data; boundary=${form.getBoundary()}`,
                    "Content-Transfer-Encoding": "base64"
                },
                body: body
            });
            // Getting the redirect URL + SoundId
            const url = response.body.match(/<a href="(.+?)">here</) || ["Error", "Error"];
            const soundId = response.body.match(/uploadedId=(.+?)">here</) || ["Error", "Error"];
            console.log(url[1]);
            console.log(soundId[1]);
            // Returning SoundId
            return soundId[1];
        });
    }
    RAssets.upload = upload;
    // Verify if an audio can be uploaded
    function verifyAudio(cookie, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get CSRF
            const xcsrf = yield RAssets.getCSRF(cookie);
            if (!xcsrf) {
                throw (new Error("Invalid cookie"));
            }
            // Config
            const config = {
                file: data.file,
                paymentSource: data.paymentSource,
            };
            if (data.duration)
                config.duration = data.duration;
            if (data.fileSize)
                config.fileSize = data.fileSize;
            if (data.groupId)
                config.groupId = data.groupId;
            if (data.name)
                config.name = data.name;
            // Send request
            const response = yield HttpClient.post("audio/verify", {
                throwHttpErrors: false,
                headers: {
                    Cookie: cookie,
                    "X-CSRF-Token": xcsrf,
                    "Content-Type": "application-json"
                },
                body: JSON.stringify(config)
            });
            // Parse Body
            const responseBody = JSON.parse(response.body);
            // Check for any errors
            if (responseBody["errors"]) {
                const error = responseBody["errors"][0];
                const errorMessage = error["message"];
                if (errorMessage) {
                    throw (new Error(errorMessage));
                }
            }
            return responseBody;
        });
    }
    RAssets.verifyAudio = verifyAudio;
})(RAssets || (RAssets = {}));
module.exports = RAssets;
//# sourceMappingURL=index.js.map