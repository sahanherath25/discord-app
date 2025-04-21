// TODO: Get list of posts into this component somehow
import {getAllPosts} from "@/app/actions";
import Link from "next/link";
import {notFound} from "next/navigation";

export async  function PostList({fetchData}) {

    const posts=await fetchData();

    // const posts=await getAllPosts();

    console.log("POST I RECEVIED FOR MACTION",posts);

    if(!posts){
        notFound()()
    }

    return (
        <div>
            {posts.map((post, index) => (
                <div key={post.id} className="border rounded p-2 w-[80%] my-2">
                    <Link href={`/topics/${post.topic.slug}/posts/${post.id}`}>
                        <h3 className="text-lg font-bold">{post.title}</h3>
                        <div className="flex flex-row gap-8">
                            <p className="text-xs text-gray-400">By {post.user.name}</p>
                            <p className="text-xs text-gray-400">
                                {post._count.comments} comments
                            </p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )

    // const renderedPosts = posts.map((post) => {
    //     const topicSlug = post.topic.slug;
    //
    //
    //     <div key={post.id} className="border rounded p-2">
    //         <Link href={paths.postShow(topicSlug, post.id)}>
    //             <h3 className="text-lg font-bold">{post.title}</h3>
    //             <div className="flex flex-row gap-8">
    //                 <p className="text-xs text-gray-400">By {post.user.name}</p>
    //                 <p className="text-xs text-gray-400">
    //                     {post._count.comments} comments
    //                 </p>
    //             </div>
    //         </Link>
    //     </div>
    //
    // });
}

export default PostList;
