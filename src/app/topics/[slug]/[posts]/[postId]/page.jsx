import React, {Suspense} from 'react';
import PostShow from "@/components/PostShow";
import CommentsCreateForm from "@/components/CommentsCreateForm";
import CommentList from "@/components/CommentList";
import {fetchCommentsByPostId} from "@/app/lib/queries/comments";
import {Box, Container, LinearProgress, Typography} from "@mui/material";
import PostShowLoader from "@/components/PostShowLoader";


async function PostShowPage({params}) {

    const id = await params.postId

    console.log("Params ", id)

    return (
        <Box sx={{display: "grid", gridTemplateColumns: "1fr"}}>

            <Suspense fallback={<PostShowLoader/>}>
                <PostShow postId={id}/>
            </Suspense>

            <Box>
                <Typography variant="h6" fontWeight="medium" gutterBottom>
                    Comments
                </Typography>
                <CommentsCreateForm postId={id}/>
                <CommentList fetchData={() => fetchCommentsByPostId(id)}/>
            </Box>
        </Box>
    );
}



export default PostShowPage;