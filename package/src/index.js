/**
 * @author Yrobot
 * @time 2020.6.17
 */
import React, { useRef } from 'react';
import pinyin from 'pyfl';
import './index.less';

const ID_PREFIX = 'indexlist';

const LIST_TOP_ID = 'TopID';

const preFixId = (id) => ID_PREFIX + id;

const Guide = ({ indexList = [], scrollTo = () => {} }) => {
	const topIcon = '↑';
	return (
		<div className='index-list-guide'>
			<div
				className='index-list-guide-item'
				onClick={() => {
					scrollTo(LIST_TOP_ID);
				}}
			>
				{topIcon}
			</div>
			<div className='index-list-guide-dividing'></div>
			{indexList.map((v) => (
				<div
					className='index-list-guide-item'
					key={v}
					onClick={() => {
						scrollTo(v);
					}}
				>
					{v}
				</div>
			))}
		</div>
	);
};

const List = ({ children, listRef }) => (
	<div className='h5-srcoll-hodler' red={listRef}>
		{children}
	</div>
);

const doList = (list, key, caseSensitive) => {
	let listData = {};
	list.map((v) => {
		const firstChar = v[key].substr(0, 1);
		const indexKey = caseSensitive ? pinyin(firstChar)[0] : pinyin(firstChar)[0].toLocaleUpperCase();
		if (listData[indexKey]) {
			listData[indexKey].push(v);
		} else {
			listData[indexKey] = [v];
		}
	});
	const indexList = Object.keys(listData).sort();
	// 排序字幕组内部展示顺序
	Object.values(listData).map((v) => {
		v = v.sort((a, b) => ('' + a[key]).localeCompare(b[key]));
	});
	return {
		indexList,
		listData,
	};
};

const defaultLineFunc = (v, key) => <div className='default-index-list-line'>{v[key]}</div>;

const IndexList = ({
	list = [],
	indexKey = 'index',
	onChange = () => {},
	onRow = (record, index) => defaultLineFunc(record, indexKey),
	onTop,
	onBottom,
	caseSensitive = false,
	WXList,
}) => {
	if (process.env.isMiniprogram && !WXList) {
		console.error(`inedxList 在小程序环境中必须配合WXList使用`);
		return null;
	}

	const { indexList, listData } = doList(list, indexKey, caseSensitive);

	const listRef = useRef(null);

	const ListView = process.env.isMiniprogram ? WXList : List;

	const scrollTo = (id) => {
		const ID = preFixId(id);
		if (process.env.isMiniprogram) {
			// MINA
			listRef.current.scrollIntoView(ID);
		} else {
			// web
			const anchorElement = document.getElementById(ID);
			if (anchorElement) {
				anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
			} else {
				console.error('找不到ID：' + ID);
			}
		}
	};

	return (
		<div
			className='Yrobot-index-list'
			style={{
				position: process.env.isMiniprogram ? 'absolute' : 'relative',
			}}
		>
			<ListView listRef={listRef}>
				<div className='index-list-main'>
					<div id={preFixId(LIST_TOP_ID)} className='index-list-top-item'></div>
					{onTop && onTop()}
					{indexList.map((v) => {
						const indexedDataList = listData[v] || [];
						return (
							<div className='index-list-item' key={v}>
								<div className='index-list-item-head' id={preFixId(v)}>
									{v}
								</div>
								{indexedDataList.map((v, i) => (
									<div
										className='index-list-item-line'
										key={i}
										onClick={() => {
											onChange(v);
										}}
									>
										{onRow(v, i)}
									</div>
								))}
							</div>
						);
					})}
					{onBottom && onBottom()}
				</div>
			</ListView>
			<Guide indexList={indexList} scrollTo={scrollTo} />
		</div>
	);
};
export default IndexList;
