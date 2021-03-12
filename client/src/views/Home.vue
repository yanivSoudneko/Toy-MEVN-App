<template>
	<div class="home">Hello {{ user.fname }}</div>
</template>

<script>
export default {
	name: "Home",
	data() {
		return { user: { fname: "Meep" } };
	},
	components: {},
};
</script>
