"use client"

import React from 'react';
import {useSearchParams} from "next/navigation";
import {alpha, Box, Button, InputBase, styled} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

// Styled wrapper for the search bar
const SearchWrapper = styled(Box)(({ theme }) => ({
    position: 'relative',
    // borderRadius: theme.shape.borderRadius,
    borderRadius: 10,
    // backgroundColor: alpha(theme.palette.common.black, 0.05),
    backgroundColor: "#fff",
    '&:hover': {
        // backgroundColor: alpha(theme.palette.common.black, 0.1),
        backgroundColor: "#fff",
    },
    marginLeft: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 2),
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
    marginLeft: theme.spacing(1),
    flex: 1,
    width: '100%',
    '& input': {
        padding: theme.spacing(1),
    },
}));


// Client Component
function SearchInput() {
    const searchParams = useSearchParams();

    return (

    <SearchWrapper>
        <SearchIcon type={"submit"} color="action" />
            <StyledInput
                name={"term"}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                defaultValue={searchParams.get("term") || ""}
            />
    </SearchWrapper>
    );
}

export default SearchInput;

