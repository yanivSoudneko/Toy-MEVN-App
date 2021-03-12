<template>
	<div class="login">
		<h1>Login</h1>
		<form @submit.prevent="submit" class="flex columns">
			<input type="text" v-model="user.username" placeholder="Username" />
			<input
				type="password"
				v-model="user.password"
				placeholder="password"
			/>
			<button>Login</button>
		</form>
	</div>
</template>
<style lang="scss">
form {
	max-width: 50%;
	margin: 0 auto;
}
</style>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
	name: "Login",
	data() {
		return { user: { password: "3GqrryGN", username: "darkmift" } };
	},
	// computed: {
	// 	...mapState("users", ["users"]),
	// },
	methods: {
		...mapActions(["user/login"]),

		async submit() {
			const user = this.user;
			const errFlag = false;
			if (user.username === "") {
				this.$toast.open({
					message: "username is empty",
					type: "error",
				});
				errFlag = true;
			}
			if (user.password === "") {
				this.$toast.open({
					message: "password is empty",
					type: "error",
				});
				errFlag = true;
			}

			if (errFlag) return;
			try {
				console.log(this.$store);
				this["user/login"]({ user: this.user });
			} catch (error) {
				console.log(
					"🚀 ~ file: Login.vue ~ line 53 ~ submit ~ error",
					error
				);
			}
		},
	},
};
</script>