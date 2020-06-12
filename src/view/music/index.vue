<template>
	<div class="waitingOpening">
		<div class="waitingOpening__voice">
			<audio id="bgMusic" ref="bgMusic">
				<source src="http://mp7.t57.cn/2020/jy/5/XJU.m4a" type="audio/mp3" />
				<source src="http://mp7.t57.cn/2020/jy/5/XJU.m4a" type="audio/ogg" />
			</audio>
			<el-button
				:type="isPlay ? 'success' : 'info'"
				@click="play"
				:icon="isPlay ? 'el-icon-mic' : 'el-icon-microphone'"
				>播放</el-button
			>
		</div>
		<div class="waitingOpening__percentage" ref="perBar">
			<div class="waitingOpening__percentage__main">
				<div class="sliding-bg" @click="currentTime"></div>
				<div class="sliding" ref="sliding" @click="currentTime"></div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
    },
	created() {},
	mounted() {
		this.bgMusic = this.$refs.bgMusic;
		this.bgMusic.pause();
	},
	methods: {
		play() {
			if (this.isPlay) {
				cancelAnimationFrame(this.timer);
				this.bgMusic.pause();
			} else {
				this.bgMusic.play();
				this.changeProgress();
			}
			this.isPlay = !this.isPlay;
		},
		changeProgress() {
			cancelAnimationFrame(this.timer);
			let that = this;
			this.timer = requestAnimationFrame(function go() {
				const numbers = that.bgMusic.currentTime / that.bgMusic.duration;
				let perNumber = (numbers * 100).toFixed(2);
				if (parseInt(perNumber) >= 100) {
					that.isPlay = false;
					cancelAnimationFrame(that.timer);
				} else {
					that.$refs.sliding.style.width = perNumber + "%";
					that.timer = requestAnimationFrame(go);
				}
			});
		},
		currentTime(e) {
			this.bgMusic.pause();
			cancelAnimationFrame(this.timer);
			const rect = e.target.getBoundingClientRect();
			let length = e.pageX - rect.left;
			let percent = length / this.$refs.perBar.offsetWidth;
			this.$refs.sliding.style.width = (percent * 100).toFixed(2) + "%";
			this.bgMusic.currentTime = percent * this.bgMusic.duration; // 计算播放时间 位置百分比*总时间
			this.$nextTick().then(res => {
				this.bgMusic.play();
				this.isPlay = true;
				setTimeout(() => {
					this.changeProgress();
				}, 400);
			});
		}
	}
};
</script>
<style lang="less" scoped>
.waitingOpening {
	&__percentage {
		position: absolute;
		bottom: 0;
		width: 100%;
		left: 0;
		&__main {
			height: 8px;
			width: 100%;
            position: relative;
            cursor: pointer;
			.sliding-bg {
				background-color: #ebeef5;
				height: 8px;
			}
			.sliding {
				position: absolute;
				left: 0;
				top: 0;
				width: 0;
				height: 8px;
				background-color: #409eff;
				transition: width 0.3s;
			}
		}
	}
}
</style>