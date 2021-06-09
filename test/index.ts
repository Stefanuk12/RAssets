// Dependencies
import * as fs from "fs"
import RAssets from "../src/index"

//
(async () => {
    // Vars
    const testAudio = fs.readFileSync("./test/test.ogg")
    const testImage = fs.readFileSync("./test/test.png")
    const testModel = fs.readFileSync("./test/test.rbxm")
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
    const uploadAsset = await RAssets.upload(cookie, {content: testModel, name: "test", type: "rbxm"}, {
        assetType: "Model",
        name: "test",
        description: "test",
        ispublic: true,
        allowcomments: true
    })
    
    // Test
    //const verifyAudio = await RAssets.verifyAudio(cookie, {file: testAudio.toString("base64"), paymentSource: "User"})

    //
    console.log(uploadAsset)
})()