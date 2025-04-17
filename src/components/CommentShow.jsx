import React from 'react';
import {Avatar, Box, Typography} from "@mui/material";
import {notFound} from "next/navigation";
import CommentsCreateForm from "@/components/CommentsCreateForm";

import Image from "next/image";

function CommentShow({commentId,comments}) {

    const comment = comments.find((c) => c.id === commentId);

    console.log("CURRNET COMMENTS are ", comment);

    if(!comment){
        notFound()
    }

    const nestedComments = comments.filter((c) => c.parentId === commentId);

    return (
        <Box
            sx={{
                border: '1px solid #e0e0e0',
                borderRadius: 2,
                p: 2,
                mb: 2,
                backgroundColor: "#fafafa"
            }}
        >
            <Box display="flex" gap={2}>
                <Avatar
                    src={comment.user.image || ""}
                    alt={comment.user.name}
                    sx={{ width: 40, height: 40 }}
                />
                <Box flex={1}>
                    <Typography variant="subtitle2" color="text.secondary">
                        {comment.user.name}
                    </Typography>
                    <Typography variant="body1" color="text.primary" sx={{ mb: 1 }}>
                        {comment.content}
                    </Typography>

                    <CommentsCreateForm postId={comment.postId} parentId={comment.id}  formTitle={"Reply"}/>
                </Box>
            </Box>

            {nestedComments.length > 0 && (
                <Box mt={2} ml={5} borderLeft="2px solid #e0e0e0" pl={2}>
                    {nestedComments.map((child) => (
                        <CommentShow
                            key={child.id}
                            commentId={child.id}
                            comments={comments}
                        />
                    ))}
                </Box>
            )}
        </Box>
    );


}

export default CommentShow;


// return (
//     <div className="p-4 border mt-2 mb-1">
//         <div className="flex gap-3">
//             {/*<Image*/}
//             {/*    src={comment.user.image || ""}*/}
//             {/*    alt="user image"*/}
//             {/*    width={40}*/}
//             {/*    height={40}*/}
//             {/*    className="w-10 h-10 rounded-full"*/}
//             {/*/>*/}
//             <div className="flex-1 space-y-3">
//                 <p className="text-sm font-medium text-gray-500">
//                     {comment.user.name}
//                 </p>
//                 <p className="text-gray-900">{comment.content}</p>
//
//                 <CommentsCreateForm postId={comment.postId} parentId={comment.id}/>
//             </div>
//         </div>
//         <div className="pl-4">
//
//             {nestedComments.map((child)=>{
//                 return(
//                     <CommentsCreateForm postId={child.postId} parentId={child.id} />
//                 )
//             })}
//         </div>
//     </div>
//
// )