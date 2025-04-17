import React from 'react';
import {getAllTopics} from "@/app/actions";
import Link from "next/link";
import {Button} from "@mui/material";


async function TopicsList() {

    const data=await getAllTopics();

    console.log("DATAT TOPICS ",data)

    return (
        <div className="topics-list mt-4" style={{display: 'flex', flexWrap: 'wrap', gap: '12px'}}>
            {data.map((topic) => (
                <Link key={topic.id} href={`/topics/${topic.slug}`} passHref>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#FFA955',
                            color: '#fff',
                            borderRadius: '12px',
                            padding: '8px 20px',
                            fontWeight: 'bold',
                            textTransform: 'capitalize',
                            '&:hover': {
                                backgroundColor: '#ff9800',
                            },
                        }}
                    >
                        {topic.slug}
                    </Button>
                </Link>
            ))}
        </div>
    );
}

export default TopicsList;