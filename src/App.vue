<template>
	<upload-list-q-a v-if="!isShowTest" @result="handleResult" />
	<test-q-a v-if="isShowTest" :list="currentList" @finish="handleFinish" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TestQA from './components/TestQA.vue';
import UploadListQA from './components/UploadListQA.vue';

export default defineComponent({
	name: 'App',

	components: {
		UploadListQA,
		TestQA
	},

	data(): {
		currentList: QA[],
	} {
		return {
			currentList: [],
		};
	},

	computed: {
		isShowTest(): boolean {
			return this.currentList.length > 0;
		},
	},

	methods: {
		handleResult({ listName, list }: { listName: string; list: QA[]}):void {
			this.currentList = list;
		},

		handleFinish():void {
			this.currentList = [];
		},
	},
});
</script>
