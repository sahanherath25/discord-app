import React from 'react';
import PostList from "@/components/PostList";
import PostShow from "@/components/PostShow";
import CommentsCreateForm from "@/components/CommentsCreateForm";
import CommentList from "@/components/CommentList";
import {fetchCommentsByPostId} from "@/app/lib/queries/comments";
import {Box, Container, Typography} from "@mui/material";

async function PostShowPage({params}) {

    const id = await params.postId

    console.log("Params ", id)

    return (

        <Box sx={{display: "grid", gridTemplateColumns: "1fr"}}>

            <h2>You are in Detail Page</h2>
            <PostShow postId={id}/>

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