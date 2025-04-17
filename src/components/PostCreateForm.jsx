"use client"
import React, {useActionState} from 'react';

import * as actions from '@/app/actions/index';
import {Alert, Box, Button, TextField, Typography} from "@mui/material";
import FormButton from "@/components/common/FormButton";

function PostCreateForm({formTitle = "Create a Post",slug}) {


    const [formState, action] = useActionState(actions.createPost.bind(null,slug), {title:"",content:"",errors:{
            _form:""
        }
    })

    // console.log("FORM STAtE Data  ", slug)


    return (
        <Box className={"flex flex-col col-span-3"} sx={{width: "50%", margin: "0 auto"}}>

            <Box className={"title-wrapper mb-5 text-center"}>
                <Typography variant="h5" component="h2">{formTitle}</Typography>
            </Box>

            <Box
                sx={{display: "flex", flexDirection: "column", width: "100%"}}
                className="formWrapper"
                component={"form"}
                action={action}
            >

                <TextField
                    defaultValue={formState.title||""}
                    required
                    color="warning"
                    variant="outlined"
                    name={"title"}
                    id="outlined-required"
                    label="Post Title"
                    error={!!formState.errors?.title}
                    helperText={formState.errors?.title?.[0]}
                />

                <TextField
                    defaultValue={formState.content||""}
                    color="warning"
                    name={"content"}
                    label="Content"
                    required
                    id="outlined-required"
                    error={!!formState.errors?.content}
                    helperText={formState.errors?.content?.[0]}
                />

                {/*<Button type={"submit"}>Submit</Button>*/}
                {formState.errors?._form && (
                    <Alert  severity="error" sx={{ mt: 2 ,display:"flex", justifyContent: "center" }}>
                        {formState.errors._form}
                    </Alert>
                )}

                <FormButton>Save</FormButton>


            </Box>





        </Box>
    );
}

export default PostCreateForm;