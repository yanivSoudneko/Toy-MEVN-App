<template>
	<div class="signup">
		<h1>Register</h1>
		<form @submit.prevent="submit" class="flex columns">
			<input type="text" v-model="user.fname" placeholder="First name" />
			<input type="text" v-model="user.lname" placeholder="Given name" />
			<input type="text" v-model="user.username" placeholder="Username" />
			<input
				type="password"
				v-model="user.password"
				placeholder="password"
			/>
			<button>Sign up</button>
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
	name: "Signup",
	data() {
		return {
			user: {
				fname: "fname2",
				lname: "lname2",
				username: "username2",
				password: "123456789",
			},
		};
	},
	methods: {
		submit() {
			const user = this.user;
			console.log({ user: this.user });
			var errFlag = false;
			for (const key in user) {
				if (user[key] === "") {
					this.$toast.open({
						message: key + " is empty",
						type: "error",
					});
					errFlag = true;
				}
			}
			if (errFlag) return;

			this.$store
				.dispatch({ type: "user/signup", user: this.user })
				.then((res) => {
					if (this.error) {
						this.$store.commit({ type: "user/setError" });
						return;
					}
					this.$router.push("/");
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

