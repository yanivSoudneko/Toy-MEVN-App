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
export default {
	name: "Login",
	data() {
		return { user: { password: "123456", username: "admin_yaniv" } };
	},
	methods: {
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
			this.$store
				.dispatch({ type: "user/login", user: this.user })
				.then((res) => {
					if (this.error) {
						this.$store.commit({ type: "user/setError" });
						return;
					}
					this.$router.push("/toys");
				});
		},
	},
	computed: {
		error() {
			return this.$store.getters["user/error"];
		},
	},
};
</script>