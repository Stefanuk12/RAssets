export interface IAudioVerifyRequest {
    name?: string
    file: string
    groupId?: number
    paymentSource: "User" | "Group"
    fileSize?: number
    duration?: number
}