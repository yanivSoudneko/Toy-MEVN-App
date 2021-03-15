<template>
	<div class="toy-details" v-if="toy">
		<p class="user-name">Hello {{ loggedOrGuest }}</p>
		<h1>{{ toy.name }}</h1>
		<h2>{{ toy.price }}</h2>
		<h2>{{ toy.type }}</h2>
		<h3>{{ toy.createdAt }}</h3>
		<h4>{{ toy.inStock }}</h4>

		<ol>
			<li v-for="(review, idx) in toy.reviews" :key="idx">
				{{ review.content }}
			</li>
		</ol>
		<button @click="$router.push('/toys')">Back</button>
		<button v-if="this.user" @click="$router.push('/chat' + toy._id)">
			Chat
		</button>
	</div>
	<div v-else>loading...</div>
</template>

<style lang="scss">
.toy-details {
	.user-name {
		text-transform: capitalize;
	}
}
</style>

<script>
import { utilService } from "../services/utils.service";
export default {
	name: "Details",
	data() {
		return {
			toyId: null,
			toy: null,
		};
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
	computed: {
		user() {
			return this.$store.getters["user/user"];
		},
		loggedOrGuest() {
			return this.user._id
				? this.user.lname + " " + this.user.fname
				: "Guest";
		},
	},
};
</script>
