import type { UploadResponseDto } from "../dto/upload-response.dto";
import type { UploadResponse } from "../models/upload-response.model";

export function mapUploadResponseDtoToModel(dto: UploadResponseDto): UploadResponse {
    return {
        imageId: dto.image_id,
    };
}
