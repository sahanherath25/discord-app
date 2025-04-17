import React from 'react';
import {Box, Typography} from "@mui/material";
import prisma from "../../prisma/index"
import {notFound} from "next/navigation";
import CommentShow from "@/components/CommentShow";
import Divider from "@mui/material/Divider";


async function CommentList({fetchData}) {

    let comments = await fetchData();

    const topLevelComments = comments.filter(
        (comment) => comment.parentId === null
    );

    console.log("Currnet CDomments ",comments)

    if(!comments){
        notFound();
    }

    return (
        <Box sx={{
            mt: 2,
            border: "1px solid #e0e0e0",
            borderRadius: 2,
            padding: 2,
            backgroundColor: "background.paper"
        }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
                {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {topLevelComments.map((comment) => (
                <Box key={comment.id} sx={{ mb: 2 }}>
                    <CommentShow
                        commentId={comment.id}
                        comments={comments}
                    />
                </Box>
            ))}
        </Box>
    );
}

export default CommentList;