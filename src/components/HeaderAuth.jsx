"use client"

import React, {Suspense} from 'react';
import {Box, InputBase, Paper, Typography, Button, Container, LinearProgress} from "@mui/material";
import Image from 'next/image';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from"next/link"
import {signIn, signOut, useSession} from "next-auth/react";
import * as actions from"@/app/actions/index"
import SearchInput from "@/components/SearchInput";
import logoGif from "../../public/assets/gifs/logo.gif"


function HeaderAuth() {

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
                        <Image src={logoGif} alt="Logo" width={50} height={50} />
                        <Typography variant="h6" component="span">MyBrand</Typography>
                    </Box>

                    {/* Search Bar */}
                    <Box
                        component="form"
                        action={actions.search}
                        sx={{
                            flex: 1,
                            maxWidth: 400,
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "#fff",
                            px: 2,
                            borderRadius: 10,
                        }}
                    >
                        {/*<InputBase*/}
                        {/*    name=""*/}
                        {/*    placeholder="Search…"*/}
                        {/*    fullWidth*/}
                        {/*    inputProps={{ "aria-label": "search" }}*/}
                        {/*/>*/}
                        <Suspense fallback={<LinearProgress/>}>
                            <SearchInput />
                        </Suspense>

                        {/*<Button type={"submit"}>OK</Button>*/}


                    </Box>

                    {/* Auth Buttons */}
                    <Box className={"relative group "} sx={{ display: "flex ", gap: 1 }}>
                        {session?.data?.user? (
                            <div className={" relative "}>
                                <AccountCircleIcon className={" "} fontSize={"large"}/>


                                {/* Dropdown Menu */}
                                <div className="absolute right-0 hidden  group-hover:block group-focus-within:block bg-white border border-gray-200 rounded-md shadow-md w-40 mt-2">
                                    <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                                      <Link href={"/profile"} >View Profile</Link>
                                    </div>
                                    <form action={signOut} className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                                        <Button className={""} type={"submit"}>Sign Out</Button>
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

export default HeaderAuth;