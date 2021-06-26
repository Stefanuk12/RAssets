import { IAssetUploadRequest } from "./interfaces/IAssetUploadRequest";
import { IAudioRequest } from "./interfaces/IAudioRequest";
import { IAudioVerifyRequest } from "./interfaces/IAudioVerifyRequest";
import { IAudioVerifyResponse } from "./interfaces/IAudioVerifyResponse";
declare namespace RAssets {
    function getCSRF(cookie: string): Promise<string | undefined>;
    function getRequestVerificationToken(cookie: string): Promise<string>;
    function uploadAudio(cookie: string, data: IAudioRequest, returnId?: boolean): Promise<any>;
    function upload(cookie: string, data: IAssetUploadRequest): Promise<any>;
    function verifyAudio(cookie: string, data: IAudioVerifyRequest): Promise<IAudioVerifyResponse>;
}
export = RAssets;
//# sourceMappingURL=index.d.ts.map