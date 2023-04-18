import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { login_user } from "./login";

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();

		const email = data.get("email") as string;
		const password = data.get("password") as string;

		const user_data = await login_user(email, password);
		if ("error" in user_data) {
			return fail(500, { email, error: user_data.error });
		} else {
			const { token, user } = user_data;
			const one_day = 60 * 60 * 24;
			cookies.set("auth-token", token, {
				httpOnly: true,
				secure: true,
				sameSite: "strict",
				path: "/",
				maxAge: one_day
			});
			return { user };
		}
	}
};
