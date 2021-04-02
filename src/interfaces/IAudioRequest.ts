export interface IAudioRequest {
    name: string
    file: string // base64 encoded
    groupId?: string
    paymentSource: "User" | "Group"
    estimatedFileSize?: number
    estimatedDuration?: number
}