import React, {useState,useEffect} from 'react'
import { Container,Postcard } from '../components/index';
import appWriteService from "../appWrite/config";

function AllPost() {
    const [posts,setPosts] = useState([]);
    useEffect(() => {
        appWriteService.getAllPosts([]).then((posts) => {
            if(posts){
                setPosts(posts.documents);
            }
        });
    },[])
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <Postcard post={post}/>
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPost