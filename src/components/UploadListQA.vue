<template>
	<div class="upload-list-qa">
		<input type="file" hidden="true" ref="file" @change="onChange">
		<button class="button" @click="handleClick">Загрузите файл</button>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import parseQA from '@/api/parseQA';
import '@/scss/components/upload-list-qa.scss';

export default defineComponent({
	emits: ['result'],
	methods: {
		/**
		 * Реагируем на загрузку файла
		 */
		async onChange(e: any): Promise<void> {
			if (!e.target.files || e.target.files.length === 0) {
				return;
			}
			let file = e.target.files[0];
			let reader: FileReader = new FileReader();
			reader.readAsText(file);
			let promiseLoadFile: Promise<string> = new Promise((resolve) => {
				reader.onload = () => {
					if (reader.readyState === 2 && typeof(reader.result) === 'string') {
						resolve(reader.result);
					}
				};
			});
			let result: string = await promiseLoadFile;
			const parseList:QA[] = parseQA(result.split('\r\n'));
			this.result(file.name, parseList);
		},
		
		/**
		 * Отправляем результат работы компонента
		 */
		result(listName: String, list: QA[]):void {
			this.$emit('result', { 
				listName,
				list,
			});
		},

		handleClick():void {
			if(this.$refs.file instanceof HTMLInputElement) {
				this.$refs.file.click();
			}
		},
	},
});
</script>
