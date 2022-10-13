<template>
	<upload-list-q-a @result="handleResult" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UploadListQA from './components/UploadListQA.vue';

export default defineComponent({
	name: 'App',
	components: {
		UploadListQA
	},
	data() {
		return {
			currentList: [] as string[],
		};
	},
	methods: {
		handleResult({ listName, list }: { listName: string; list: string[]}) {
			this.currentList = list;
		}
	}
});
</script>
