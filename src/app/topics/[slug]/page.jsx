import React from 'react';
import {Box, Button, Typography} from "@mui/material";
import Link from "next/link";
import Divider from "@mui/material/Divider";
import TopicsList from "@/components/TopicsList";
import PostCreateForm from "@/components/PostCreateForm";
import TopicCreateForm from "@/components/TopicCreateForm";
import CloseIcon from "@mui/icons-material/Close";
import PostList from "@/components/PostList";
import {fetchPostBySlug} from "@/app/lib/queries/posts";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

async function TopicsPage({params, searchParams}) {

    const data = await params
    const query = await searchParams
    const showForm = query?.showForm === "true";
    let {slug} = await params
    if (slug.includes("%")) {
        slug = decodeURIComponent(slug);
    }

    const session=await getServerSession(authOptions)

    console.log("user Logged in is ",session)

    return (
        <Box className={"grid grid-cols-4 mx-6 my-4"} component={"section"}
             sx={{display: "flex", justifyContent: "space-between"}}>

            <Box className={" col-span-3"}>

                {slug?
                    <><Typography variant="h5" component="h2">{slug}</Typography></>
                    :null
                }

                <PostList fetchData={()=>fetchPostBySlug(slug)} />

            </Box>

            {showForm && (
                <Box
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
                            margin: "0 auto",
                            bgcolor: "background.default",
                            borderRadius: "12px",
                            boxShadow: 24,
                            p: 4,
                            zIndex: 50,
                        }}
                    >
                        <PostCreateForm slug={slug} formTitle="Create a New Topic"/>

                        <Link href={`./${data.slug}`} style={{textDecoration: "none"}}>
                            <CloseIcon sx={{position: "absolute", top: 8, right: 8}} size={30}/>
                        </Link>
                    </Box>
                </Box>
            )}

            <Box component={"div"}>
                <Link
                    href="?showForm=true"
                    className="col-span-1"
                    style={{textDecoration: "none"}}
                >
                    <Button>New Post</Button>
                </Link>

                <Divider/>

                <TopicsList/>
            </Box>


        </Box>
    );
}

export default TopicsPage;