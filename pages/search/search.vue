<template>
	<view>
		<view class="header">
			<view class="input-box">
				<view class="icon search"></view>
				<input placeholder="机顶盒" placeholder-style="color:#c0c0c0;" v-model="inputVal" />
			</view>
			<button type="warn" size="mini" class="right-button" @tap="search">搜索</button>
		</view>
		<view class="main">
			<view class="recentSearch">
				<view class="top">
					<text class="title">最近搜索</text>
					<text class="icon shanchu"></text>
				</view>
				<view class="content">
					<text class="card" v-for="(item, index) in recentList" :key="index">{{ item }}</text>
				</view>
			</view>
			<view class="hotSearch">
				<view class="top">
					<text class="title">热门搜索</text>
					<text class="shanchu">隐藏</text>
				</view>
				<view class="content"><text class="card">宝可梦剑盾</text></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			inputVal: '',
			recentList: [],
			hotList: []
		};
	},
	methods: {
		// 初始化数据
		initData() {
			this.recentList = wx.getStorageSync('RECENT_LIST') || [];
			this.hotList = wx.getStorageSync('HOT_LIST') || [];
		},
		// 点击搜索 跳转页面 同时给storage添加历史记录
		search() {
			const val = this.inputVal.trim();
			// 变更list
			if (val) {
				const index = this.recentList.findIndex(item => item === val);
				if (index >= 0) {
					this.recentList.splice(index, 1);
				}
				this.recentList.unshift(val);
				this.inputVal = '';
				wx.setStorageSync('RECENT_LIST', this.recentList);
				// 发送请求 跳转的逻辑
			} else {
				wx.showToast({
					title: '请勿输入空信息',
					icon: 'error'
				});
			}
		}
	},
	mounted() {
		this.initData();
	}
};
</script>

<style lang="scss">
.header {
	margin-top: 20upx;
	height: 80upx;
	border-bottom: 3upx solid #eee;
	display: flex;
	.input-box {
		margin-left: 20upx;
		width: 75%;
		height: 60upx;
		background-color: #f5f5f5;
		border-radius: 30upx;
		position: relative;
		display: flex;
		align-items: center;
		.icon {
			display: flex;
			align-items: center;
			position: absolute;
			top: 0;
			left: 30upx;
			width: 60upx;
			height: 60upx;
			font-size: 34upx;
			color: #c0c0c0;
		}
		input {
			padding-left: 128upx;
			height: 28upx;
			font-size: 28upx;
		}
	}
	.right-button {
		margin-left: 10upx;
		height: 60upx;
	}
}
.main {
	padding: 20upx 30upx 0;
	.recentSearch,
	.hotSearch {
		.top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.title {
				font-size: 38upx;
			}
			.shanchu {
				font-size: 35upx;
				color: #999;
			}
		}
	}
	.content {
		display: flex;
		flex-wrap: wrap;
		.card {
			height: 30upx;
			line-height: 30upx;
			background-color: #eee;
			padding: 10upx;
			font-size: 28upx;
			color: #999;
			border-radius: 10upx;
			margin: 10upx 20upx 10upx 0;
		}
	}
}
</style>
