import { apiClient } from "../api/client";
import type { UploadResponseDto } from "../dto/upload-response.dto";
import { mapUploadResponseDtoToModel } from "../mappers/upload-response.mapper";

export async function uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    const dto = await apiClient.post<UploadResponseDto>("/upload", formData);
    const response = mapUploadResponseDtoToModel(dto);
    return response.imageId;
}

export async function downloadImage(imageId: string): Promise<string> {
    const blob = await apiClient.get<Blob>(`/download/${imageId}`, { response: "blob" });
    return URL.createObjectURL(blob);
}
