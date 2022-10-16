<template>
	<select v-model="selectList" @change="handleChange">
		<option disabled value="">Выберите</option>
		<option v-for="item in allLists" :key="item.name" :value="item.name">
			{{item.name}}
		</option>
	</select>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		allLists: {
			type: Array as () => QAList[],
			default: () => [],
		},
		modelValue: {
			type: String,
			default: '',
		},
	},

	data(): {
		selectList: string,
	} {
		return {
			selectList: this.modelValue,
		};
	},

	methods: {
		handleChange() {
			this.$emit('update:model-value', this.selectList);
		},
	},
});
</script>