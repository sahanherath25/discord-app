"use client"

import React, {useActionState} from 'react';
import {Alert, Box, Button, TextField, Typography} from "@mui/material";
import * as actions from "@/app/actions/index";
import FormButton from "@/components/common/FormButton";


function TopicCreateForm({formTitle = "New Form"}) {

    const [formState, action] = useActionState(actions.createTopic, {name:"",description:"",errors: {
        _form:""
        }})

    console.log("FORM STAtE Data  ", formState)

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
                    defaultValue={formState.name||""}
                    required
                    color="warning"
                    variant="outlined"
                    name={"name"}
                    id="outlined-required"
                    label="Topic Name"
                    error={!!formState.errors?.name}
                    helperText={formState.errors?.name?.[0]}

                />

                <TextField
                    defaultValue={formState.description||""}
                    color="warning"
                    name={"description"}
                    label="Description"
                    required
                    id="outlined-required"
                    error={!!formState.errors?.description}
                    helperText={formState.errors?.description?.[0]}

                />


                {/*{formState.errors._form?<p>{formState.errors._form}</p>:null}*/}
                {formState.errors?._form && (
                    <Alert  severity="error" sx={{ mt: 2 ,display:"flex", justifyContent: "center" }}>
                        {formState.errors._form}
                    </Alert>
                )}
                {/*<Button type={"submit"}>Submit</Button>*/}

                <FormButton>Save</FormButton>


            </Box>

        </Box>

    );
}

export default TopicCreateForm;