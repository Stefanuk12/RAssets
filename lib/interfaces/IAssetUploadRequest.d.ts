/// <reference types="node" />
export interface IAssetUploadRequest {
    assetTypeId: string;
    isOggUploadEnabled?: "True" | "False";
    groupId?: string;
    onVerificationPage?: "True" | "False";
    captchaEnabled?: "True" | "False";
    captchaToken?: string;
    captchaProvider?: string;
    mime: string;
}
export interface IAssetUploadFile {
    content: Buffer;
    name: string;
    type: string;
}
//# sourceMappingURL=IAssetUploadRequest.d.ts.map