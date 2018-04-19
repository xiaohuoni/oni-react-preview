# oni-react-preview
[![NPM version](https://img.shields.io/npm/v/oni-react-preview.svg?style=flat)](https://npmjs.org/package/oni-react-preview)
[![NPM downloads](http://img.shields.io/npm/dm/oni-react-preview.svg?style=flat)](https://npmjs.org/package/oni-react-preview)

<img src="https://github.com/xiaohuoni/react-hexagon-progress/raw/master/preview.png" width=300 />

## Getting Started
源码在src，还没整理，下面的东西不能用哈
Install

```bash
# Install
$ npm install oni-react-preview --save

```

#### Usage Examples

```javascript
import PreviewImage from 'oni-react-preview'
function App(props) {
  const ImageUrl = {
    isShow:true,
    urls:[
        'https://avatar.csdn.net/A/1/F/3_onil_chen.jpg',
],
    current:0,
    onCloseHander:(){
      //可选，点击回调
    }
  }
  return (
    <div className={styles.wrap}>
     <PreviewImage {...ImageUrl}></PreviewImage>
     </div>
  );
}
```
## License

[MIT](https://tldrlegal.com/license/mit-license)
