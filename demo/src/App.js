import React from 'react'
import './App.css'
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
	'况',
	'况yrobot',
	'yrobot况',
	'张明',
].map((v, i) => ({
	name: v + i + 'xx',
	id: i,
}))

function App() {
	const indexKey = 'name'
	const selectAll = false
	return (
		<div className="app">
			<IndexList
				// WXList={WXList}
				list={mockData}
				indexKey={indexKey}
				onChange={(v) => {
					console.log(v)
				}}
				// caseSensitive={true}
				onTop={() => (
					<div className="index-list-line-holder">
						<div className="index-list-item-name">全部（默认）</div>
						<div className="item-select-status-box">
							<div
								className={'select-status' + (selectAll ? ' true' : ' false')}
							></div>
						</div>
					</div>
				)}
				onBottom={() => (
					<div className="index-list-line-holder">
						<div className="index-list-item-name">onBottom</div>
						<div className="item-select-status-box"></div>
					</div>
				)}
				onRow={(record, index) => (
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
		</div>
	)
}

export default App
