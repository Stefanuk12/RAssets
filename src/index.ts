// Dependencies
import got from "got"
import { IAssetUploadRequest } from "./interfaces/IAssetUploadRequest";
import { IAudioRequest } from "./interfaces/IAudioRequest";
import { IAudioResponse } from "./interfaces/IAudioResponse";
import { IAudioVerifyRequest } from "./interfaces/IAudioVerifyRequest";
import { IAudioVerifyResponse } from "./interfaces/IAudioVerifyResponse";

// RAssets namespace
namespace RAssets {
    // Vars
    const HttpClient = got.extend({
        prefixUrl: "https://publish.roblox.com/v1/",
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36 OPR/73.0.3856.421",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Dest": "empty",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
        }
    })

    // Check if a cookie is valid / Get CSRF
    export async function getCSRF(cookie: string){
        // Get Response
        const response = await got.post("https://auth.roblox.com/v2/logout", {
            throwHttpErrors: false,
            headers: {
                Cookie: `.ROBLOSECURITY=${cookie};`
            }
        })

        // Return CSRF
        if (response.headers["x-csrf-token"]){
            return response.headers["x-csrf-token"].toString()
        }
    }

    // Get __RequestVerificationToken
    export async function getRequestVerificationToken(cookie: string){
        // Get Response
        const response = await got.get("https://roblox.com/build/upload", {
            ignoreInvalidCookies: false,
            headers: {
                "Host": "www.roblox.com",
                Cookie: `.ROBLOSECURITY=${cookie};`,
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36 OPR/72.0.3815.473"
            }
        });

        // Match the token and return it
        const result = response.body.match(/<input name=__RequestVerificationToken type=hidden value=(.+?)>/)
        
        if (result){
            return result[1]
        }

        return "N/A"
    }

    // Upload an audio
    export async function uploadAudio(cookie: string, data: IAudioRequest){
        // Get CSRF
        const xcsrf = await RAssets.getCSRF(cookie)
        if (!xcsrf){
            throw(new Error("Invalid cookie"))
        }

        // Send request
        const response = await HttpClient.post("audio", {
            throwHttpErrors: false,
            headers: {
                cookie: `.ROBLOSECURITY=${cookie};`,
                "x-csrf-token": xcsrf
            },
            json: data
        })

        // Get response body
        const responseBody = JSON.parse(response.body)

        // Check for any errors
        if (responseBody["errors"]){
            const error = responseBody["errors"][0]
            const errorMessage = error["message"]

            if (errorMessage){
                throw(new Error(errorMessage))
            }
        }

        // Return
        return <IAudioResponse>responseBody
    }

    // Upload an asset - using hidden api :flushed: (ACTUALLY WORKS, broken for some assets :( though )
    export async function upload(cookie: string, data: IAssetUploadRequest){
        // Get CSRF
        const xcsrf = await RAssets.getCSRF(cookie)
        if (!xcsrf){
            throw(new Error("Invalid cookie"))
        }

        // Check type
        if (data.assetType == "Audio"){
            return uploadAudio(cookie, {
                name: data.name,
                file: data.file.toString("base64"),
                paymentSource: "User"
            })
        }

        // Send request
        const response = await got.post("http://data.roblox.com/Data/Upload.ashx", {
            headers: {
                "User-Agent": "Roblox/WinInet",
                Cookie: `.ROBLOSECURITY=${cookie};`,
                "x-csrf-token": xcsrf
            },
            body: data.file,
            searchParams: {
                assetid: data.assetid || 0,
                type: data.assetType,
                name: data.name,
                description: data.description,
                ispublic: data.ispublic,
                allowcomments: data.allowcomments
            }
        })

        //
        return response.body
    }

    // Verify if an audio can be uploaded
    export async function verifyAudio(cookie: string, data: IAudioVerifyRequest){
        // Get CSRF
        const xcsrf = await RAssets.getCSRF(cookie)
        if (!xcsrf){
            throw(new Error("Invalid cookie"))
        }

        // Config
        const config = <IAudioVerifyRequest>{
            file: data.file,
            name: "string",
            paymentSource: data.paymentSource,
            fileSize: data.file.length
        }
        if (data.duration) config.duration = data.duration
        if (data.groupId) config.groupId = data.groupId
        if (data.fileSize) config.fileSize = data.fileSize
        if (data.name) config.name = data.name

        // Send request
        const response = await HttpClient.post("audio/verify", {
            throwHttpErrors: false,
            headers: {
                Cookie: `.ROBLOSECURITY=${cookie};`,
                "X-CSRF-Token": xcsrf,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(config)
        })

        // Parse Body
        const responseBody = JSON.parse(response.body)

        // Check for any errors
        if (responseBody["errors"]){
            const error = responseBody["errors"][0]
            const errorMessage = error["message"]

            if (errorMessage){
                throw(new Error(errorMessage))
            }
        }

        return <IAudioVerifyResponse>responseBody
    }
}

// Export
export = RAssets