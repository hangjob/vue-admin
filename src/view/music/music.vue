<template>
	<div class="music">
		<div class="music__main">
			<div class="music__main__cover" @click="play">
				<img src="@/assets/meet.jpg" />
			</div>
			<div class="music__main__timeBar">
				<div class="time">
					<span>{{ realMusicTime }}</span>
					<span>{{ totalMusicTime }}</span>
				</div>
				<div class="bar">
					<div class="bar__slid" ref="slid"></div>
				</div>
			</div>
		</div>
		<div class="music__mask"></div>
		<audio
			ref="music"
			src="https://music.163.com/song/media/outer/url?id=1369798757.mp3"
		></audio>
	</div>
</template>
<script>
export default {
	data() {
		return {
			isPlay: false,
			realMusicTime: "00:00",
			totalMusicTime: "00:00"
		};
	},
	created() {},
	mounted() {
		this.watchMusicTime();
	},
	methods: {
		play() {
			if (this.music) {
				if (this.music.paused) {
					this.music.play();
				} else {
					this.music.pause();
				}
			}
		},
		// 处理时间
		handlMusicTime() {
			//用秒数来显示当前播放进度
			let timeDisplay = Math.floor(this.music.currentTime); //获取实时时间
			//分钟
			let minute = parseInt(timeDisplay / 60);
			if (minute < 10) {
				minute = "0" + minute;
			}
			//秒
			let second = Math.round(timeDisplay % 60);
			if (second < 10) {
				second = "0" + second;
			}
			this.realMusicTime = minute + ":" + second;
			console.log(this.realMusicTime);
		},
		// 处理进度条
		handMusicBar() {
			let slid = this.$refs.slid;
			let duration = this.music.duration;
			let x = ((this.music.currentTime / duration) * 100).toFixed(2) + "%";
			slid.style.width = x;
			// console.log(x)
		},
		watchMusicTime() {
			this.music = this.$refs.music;
			//使用事件监听方式捕捉事件
			this.music.addEventListener(
				"timeupdate",
				() => {
					this.handlMusicTime();
					this.handMusicBar();
				},
				false
			);
			// 捕获音频文件已准备完毕
			this.music.oncanplay = () => {
				let time = this.music.duration;
				//分钟
				let minutes = parseInt(time / 60);
				if (minutes < 10) {
					minutes = "0" + minutes;
				}
				//秒
				let seconds = Math.round(time % 60);
				if (seconds < 10) {
					seconds = "0" + seconds;
				}
				this.totalMusicTime = minutes + "：" + seconds;
			};
		}
	}
};
</script>
<style lang="less">
@keyframes musicRotate {
	from {
		transform: rotate(0);
	}
	to {
		transform: rotate(360);
	}
}
.music {
	min-height: 200px;
	width: 500px;
	margin: 0 auto;
	box-shadow: 0px 5px 10px 20px rgba(0, 0, 0, 0.02);
	border-radius: 15px;
	position: relative;
	padding: 30px;
	box-sizing: border-box;
	overflow: hidden;
	&__main {
		display: flex;
		&__cover {
			width: 80px;
			height: 80px;
			overflow: hidden;
			border-radius: 50%;
            background-color: #dddddd;
			img {
				width: 100%;
				height: 100%;
			}
		}
		&__timeBar {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			padding-left: 20px;
			box-sizing: border-box;
			.time {
				display: flex;
				justify-content: space-between;
			}
			.bar {
				height: 8px;
				background-color: #cec5c5;
				border-radius: 8px;
				position: relative;
				&__slid {
					position: absolute;
					left: 0;
					top: 0;
					background-color: #dcd3d0;
					height: 100%;
					width: 0;
					transition: width 0.3s;
				}
			}
		}
	}
	&__mask {
		background-image: url("../../assets/meet.jpg");
		z-index: -2;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: 50%;
		filter: blur(15px);
		opacity: 0.25;
		transition: all 0.8s;
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		&::before {
			position: absolute;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			z-index: -1;
			content: "";
			background-color: rgba(0, 0, 0, 0.1);
		}
	}
}
</style>