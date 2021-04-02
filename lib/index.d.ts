import { IAssetUploadFile, IAssetUploadRequest } from "./interfaces/IAssetUploadRequest";
import { IAudioRequest } from "./interfaces/IAudioRequest";
import { IAudioResponse } from "./interfaces/IAudioResponse";
import { IAudioVerifyRequest } from "./interfaces/IAudioVerifyRequest";
import { IAudioVerifyResponse } from "./interfaces/IAudioVerifyResponse";
declare namespace RAssets {
    function getCSRF(cookie: string): Promise<string | undefined>;
    function getRequestVerificationToken(cookie: string): Promise<string>;
    function uploadAudio(cookie: string, data: IAudioRequest): Promise<IAudioResponse>;
    function upload(cookie: string, file: IAssetUploadFile, data: IAssetUploadRequest): Promise<string>;
    function verifyAudio(cookie: string, data: IAudioVerifyRequest): Promise<IAudioVerifyResponse>;
}
export = RAssets;
//# sourceMappingURL=index.d.ts.map