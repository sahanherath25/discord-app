//Todo Exporting Other function from server

import {signIn, signOut} from "next-auth/react";
import {z} from "zod";

// export    {signInUser  } from "./sign-in"
//
// export {signOutUser} from "./sign-out"
//
// export { default as createComment } from './create-comment';

export {createTopic} from './create-topic';
export {createComment} from './create-comment';
export {createPost} from './create-post';
export {getAllTopics} from './get-all-topics';
export {getAllPosts} from './get-all-posts';


// export  async function createComment() {
// //     TODO Revalidate Post Show Page
//     return null
// }
//
// export  const createPost = async () => {
// //     TODO Revalidate Topics Show Page
//     return null
//
// }


// export async  function createTopic(formData) {
//
// //     Form Submitted Received
//
//     const name=formData.get("name");
//     const description=formData.get("description");
//     console.log("FORM DATA ",formData)
//
// //     TODO Revalidate Home  Page
//     return null
//
// }
