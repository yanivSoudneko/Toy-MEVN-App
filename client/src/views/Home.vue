<template>
	<div class="home">
		Hello <span class="user-data">{{ userName }}</span>
	</div>
</template>

<script>
export default {
	name: "Home",

	computed: {
		userName() {
			return this.user ? this.user.fname : "Guest";
		},
		user() {
			return this.$store.getters["user/user"];
		},
	},
	components: {},
};
</script>
