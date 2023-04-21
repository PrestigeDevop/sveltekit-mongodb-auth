import { register_user } from "./register";
import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const email = (data.get("email") as string).toLowerCase();
		const password = data.get("password") as string;
		const name = data.get("name") as string;

		const user = { email, name };

		const { error } = await register_user(email, password, name);

		if (error) {
			return fail(400, { user, error });
		} else {
			const message = "Registration successful! You can now login.";
			return { user, message };
		}
	}
};
