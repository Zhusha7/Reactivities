import {useParams} from "react-router";
import {useProfile} from "../../lib/hooks/useProfile.ts";
import {Box, Button, Divider, ImageList, ImageListItem, Typography} from "@mui/material";
import {useState} from "react";
import PhotoUploadWidget from "../../app/shared/components/PhotoUploadWidget.tsx";
import StarButton from "../../app/shared/components/StarButton.tsx";
import DeleteButton from "../../app/shared/components/DeleteButton.tsx";

export default function ProfilePhotos() {
    const {id} = useParams();
    const {photos, loadingPhotos, isCurrentUser, uploadPhoto, profile, setMainPhoto, deletePhoto} = useProfile(id);
    const [editMode, setEditMode] = useState(false);

    if (loadingPhotos) return <Typography>Loading...</Typography>;

    if (!photos) return (
        <Typography>No photos found</Typography>
    )

    const handleUpload = (file: File) => {
        uploadPhoto.mutate(file, {
            onSuccess: () => {
                setEditMode(false);
            }
        });
    }

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" mb={2} mt={2} alignItems="center" gap={2}>
                <Typography variant="h5">Photos</Typography>
                {isCurrentUser && (
                    <Button onClick={() => setEditMode(!editMode)}>
                        {editMode ? "Cancel" : "Add photo"}
                    </Button>
                )}
            </Box>
            <Divider sx={{my: 2}}/>
            {editMode ? (
                <PhotoUploadWidget uploadPhoto={handleUpload} loading={uploadPhoto.isPending}/>
            ) : (
                <ImageList sx={{height: 350}} cols={6} rowHeight={164}>
                    {photos.map((photo) => (
                        <ImageListItem key={photo.id}>
                            <img
                                srcSet={`${photo.url.replace(
                                    '/upload/',
                                    '/upload/w_164,h_164,c_fill,g_face,q_auto:eco,dpr_2.0,f_auto/'
                                )}`}
                                src={`${photo.url.replace(
                                    '/upload/',
                                    '/upload/w_164,h_164,c_fill,g_face,q_auto:eco,dpr_1.0,f_auto/'
                                )}`}
                                alt="user profile image"
                                loading="lazy"
                            />
                            {isCurrentUser && (
                                <div>
                                    <Box
                                        sx={{position: "absolute", top: 0, left: 0, zIndex: 1000}}
                                        onClick={() => setMainPhoto.mutate(photo)}
                                    >
                                        <StarButton selected={photo.url === profile?.imageUrl}/>
                                    </Box>
                                    {photo.url !== profile?.imageUrl && (
                                        <Box
                                            sx={{position: "absolute", bottom: 0, right: 0, zIndex: 1000}}
                                            onClick={() => deletePhoto.mutate(photo.id)}
                                        >
                                            <DeleteButton/>
                                        </Box>
                                    )}
                                </div>
                            )}
                        </ImageListItem>
                    ))}
                </ImageList>
            )}
        </Box>
    );
}

