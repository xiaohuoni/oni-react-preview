import React from "react";
import styles from "./PreviewImage.less";

export default class extends React.Component {
  state = {
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
  };
  onClose() {
    this.setState({
      isShow: false
    });
  }
  onPreBtn(e) {
     e.stopPropagation();
    let { urls, current } = this.state;
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
  onAfterBtn(e) {
    window.event? window.event.cancelBubble = true : e.stopPropagation();
    let { urls, current } = this.state;
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
  onEnlarge(e) {
    window.event? window.event.cancelBubble = true : e.stopPropagation();
    let { imgheight } = this.state;
    this.setState({
      imgheight: imgheight.split("px")[0] * 1.2 + "px"
    });
  }
  onNarrow(e) {
    window.event? window.event.cancelBubble = true : e.stopPropagation();
    let { imgheight } = this.state;
    this.setState({
      imgheight: imgheight.split("px")[0] * 0.8 + "px"
    });
  }
  onAntiClockwise(e) {
    window.event? window.event.cancelBubble = true : e.stopPropagation();
    let { rotate } = this.state;
    let nowDeg = rotate.split("deg")[0] || 0;
    this.setState({
      rotate: parseInt(nowDeg, 10) - 90 + "deg"
    });
  }
  onClockwise(e) {
    window.event? window.event.cancelBubble = true : e.stopPropagation();
    let {rotate } = this.state;
    let nowDeg = rotate.split("deg")[0] || 0;
    this.setState({
      rotate: parseInt(nowDeg, 10) + 90 + "deg"
    });
  }
  onSymmetric(e) {
    window.event? window.event.cancelBubble = true : e.stopPropagation();
    let { scaleX } = this.state;
    this.setState({
      scaleX: scaleX === 1 ? -1 : 1
    });
  }
  imgDown(e) {
    window.event? window.event.cancelBubble = true : e.stopPropagation();
    let {
      imgMoveState,
    } = this.state;
    if (imgMoveState) return;
    var oEvent = e;
    this.setState({
      imgMoveState: true,
      imgDisX: oEvent.clientX,
      imgDisY: oEvent.clientY
    });
  }
  imgMove(e) {
    window.event? window.event.cancelBubble = true : e.stopPropagation();
    let {
      imgMoveState,
      imgDisX,
      imgDisY,
      imgMarginTop,
      imgMarginLeft
    } = this.state;
    if (!imgMoveState) return;
    var oDiv = document.getElementById("imgpreview");
    const maxWidth = oDiv.width;
    const maxHeight = oDiv.height;
    const speed = 5;
    let { clientX, clientY } = e;
    let top = imgMarginTop.split("px")[0] || 0;
    let left = imgMarginLeft.split("px")[0] || 0;
    let marginTop = (clientY - imgDisY) * speed + parseInt(top, 10);
    let marginLeft = (clientX - imgDisX) * speed + parseInt(left, 10);
    if(marginTop<-maxHeight){
      marginTop=-maxHeight
    }else if(marginTop>maxHeight){
      marginTop=maxHeight
    }
    if(marginLeft<-maxWidth){
      marginLeft=-maxWidth
    }else if(marginLeft>maxWidth){
      marginLeft=maxWidth
    }
    this.setState({
      imgDisX: clientX,
      imgDisY: clientY,
      imgMarginTop: marginTop + "px",
      imgMarginLeft: marginLeft + "px"
    });
  }
  imgUp(e) {
    window.event? window.event.cancelBubble = true : e.stopPropagation();
    let {
      imgMoveState,
    } = this.state;
    if (!imgMoveState) return;
    this.setState({
      imgMoveState: false
    });
  }
  componentWillMount() {
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
  onEndReached = () => {};
  render() {
    const {
      urls,
      current,
      isShow,
      imgheight,
      rotate,
      scaleX,
      imgMarginTop,
      imgMarginLeft,
      imgMoveState
    } = this.state;
    return (
      <div>
        {isShow ? (
          <div className={styles.nomel}>
          <div className={imgMoveState===true?styles.moveState:null}>
            <div className={styles.Imgdiv}>
              <img
                src={urls[current]}
                alt=""
                id="imgpreview"
                style={{
                  height: imgheight,
                  marginTop: imgMarginTop,
                  marginLeft: imgMarginLeft,
                  transform: `scaleX(${scaleX}) rotate(${rotate})`
                }}
              />
            </div>
            <div
            className={styles.imgMove}
              onMouseDown={e => this.imgDown(e)}
              onMouseMove={e => this.imgMove(e)}
              onMouseUp={e => this.imgUp(e)}
            />
              <div>
                <div className={styles.leftdiv} onMouseDown={e => this.imgDown(e)}
              onMouseMove={e => this.imgMove(e)}
              onMouseUp={e => this.imgUp(e)}>
                  <div
                    className={styles.preBtn}
                    onClick={(e) => this.onPreBtn(e)}
                  />
                </div>
                <div className={styles.rightdiv} onMouseDown={e => this.imgDown(e)}
              onMouseMove={e => this.imgMove(e)}
              onMouseUp={e => this.imgUp(e)}>
                  <div
                    className={styles.afterBtn}
                    onClick={(e) => this.onAfterBtn(e)}
                  />
                </div>
                <div className={styles.topdiv} onMouseDown={e => this.imgDown(e)}
              onMouseMove={e => this.imgMove(e)}
              onMouseUp={e => this.imgUp(e)}>
                  <div
                    className={styles.topBtn}
                    onClick={(e) => this.onClose(e)}
                  />
                </div>
                <div className={styles.bottomdiv} onMouseDown={e => this.imgDown(e)}
              onMouseMove={e => this.imgMove(e)}
              onMouseUp={e => this.imgUp(e)}>
                  <div className={styles.bottomBtns}>
                    <div
                      className={styles.enlarge}
                      onClick={(e) => this.onEnlarge(e)}
                    />
                    <div
                      className={styles.narrow}
                      onClick={(e) => this.onNarrow(e)}
                    />
                    <div
                      className={styles.antiClockwise}
                      onClick={(e) => this.onAntiClockwise(e)}
                    />
                    <div
                      className={styles.clockwise}
                      onClick={(e) => this.onClockwise(e)}
                    />
                    <div
                      className={styles.symmetric}
                      onClick={(e) => this.onSymmetric(e)}
                    />
                  </div>
                </div>
              </div>
            </div></div>
        ) : null}
      </div>
    );
  }
}
