import { PREVIEW_URL } from "./constants";

export async function convertMediaToFile(media: Media): Promise<File | null> {
    if (!media) {
        return null;
    }
    try {
        const response = await fetch(`${PREVIEW_URL}${media.original_url}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch file from ${PREVIEW_URL}${media.original_url}`);
        }

        const blob = await response.blob();

        const file = new File([blob], media.file_name, {
            type: media.mime_type,
            lastModified: new Date(media.updated_at).getTime(),
        });

        return file;
    } catch (error) {
        console.error(`Error creating file for media with name ${media.file_name}:`, error);
        return null;
    }
}