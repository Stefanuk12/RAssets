export interface IAssetUploadRequest {
    file: Buffer
    assetid?: number
    assetType: "Image" | "TeeShirt" | "Audio" | "Mesh" | "Lua" | "Hat" | "Place" | "Model" | "Shirt" | "Pants" | "Decal" | "Head" | "Face" | "Gear" | "Badge" | "Animation" | "Torso" | "RightArm" | "LeftArm" | "LeftLeg" | "RightLeg" | "Package" | "GamePass" | "Plugin" | "MeshPart" | "HairAccessory" | "FaceAccessory" | "NeckAccessory" | "ShoulderAccessory" | "FrontAccessory" | "BackAccessory" | "WaistAccessory" | "ClimbAnimation" | "DeathAnimation" | "FallAnimaiton" | "IdleAnimation" | "JumpAnimation" | "RunAnimation" | "SwimAnimation" | "WalkAnimation" | "PoseAnimation" | "EarAccessory" | "EyeAccessory" | "EmoteAnimation" | "Video" 
    name: string
    description?: string
    ispublic?: boolean
    allowcomments?: boolean
}