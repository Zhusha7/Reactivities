import {Avatar, Box, Card, CardContent, CircularProgress, TextField, Typography,} from "@mui/material";
import {Link, useParams} from "react-router";
import {useComments} from "../../../lib/hooks/useComments.ts";
import {timeAgo} from "../../../lib/util/util.ts";
import {FieldValues, useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {KeyboardEvent} from "react";
import {observer} from "mobx-react-lite";

const ActivityDetailsChat = observer(function ActivityDetailsChat() {
    const {id} = useParams();
    const {commentStore} = useComments(id);
    const {register, handleSubmit, reset, formState: {isSubmitting}} = useForm();

    const addComment = async (data: FieldValues) => {
        try {
            await commentStore.hubConnection?.invoke("SendComment", {
                activityId: id,
                body: data.body,
            });
            reset();
        } catch (e) {
            toast.error("Error adding comment");
            console.error("Error adding comment: " + e);
        }
    }

    const handleKeyDown = (ev: KeyboardEvent<HTMLDivElement>) => {
        if (ev.key === "Enter" && !ev.shiftKey) {
            ev.preventDefault();
            handleSubmit(addComment)();
        }
    }

    return (
        <>
            <Box
                sx={{
                    textAlign: "center",
                    backgroundColor: "primary.main",
                    color: "white",
                    padding: 2,
                    borderTopLeftRadius: 4,
                    borderTopRightRadius: 4,
                }}
            >
                <Typography variant="h6">Chat about this event</Typography>
            </Box>
            <Card
                sx={{
                    borderRadius: 0,
                    borderBottomLeftRadius: 4,
                    borderBottomRightRadius: 4,
                }}
            >
                <CardContent>
                    <div>
                        <form>
                            <TextField
                                {...register("body", {required: true})}
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={2}
                                placeholder="Enter your comment (Enter to submit, SHIFT + Enter for new line)"
                                onKeyDown={handleKeyDown}
                                slotProps={{
                                    input: {
                                        endAdornment: isSubmitting ? (
                                            <CircularProgress size={24}/>
                                        ) : null
                                    }
                                }}
                            />
                        </form>
                    </div>

                    <Box sx={{height: 400, overflowY: "auto"}}>
                        {commentStore.comments.map(comment => (
                            <Box key={comment.id} sx={{display: "flex", my: 2}}>
                                <Avatar
                                    src={comment.imageUrl || "/images/user.png"}
                                    alt={"user image"}
                                    sx={{mr: 2}}
                                />
                                <Box display="flex" flexDirection="column">
                                    <Box display="flex" alignItems="center" gap={3}>
                                        <Typography
                                            component={Link}
                                            color="primary"
                                            to={`/profiles/${comment.userId}`}
                                            variant="subtitle1"
                                            sx={{fontWeight: "bold", textDecoration: "none"}}
                                        >
                                            {comment.displayName}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {timeAgo(comment.createdAt) || "Just now"}
                                        </Typography>
                                    </Box>

                                    <Typography sx={{whiteSpace: "pre-wrap"}}>
                                        {comment.body}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}

                    </Box>
                </CardContent>
            </Card>
        </>
    );
});

export default ActivityDetailsChat;