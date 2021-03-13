<template>
	<div class="toys">
		<h1>Toys</h1>
		<div v-if="toys" class="toy-list grid">
			<toy-preview
				v-for="toy in toys"
				:key="toy._id"
				:toy="toy"
				:user="user"
			></toy-preview>
		</div>
	</div>
</template>

<style scoped></style>

<script>
import toyPreview from "../components/Toy-Preview";
export default {
	name: "Toys",
	computed: {
		toys() {
			return this.$store.getters["toy/toys"];
		},
		user() {
			return this.$store.getters["user/user"];
		},
	},
	created() {
		this.$store.dispatch({ type: "toy/loadToys" });
	},
	components: {
		toyPreview,
	},
};
</script>