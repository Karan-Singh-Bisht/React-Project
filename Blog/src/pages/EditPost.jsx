import React, { useEffect, useState } from "react";
import { Container, Postform } from "../components";
import appWriteService from '../appWrite/config'
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
	const [post, setPost] = useState(null);
	const { slug } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (slug) {
			appWriteService.getUniquePost(slug).then((post) => {
				if (post) {
					setPost(post);
				}
			});
		} else {
			navigate("/");
		}
	}, [slug, navigate]);

	return post?<div className="py-8"> 
    <Container>
        <Postform post={post}/>
    </Container></div>:"";
}

export default EditPost;
