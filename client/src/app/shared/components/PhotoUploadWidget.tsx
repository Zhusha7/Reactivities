import {Box, Button, Grid, Typography} from "@mui/material";
import {useDropzone} from "react-dropzone";
import {useCallback, useEffect, useRef, useState} from "react";
import {CloudUpload} from "@mui/icons-material";
import {Cropper, ReactCropperElement} from "react-cropper";
import "cropperjs/dist/cropper.css";

type Props = {
    uploadPhoto: (photo: File) => void;
    loading: boolean;
}

export default function PhotoUploadWidget({uploadPhoto, loading}: Props) {
    const [files, setFiles] = useState<object & { preview: string }[]>([])
    const cropperRef = useRef<ReactCropperElement>(null)

    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview))
        }
    }, [files])

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file),
        })))
    }, [])

    const onCrop = useCallback(() => {
        const cropper = cropperRef.current?.cropper;
        cropper?.getCroppedCanvas()?.toBlob(blob => {
            if (blob) {
                uploadPhoto(blob as File)
            }
        })
    }, [uploadPhoto])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <Grid container spacing={3}>
            <Grid size={4} alignItems="center" justifyContent="flex-start" display="flex" flexDirection="column" gap={2}>
                <Typography variant="overline" color="secondary">Step 1 - Add photo</Typography>
                <Box
                    {...getRootProps()}
                    sx={{
                        border: 2,
                        borderColor: isDragActive ? "primary.main" : "text.secondary",
                        borderRadius: 10,
                        p: 3,
                        textAlign: "center",
                        cursor: "pointer",
                        borderStyle: "dashed",
                        height: "280px",
                    }}
                >
                    <input {...getInputProps()} />
                    <CloudUpload sx={{fontSize: 100}} color="primary"/>
                    {
                        isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p>Drag 'n' drop some files here, or click to select files</p>
                    }
                </Box>
            </Grid>
            <Grid size={4} alignItems="center" justifyContent="flex-start" display="flex" flexDirection="column" gap={2}>
                <Typography variant="overline" color="secondary">Step 2 - Resize image</Typography>
                {
                    files[0]?.preview &&
                    <Cropper
                        ref={cropperRef}
                        src={files[0].preview}
                        style={{height: "300px", width: "90%"}}
                        initialAspectRatio={1}
                        aspectRatio={1}
                        preview='.img-preview'
                        guides={false}
                        viewMode={1}
                        background={false}
                    />
                }
            </Grid>
            <Grid size={4} alignItems="center" justifyContent="flex-start" display="flex" flexDirection="column" gap={2}>
                {files[0]?.preview && (
                    <>
                        <Typography variant="overline" color="secondary">Step 1 - Preview & upload</Typography>
                        <div className="img-preview" style={{width: "90%", height: "300px", overflow: "hidden"}}/>
                        <Button
                            sx={{my: 1, width: "90%"}}
                            onClick={onCrop}
                            variant={"contained"}
                            color={"secondary"}
                            loading={loading}
                        >
                            Upload
                        </Button>
                    </>
                )}
            </Grid>
        </Grid>
    );
}