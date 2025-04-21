import React from "react";
import {Box, Button, Typography} from "@mui/material";
import TopicCreateForm from "@/components/TopicCreateForm";
import Link from "next/link";
import CloseIcon from '@mui/icons-material/Close';
import TopicsList from "@/components/TopicsList";
import Divider from '@mui/material/Divider';
import PostList from "@/components/PostList";
import {fetchTopPost} from "@/app/lib/queries/posts";

export default async function Home({searchParams }) {

    const search=await searchParams
    const showForm =search?.showForm === "true";
    console.log("SEARCH PAREMS ",search.showForm)

    return (
        <Box className={"grid grid-cols-4 p-4 "}>


            <div className={" col-span-3"}>
                <Typography variant={"h2"}> My Recent Topics</Typography>
                <PostList fetchData={fetchTopPost}/>
            </div>

            {showForm && (
                <Box
                    className={"col-span-1"}
                    sx={{
                        position: "fixed",
                        inset: 0,
                        backdropFilter: "blur(4px)",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 40,
                    }}
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "60%",
                            margin:"0 auto",
                            bgcolor: "background.paper",
                            borderRadius: "12px",
                            boxShadow: 24,
                            p: 4,
                            zIndex: 50,
                        }}
                    >
                        <TopicCreateForm formTitle="Create a New Topic" />

                        <Link href="." style={{ textDecoration: "none" }}>
                            <CloseIcon  sx={{ position: "absolute", top: 8, right: 8 }} size={30}/>
                        </Link>
                    </Box>
                </Box>
            )}


            <Box component={"div"}>
                <Link
                    href="?showForm=true"
                    className="col-span-1"
                    style={{ textDecoration: "none" }}
                >
                    <Button>New Topic</Button>
                </Link>

                <Divider  />

                <TopicsList/>
            </Box>

        </Box>


    );
}



