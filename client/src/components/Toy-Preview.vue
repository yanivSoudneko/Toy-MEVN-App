<template>
	<div class="toy-preview">
		<h2>{{ toy.name }}</h2>
		<p>
			<span class="currency">$</span>
			<span class="price">{{ toy.price }}</span>
		</p>
		<p class="category">
			{{ toy.type }}
		</p>
		<button class="details">Details</button>
		<button class="edit" v-if="user">Edit</button>
	</div>
</template>

<style scoped></style>

<script>
export default {
	name: "Toy-Preview",
	props: {
		toy: {
			type: Object,
		},
		user: {
			type: Object,
		},
	},
};
</script>