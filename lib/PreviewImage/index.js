"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _PreviewImage = require("./PreviewImage.less");

var _PreviewImage2 = _interopRequireDefault(_PreviewImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_React$Component) {
  (0, _inherits3.default)(_class, _React$Component);

  function _class() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, _class);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = _class.__proto__ || (0, _getPrototypeOf2.default)(_class)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isShow: true,
      urls: [],
      current: 0,
      imgheight: "683px",
      rotate: "0",
      scaleX: 1,
      imgMoveState: false,
      imgDisX: 0,
      imgDisY: 0,
      imgMarginTop: "0px",
      imgMarginLeft: "0px"
    }, _this.onEndReached = function () {}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(_class, [{
    key: "onClose",
    value: function onClose() {
      this.setState({
        isShow: false
      });
    }
  }, {
    key: "onPreBtn",
    value: function onPreBtn(e) {
      e.stopPropagation();
      var _state = this.state,
          urls = _state.urls,
          current = _state.current;

      if (current > 0) {
        current -= 1;
      } else {
        current = urls.length - 1;
      }
      this.setState({
        current: current,
        rotate: "0",
        scaleX: 1,
        imgDisX: 0,
        imgDisY: 0,
        imgMarginTop: "0px",
        imgMarginLeft: "0px"
      });
    }
  }, {
    key: "onAfterBtn",
    value: function onAfterBtn(e) {
      window.event ? window.event.cancelBubble = true : e.stopPropagation();
      var _state2 = this.state,
          urls = _state2.urls,
          current = _state2.current;

      if (current < urls.length - 1) {
        current += 1;
      } else {
        current = 0;
      }
      this.setState({
        current: current,
        rotate: "0",
        scaleX: 1,
        imgDisX: 0,
        imgDisY: 0,
        imgMarginTop: "0px",
        imgMarginLeft: "0px"
      });
    }
  }, {
    key: "onEnlarge",
    value: function onEnlarge(e) {
      window.event ? window.event.cancelBubble = true : e.stopPropagation();
      var imgheight = this.state.imgheight;

      this.setState({
        imgheight: imgheight.split("px")[0] * 1.2 + "px"
      });
    }
  }, {
    key: "onNarrow",
    value: function onNarrow(e) {
      window.event ? window.event.cancelBubble = true : e.stopPropagation();
      var imgheight = this.state.imgheight;

      this.setState({
        imgheight: imgheight.split("px")[0] * 0.8 + "px"
      });
    }
  }, {
    key: "onAntiClockwise",
    value: function onAntiClockwise(e) {
      window.event ? window.event.cancelBubble = true : e.stopPropagation();
      var rotate = this.state.rotate;

      var nowDeg = rotate.split("deg")[0] || 0;
      this.setState({
        rotate: parseInt(nowDeg, 10) - 90 + "deg"
      });
    }
  }, {
    key: "onClockwise",
    value: function onClockwise(e) {
      window.event ? window.event.cancelBubble = true : e.stopPropagation();
      var rotate = this.state.rotate;

      var nowDeg = rotate.split("deg")[0] || 0;
      this.setState({
        rotate: parseInt(nowDeg, 10) + 90 + "deg"
      });
    }
  }, {
    key: "onSymmetric",
    value: function onSymmetric(e) {
      window.event ? window.event.cancelBubble = true : e.stopPropagation();
      var scaleX = this.state.scaleX;

      this.setState({
        scaleX: scaleX === 1 ? -1 : 1
      });
    }
  }, {
    key: "imgDown",
    value: function imgDown(e) {
      window.event ? window.event.cancelBubble = true : e.stopPropagation();
      var imgMoveState = this.state.imgMoveState;

      if (imgMoveState) return;
      var oEvent = e;
      this.setState({
        imgMoveState: true,
        imgDisX: oEvent.clientX,
        imgDisY: oEvent.clientY
      });
    }
  }, {
    key: "imgMove",
    value: function imgMove(e) {
      window.event ? window.event.cancelBubble = true : e.stopPropagation();
      var _state3 = this.state,
          imgMoveState = _state3.imgMoveState,
          imgDisX = _state3.imgDisX,
          imgDisY = _state3.imgDisY,
          imgMarginTop = _state3.imgMarginTop,
          imgMarginLeft = _state3.imgMarginLeft;

      if (!imgMoveState) return;
      var oDiv = document.getElementById("imgpreview");
      var maxWidth = oDiv.width;
      var maxHeight = oDiv.height;
      var speed = 5;
      var clientX = e.clientX,
          clientY = e.clientY;

      var top = imgMarginTop.split("px")[0] || 0;
      var left = imgMarginLeft.split("px")[0] || 0;
      var marginTop = (clientY - imgDisY) * speed + parseInt(top, 10);
      var marginLeft = (clientX - imgDisX) * speed + parseInt(left, 10);
      if (marginTop < -maxHeight) {
        marginTop = -maxHeight;
      } else if (marginTop > maxHeight) {
        marginTop = maxHeight;
      }
      if (marginLeft < -maxWidth) {
        marginLeft = -maxWidth;
      } else if (marginLeft > maxWidth) {
        marginLeft = maxWidth;
      }
      this.setState({
        imgDisX: clientX,
        imgDisY: clientY,
        imgMarginTop: marginTop + "px",
        imgMarginLeft: marginLeft + "px"
      });
    }
  }, {
    key: "imgUp",
    value: function imgUp(e) {
      window.event ? window.event.cancelBubble = true : e.stopPropagation();
      var imgMoveState = this.state.imgMoveState;

      if (!imgMoveState) return;
      this.setState({
        imgMoveState: false
      });
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      this.setState({
        isShow: this.props.isShow,
        urls: this.props.urls,
        current: this.props.current,
        imgheight: "683px",
        rotate: "0",
        scaleX: 1,
        imgMoveState: false,
        imgDisX: 0,
        imgDisY: 0
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _state4 = this.state,
          urls = _state4.urls,
          current = _state4.current,
          isShow = _state4.isShow,
          imgheight = _state4.imgheight,
          rotate = _state4.rotate,
          scaleX = _state4.scaleX,
          imgMarginTop = _state4.imgMarginTop,
          imgMarginLeft = _state4.imgMarginLeft,
          imgMoveState = _state4.imgMoveState;

      return _react2.default.createElement(
        "div",
        null,
        isShow ? _react2.default.createElement(
          "div",
          { className: _PreviewImage2.default.nomel },
          _react2.default.createElement(
            "div",
            { className: imgMoveState === true ? _PreviewImage2.default.moveState : null },
            _react2.default.createElement(
              "div",
              { className: _PreviewImage2.default.Imgdiv },
              _react2.default.createElement("img", {
                src: urls[current],
                alt: "",
                id: "imgpreview",
                style: {
                  height: imgheight,
                  marginTop: imgMarginTop,
                  marginLeft: imgMarginLeft,
                  transform: "scaleX(" + scaleX + ") rotate(" + rotate + ")"
                }
              })
            ),
            _react2.default.createElement("div", {
              className: _PreviewImage2.default.imgMove,
              onMouseDown: function onMouseDown(e) {
                return _this2.imgDown(e);
              },
              onMouseMove: function onMouseMove(e) {
                return _this2.imgMove(e);
              },
              onMouseUp: function onMouseUp(e) {
                return _this2.imgUp(e);
              }
            }),
            _react2.default.createElement(
              "div",
              null,
              _react2.default.createElement(
                "div",
                { className: _PreviewImage2.default.leftdiv, onMouseDown: function onMouseDown(e) {
                    return _this2.imgDown(e);
                  },
                  onMouseMove: function onMouseMove(e) {
                    return _this2.imgMove(e);
                  },
                  onMouseUp: function onMouseUp(e) {
                    return _this2.imgUp(e);
                  } },
                _react2.default.createElement("div", {
                  className: _PreviewImage2.default.preBtn,
                  onClick: function onClick(e) {
                    return _this2.onPreBtn(e);
                  }
                })
              ),
              _react2.default.createElement(
                "div",
                { className: _PreviewImage2.default.rightdiv, onMouseDown: function onMouseDown(e) {
                    return _this2.imgDown(e);
                  },
                  onMouseMove: function onMouseMove(e) {
                    return _this2.imgMove(e);
                  },
                  onMouseUp: function onMouseUp(e) {
                    return _this2.imgUp(e);
                  } },
                _react2.default.createElement("div", {
                  className: _PreviewImage2.default.afterBtn,
                  onClick: function onClick(e) {
                    return _this2.onAfterBtn(e);
                  }
                })
              ),
              _react2.default.createElement(
                "div",
                { className: _PreviewImage2.default.topdiv, onMouseDown: function onMouseDown(e) {
                    return _this2.imgDown(e);
                  },
                  onMouseMove: function onMouseMove(e) {
                    return _this2.imgMove(e);
                  },
                  onMouseUp: function onMouseUp(e) {
                    return _this2.imgUp(e);
                  } },
                _react2.default.createElement("div", {
                  className: _PreviewImage2.default.topBtn,
                  onClick: function onClick(e) {
                    return _this2.onClose(e);
                  }
                })
              ),
              _react2.default.createElement(
                "div",
                { className: _PreviewImage2.default.bottomdiv, onMouseDown: function onMouseDown(e) {
                    return _this2.imgDown(e);
                  },
                  onMouseMove: function onMouseMove(e) {
                    return _this2.imgMove(e);
                  },
                  onMouseUp: function onMouseUp(e) {
                    return _this2.imgUp(e);
                  } },
                _react2.default.createElement(
                  "div",
                  { className: _PreviewImage2.default.bottomBtns },
                  _react2.default.createElement("div", {
                    className: _PreviewImage2.default.enlarge,
                    onClick: function onClick(e) {
                      return _this2.onEnlarge(e);
                    }
                  }),
                  _react2.default.createElement("div", {
                    className: _PreviewImage2.default.narrow,
                    onClick: function onClick(e) {
                      return _this2.onNarrow(e);
                    }
                  }),
                  _react2.default.createElement("div", {
                    className: _PreviewImage2.default.antiClockwise,
                    onClick: function onClick(e) {
                      return _this2.onAntiClockwise(e);
                    }
                  }),
                  _react2.default.createElement("div", {
                    className: _PreviewImage2.default.clockwise,
                    onClick: function onClick(e) {
                      return _this2.onClockwise(e);
                    }
                  }),
                  _react2.default.createElement("div", {
                    className: _PreviewImage2.default.symmetric,
                    onClick: function onClick(e) {
                      return _this2.onSymmetric(e);
                    }
                  })
                )
              )
            )
          )
        ) : null
      );
    }
  }]);
  return _class;
}(_react2.default.Component);

exports.default = _class;
module.exports = exports["default"];