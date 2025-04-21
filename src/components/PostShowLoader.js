import {Box, Skeleton, Stack} from "@mui/material";


function PostShowLoader(props) {
    return (
        <Box p={3} maxWidth={600} mx="">
            {/* Title */}
            <Skeleton variant="text" width="70%" height={60} sx={{ mb: 1 }} />

            {/* Body content */}
            <Skeleton variant="rounded" width="100%" height={150} sx={{ mb: 2 }} />
        </Box>
    )
}

export default PostShowLoader;


