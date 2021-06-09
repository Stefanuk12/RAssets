# RAssets
A simple Typescript wrapper to upload assets. See test/index.ts for examples.

## getCSRF
This function allows you to get the CSRF token for a specific cookie.
```ts
await RAssets.getCSRF("cookie")
```

## getRequestVerificationToken
This function allows you to get the __RequestVerificationToken for a specific cookie
```ts
await RAssets.getRequestVerificationToken("cookie")
```

## uploadAudio
This function allows you to upload an audio
```ts
const uploadAudio = await RAssets.uploadAudio(cookie, {
    name: "test",
    file: testAudio.toString("base64"),
    paymentSource: "User"
})
```

## upload
This function allows you to upload any asset (working) using the "hidden" api endpoint - http://data.roblox.com/Data/Upload.ashx. If you specify an assetid that you own, you may even overwrite that asset
```ts
const uploadAsset = await RAssets.upload(cookie, {
    file: testModel,
    assetType: "Model",
    name: "test",
    description: "test",
    ispublic: true,
    allowcomments: true
})
```