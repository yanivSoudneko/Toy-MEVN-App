<template>
	<section class="toy-edit">
		<form class="flex columns" @submit.prevent="saveToy" v-if="toy">
			<h3>Update toy:{{ toy.name }}</h3>
			<input type="text" v-model="toy.name" />
			<input type="number" v-model="toy.price" />
			<input type="text" v-model="toy.type" />
			<button>Save</button>
		</form>
		<div v-else>loading...</div>
	</section>
</template>

<style lang="scss">
.toy-edit {
	form {
		h3 {
			font-weight: bold;
		}
	}
}
</style>

<script>
import { utilService } from "../services/utils.service";
export default {
	name: "Edit",
	data() {
		return {
			toyId: null,
			toy: null,
		};
	},
	methods: {
		saveToy() {
			this.$store
				.dispatch({ type: "toy/updateToy", toy: this.toy })
				.then((res) => {
					this.$router.push("/toys");
				})
				.catch((err) => {
					console.log("EDIT FAILED:", err);
				});
		},
	},
	created() {
		this.toyId = this.$route.params.toyId;
		if (!this.toyId) {
			this.toyId = utilService.historyModeFix();
		}
		this.$store
			.dispatch({
				type: "toy/getById",
				toyId: this.toyId,
			})
			.then((toy) => {
				this.toy = toy;
			});
	},
};
</script>
