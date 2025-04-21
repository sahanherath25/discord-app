"use client"
import React, {useEffect, useState} from 'react';
import {Alert, Box, Button, TextField, Typography} from "@mui/material";
import * as actions from "@/app/actions/index";
import FormButton from "@/components/common/FormButton";
import  {useActionState} from 'react';// Changed from useActionState

function CommentsCreateForm({ postId, parentId, formTitle = "Create Comment", startOpen = false }) {

    const [open, setOpen] = useState(startOpen);
    const formRef = React.useRef(null);

    // Using useFormState instead of useActionState (more stable in Next.js)
    const [formState, action] = useActionState(actions.createComment.bind(null, { postId, parentId }), { errors: {} }
    );

    // Reset form on successful submission
    useEffect(() => {
        if (formState.success) {
            formRef.current?.reset();
            if (!startOpen) setOpen(false);
        }
    }, [formState, startOpen]);

    if (!open) {
        return (
            <Button
                size="small"
                variant="outlined"
                onClick={() => setOpen(true)}
                sx={{ mb: 2 }}
            >
                Add Comment
            </Button>
        );
    }

    return (
        <Box sx={{
            width: "50%",
            maxWidth: "800px",
            margin: "0 auto",
            mb: 3,
            border: "1px solid #e0e0e0",
            borderRadius: 1,
            p: 2,
            backgroundColor: "background.default"
        }}>
            <Typography variant="h6" gutterBottom>
                {formTitle}
            </Typography>

            <Box
                component="form"
                action={action}
                ref={formRef}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
                <TextField
                    multiline
                    minRows={3}
                    name="content"
                    label="Your comment"
                    variant="outlined"
                    fullWidth
                    error={!!formState.errors?.content}
                    helperText={formState.errors?.content?.join(", ")}
                />
                {formState.errors?._form && (
                    <Alert severity="error">
                        {formState.errors._form.join(", ")}
                    </Alert>
                )}
                <Box sx={{ display: "flex", gap: 2 }}>
                    <FormButton color="primary">
                        Submit
                    </FormButton>
                    {!startOpen && (
                        <Button
                            variant="outlined"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                    )}
                </Box>
            </Box>
        </Box>
    );
}

export default CommentsCreateForm;