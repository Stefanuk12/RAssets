// Dependencies
import * as fs from "fs"
import RAssets from "../src/index"

//
(async () => {
    // Vars
    const testAudio = fs.readFileSync("./test/test.ogg")
    const testImage = fs.readFileSync("./test/test.png")
    const cookie = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_31AB33A9CBC6118B10953C1A9544EC923689012D4EA118BFDF809D7FC98DEC4A5CAD3DF92A67DAEBB58616009BC5A64A8A83083E920AEBA7062094EBE57A899B372C487E46CED847A5ADAEA636AC354C3BFB1631F9FF0168A5B86B4B82885780D38E681BCF81DCF5B1CE3AA4E5BF4FEEC2ECC78445019AAFF4A7E5B7425D00B5D5E1B4037ABE6A883F20B8714F15B5CE21081CB443B858855234B833BEED20177501A5C2D8602FA2682BD37296A33B1A4B03D29386DA963A52CCC87AC6EEBDDCE0C615A49827057185AE0685C23E5F9522CA538ECAEE9DCDA6AC3134070B5C8857FC3A2FCD88B00B58BD16D5923D88A27D5E6F02DA907E12592857CA768490FC7F03F978394A862AF26AD65227A200B19302A678143A5C28995F71159CD8EBA9070B03A1"

    // Upload Audio
    /*
    const uploadAudio = await RAssets.uploadAudio(cookie, {
        name: "test",
        file: testAudio.toString("base64"),
        paymentSource: "User"
    })
    */

    // Upload Asset
    const uploadAsset = await RAssets.upload(cookie, {content: testImage, name: "test", type: "png"}, {mime: "image/png", assetTypeId: "11"})
    
    // Results

})()