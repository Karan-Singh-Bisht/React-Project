import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
	const authStatus = useSelector((state) => state.auth.status);
	const navigate = useNavigate();
	const navItems = [
		{
			name: "Home",
			slug: "/",
			active: true,
		},
		{
			name: "Login",
			slug: "/login",
			active: !authStatus,
		},
		{
			name: "Signup",
			slug: "/signup",
			active: !authStatus,
		},
		{
			name: "All Posts",
			slug: "/all-posts",
			active: authStatus,
		},
		{
			name: "Add Post",
			slug: "/add-post",
			active: authStatus,
		},
	];

	return (
		<header className="py-3 shadow bg-gray-400">
			<Container>
				<nav className="flex">
					<div className="mr-4">
						<Link to="/">
							<Logo width="70px" />
						</Link>
					</div>
					<ul className="flex ml-auto">
						{navItems.map((item) =>
							item.active ? (
								<li key={item.name}>
									<button
										className="px-3 py-2 rounded-md text-white bg-black"
										onClick={() => navigate(item.slug)}
									>
										{item.name}
									</button>
								</li>
							) : null
						)}
            {authStatus && ( //The logout btn will show only when authStatus is true.     This is a common syntax
              <li>
                <LogoutBtn />
              </li>
            )}         
					</ul>
				</nav>
			</Container>
		</header>
	);
}

export default Header;
