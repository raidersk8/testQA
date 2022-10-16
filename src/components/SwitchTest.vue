<template>
	<button @click="handleClick" :disabled="isDisable">{{text}}</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		modelValue: {
			type: Boolean,
			default: false,
		},

		isDisable: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		text(): string {
			return this.modelValue ? 'stop' : 'start';
		},
	},

	methods: {
		handleClick():void {
			this.$emit('update:model-value', !this.modelValue);
		},
	},
});
</script>
