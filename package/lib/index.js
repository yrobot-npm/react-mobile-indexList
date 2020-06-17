import React, { useRef } from 'react';
import pinyin from 'pyfl';

/**
 * @author Yrobot
 * @time 2020.6.17
 */
var ID_PREFIX = 'indexlist';
var LIST_TOP_ID = 'TopID';

var preFixId = function preFixId(id) {
  return ID_PREFIX + id;
};

var Guide = function Guide(_ref) {
  var _ref$indexList = _ref.indexList,
      indexList = _ref$indexList === void 0 ? [] : _ref$indexList,
      _ref$scrollTo = _ref.scrollTo,
      scrollTo = _ref$scrollTo === void 0 ? function () {} : _ref$scrollTo;
  var topIcon = '↑';
  return /*#__PURE__*/React.createElement("div", {
    className: "index-list-guide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "index-list-guide-item",
    onClick: function onClick() {
      scrollTo(LIST_TOP_ID);
    }
  }, topIcon), /*#__PURE__*/React.createElement("div", {
    className: "index-list-guide-dividing"
  }), indexList.map(function (v) {
    return /*#__PURE__*/React.createElement("div", {
      className: "index-list-guide-item",
      key: v,
      onClick: function onClick() {
        scrollTo(v);
      }
    }, v);
  }));
};

var List = function List(_ref2) {
  var children = _ref2.children,
      listRef = _ref2.listRef;
  return /*#__PURE__*/React.createElement("div", {
    className: "h5-srcoll-hodler",
    red: listRef
  }, children);
};

var doList = function doList(list, key) {
  var listData = {};
  list.map(function (v) {
    var firstChar = v[key].substr(0, 1);
    var indexKey = pinyin(firstChar)[0];

    if (listData[indexKey]) {
      listData[indexKey].push(v);
    } else {
      listData[indexKey] = [v];
    }
  });
  var indexList = Object.keys(listData).sort(); // 排序字幕组内部展示顺序

  Object.values(listData).map(function (v) {
    v = v.sort(function (a, b) {
      return ('' + a[key]).localeCompare(b[key]);
    });
  });
  return {
    indexList: indexList,
    listData: listData
  };
};

var defaultLineFunc = function defaultLineFunc(v, key) {
  return /*#__PURE__*/React.createElement("div", {
    className: "default-index-list-line"
  }, v[key]);
};

var IndexList = function IndexList(_ref3) {
  var _ref3$list = _ref3.list,
      list = _ref3$list === void 0 ? [] : _ref3$list,
      _ref3$indexKey = _ref3.indexKey,
      indexKey = _ref3$indexKey === void 0 ? 'index' : _ref3$indexKey,
      _ref3$onChange = _ref3.onChange,
      onChange = _ref3$onChange === void 0 ? function () {} : _ref3$onChange,
      _ref3$onRow = _ref3.onRow,
      onRow = _ref3$onRow === void 0 ? function (record, index) {
    return defaultLineFunc(record, indexKey);
  } : _ref3$onRow,
      WXList = _ref3.WXList;

  if (process.env.isMiniprogram && !WXList) {
    console.error("inedxList \u5728\u5C0F\u7A0B\u5E8F\u73AF\u5883\u4E2D\u5FC5\u987B\u914D\u5408WXList\u4F7F\u7528");
    return null;
  }

  var _doList = doList(list, indexKey),
      indexList = _doList.indexList,
      listData = _doList.listData;

  var listRef = useRef(null);
  var ListView = process.env.isMiniprogram ? WXList : List;

  var scrollTo = function scrollTo(id) {
    var ID = preFixId(id);

    if (process.env.isMiniprogram) {
      // MINA
      listRef.current.scrollIntoView(ID);
    } else {
      // web
      var anchorElement = document.getElementById(ID);

      if (anchorElement) {
        anchorElement.scrollIntoView({
          block: 'start',
          behavior: 'smooth'
        });
      } else {
        console.error('找不到ID：' + ID);
      }
    }
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "Yrobot-index-list"
  }, /*#__PURE__*/React.createElement(ListView, {
    listRef: listRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "index-list-main"
  }, /*#__PURE__*/React.createElement("div", {
    id: preFixId(LIST_TOP_ID),
    className: "index-list-top-item"
  }), indexList.map(function (v) {
    var indexedDataList = listData[v] || [];
    return /*#__PURE__*/React.createElement("div", {
      className: "index-list-item",
      key: v
    }, /*#__PURE__*/React.createElement("div", {
      className: "index-list-item-head",
      id: preFixId(v)
    }, v), indexedDataList.map(function (v, i) {
      return /*#__PURE__*/React.createElement("div", {
        className: "index-list-item-line",
        key: i,
        onClick: function onClick() {
          onChange(v);
        }
      }, onRow(v, i));
    }));
  }))), /*#__PURE__*/React.createElement(Guide, {
    indexList: indexList,
    scrollTo: scrollTo
  }));
};

export default IndexList;
