// Dependencies
import * as fs from "fs"
import { AssetType } from "../src/enum/AssetType"
import RAssets from "../src/index"

//
(async () => {
    // Vars
    const testAudio = fs.readFileSync("./test/test.ogg")
    const testImage = fs.readFileSync("./test/test.png")
    const cookie = ""

    // Upload Audio
    /*
    const uploadAudio = await RAssets.uploadAudio(cookie, {
        name: "test",
        file: testAudio.toString("base64"),
        paymentSource: "User"
    })
    */

    // Upload Asset
    //const uploadAsset = await RAssets.upload(cookie, {content: testImage, name: "test", type: "png"}, {mime: "image/png", assetTypeId: AssetType.Image})
    
    // Test
    const verifyAudio = await RAssets.verifyAudio(cookie, {file: testAudio.toString("base64"), paymentSource: "User"})

    //
    console.log(verifyAudio)
})()