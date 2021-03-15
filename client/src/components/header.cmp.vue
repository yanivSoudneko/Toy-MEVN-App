<template>
	<div class="nav-bar flex j-between">
		<div class="logo">Fucking Logo</div>
		<div class="nav-menu flex">
			<!-- show always -->
			<template>
				<router-link active-class="active" to="/"> Home </router-link>
				<router-link active-class="active" to="/toys">
					Toys
				</router-link>
				<router-link v-if="user" active-class="active" to="/about">
					About
				</router-link>
			</template>
			<!-- if user -->
			<template v-if="!user">
				<router-link active-class="active" to="/login">
					Login
				</router-link>
				<router-link active-class="active" to="/signup">
					Signup
				</router-link>
			</template>
			<!-- if user is null -->
			<template v-else>
				<router-link
					active-class="active"
					to="/login"
					@click.native="logout"
				>
					Logout
				</router-link>
			</template>
		</div>
	</div>
</template>



<script>
export default {
	name: "NavBar",
	computed: {
		user() {
			return this.$store.getters["user/user"];
		},
	},
	methods: {
		logout() {
			this.$store.dispatch({ type: "user/logout" });
		},
	},
};
</script>