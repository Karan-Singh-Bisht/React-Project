import React from "react";
import { useState } from "react";
import authService from "../appWrite/auth_service";
import { useNavigate } from "react-router-dom";
import { login } from "../store/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { Button, Logo, Input } from './index';
import { useForm } from "react-hook-form";

function Signup() {
	const navigate = useNavigate();
	const [error, setError] = useState("");
	const dispatch = useDispatch();
	const { register, handleSubmit } = useForm();

	const create = async (data) => {
		setError("");
		try {
			const userData = await authService.createAccount(data);
			if (userData) {
				const userData = await authService.getCurrentUser();
				if (userData) dispatch(login(userData));
				navigate("/");
			}
		} catch (error) {
			setError(error);
		}
	};

	return (
		<div className="flex items-center justify-center">
			<div
				className={
					"mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black"
				}
			>
				<div className="mb-2 flex justify-center">
					<span className="inline-block w-full max-w-[100px]">
						<Logo width="100%" />
					</span>
				</div>
				<h2 className="text-center text-2xl font-bold leading-tight">
					Sign up to create an account
				</h2>
				<p className="mt-2 text-center text-base text-black/60">
					Already have any account?&nbsp;
					<Link
						to="/login"
						className="font-medium text-primary transition-all duration-200 hover:underline"
					>
						Sign In
					</Link>
				</p>
				{error && <p className="text-red-600 mt-8 text-center">{error}</p>}
				<form onSubmit={handleSubmit(create)}>
					<div className="space-y-5">
						<Input
							label="Full Name"
							placeholder="Enter your full name"
							{...register("name", {
								required: true,
								minLength: {
									value: 3,
									message: "Name must be at least 3 characters",
								},
							})}
						/>
						<Input
							label="Email"
							placeholder="Enter your email"
							type="email"
							{...register("email", {
								required: true,
								validate: {
									matchPatern: (value) =>
										/^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) ||
										"Invalid email address",
								},
							})}
						/>
						<Input
							label="Password"
							placeholder="Enter your password"
							type="password"
							{...register("password", {
								required: true,
								minLength: {
									value: 6,
									message: "Password must be at least 6 characters",
								},
							})}
						/>
						<Button type="submit" className="w-full">
							Create Account
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Signup;
