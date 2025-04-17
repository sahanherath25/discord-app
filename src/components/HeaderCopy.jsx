"use client"

import React from 'react';
import { Box, InputBase, Paper, Typography,Button,Container} from "@mui/material";
import Image from 'next/image';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import {signIn, signOut, useSession} from "next-auth/react";


function Header() {

    const session= useSession();

    console.log("Session is log",session)



    return (
        <Paper elevation={0} sx={{ borderBottom: "1px solid #ddd", backgroundColor: "#522546" }}>
            <Container maxWidth="lg">
                <Box
                    component="header"
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        py: 2,
                        gap: 2,
                        flexWrap: "wrap",
                    }}
                >
                    {/* Logo */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Image src="/logo.png" alt="Logo" width={40} height={40} />
                        <Typography variant="h6" component="span">MyBrand</Typography>
                    </Box>

                    {/* Search Bar */}
                    <Box
                        component="form"
                        action="/search"
                        method="GET"
                        sx={{
                            flex: 1,
                            maxWidth: 400,
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "#f5f5f5",
                            px: 2,
                            borderRadius: 10,
                        }}
                    >
                        <InputBase
                            name="q"
                            placeholder="Search…"
                            fullWidth
                            inputProps={{ "aria-label": "search" }}
                        />
                    </Box>

                    {/* Auth Buttons */}
                    <Box className={"relative group "} sx={{ display: "flex ", gap: 1 }}>
                        {session?.data?.user? (
                            <div className={" relative "}>
                                <AccountCircleIcon className={" "} fontSize={"large"}/>
                                {/* Dropdown Menu */}
                                <div className="absolute right-0 hidden  group-hover:block group-focus-within:block bg-white border border-gray-200 rounded-md shadow-md w-40 mt-2">
                                    <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                                        View Profile
                                    </div>
                                    <form className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                                        Sign Out
                                    </form>
                                </div>
                            </div>


                        ) : (
                            <>
                                <form  action={signIn}>
                                    <Button type="submit" variant="outlined">Sign In</Button>
                                </form>
                                <form  action={signOut}>
                                    <Button type="submit" variant="contained">Sign Out</Button>
                                </form>
                            </>

                        )}
                    </Box>
                </Box>
            </Container>
        </Paper>
    );

}

export default Header;