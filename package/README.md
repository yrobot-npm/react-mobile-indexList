# @yrobot/react-mobile-indexlist

## 特性

1. 根据传入数据自动生成字母索引
2. 点击索引自动滚到对应行
3. 开放onRow钩子，用户可以自定义行展示
4. 用户可以自如的在IndexList进行选中状态的管理

## 查看 demo

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gfvc9ngkrqg30cg0qo1kf.gif)
注意使用浏览器的手机模式查看[DEMO](https://yrobot.github.io/react-mobile-indexlist/demo/dist/index.html)

## 使用

1. 安装`@yrobot/react-mobile-indexlist`

```
yarn add @yrobot/react-mobile-indexlist
```

2. 引入组件并使用

```
import IndexList from '@yrobot/react-mobile-indexlist'
import '@yrobot/react-mobile-indexlist/lib/index.css'

const mockData = [
	'赵',
	'钱',
	'孙',
	'李',
	'周',
	'吴',
	'郑',
	'王',
	'冯',
	'陈',
	'褚',
	'卫',
	'蒋',
	'沈',
	'韩',
	'杨',
	'朱',
	'秦',
	'尤',
	'许',
	'何',
	'吕',
	'施',
	'张',
	'孔',
	'曹',
	'严',
	'卫',
	'蒋',
	'沈',
	'韩',
	'杨',
	'朱',
	'秦',
	'尤',
	'许',
	'何',
	'吕',
	'施',
	'张',
	'孔',
	'曹',
	'严',
	'华',
].map((v, i) => ({
	name: v + i + 'xx',
	id: i,
}))

const indexKey = 'name'

<IndexList
	// WXList={WXList} // 小程序使用时需要配合WXList(需要的话可以提issues)
	list={mockData} // 传入数据列表 [object]
	indexKey={indexKey} // 数据对象中需要排序的字段索引，mock数据里是name字段
	onChange={(v) => { // 用户点击某一行的回调, 返回此行的数据对象
		console.log(v)
	}}
	onRow={(record, index) => ( // 每一行数据的渲染方式，默认直接展示indexKey的值： (每一行的数据对象, 数据在列表的索引)=> jsx
		<div className="index-list-line-holder">
			<div className="index-list-item-name">{record[indexKey]}</div>
			<div className="item-select-status-box">
				<div
					className={'select-status' + (index % 2 ? ' false' : ' true')}
				></div>
			</div>
		</div>
	)}
/>

```
