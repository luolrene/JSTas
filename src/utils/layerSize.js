let winWidth = document.body.clientWidth || document.documentElement.clientWidth
let winHeight = document.body.clientHeight || document.documentElement.clientHeight
function minSize () {
  let pw = '400px'
  let ph = '300px'
  return [pw, ph]
}
function normalSize () {
  let pw = '550px'
  let ph = winHeight >= 650 ? '650px' : winHeight - 100 + 'px'
  return [pw, ph]
}
function detailSize () {
  let pw = '1000px'
  let ph = winHeight >= 650 ? '650px' : winHeight - 100 + 'px'
  return [pw, ph]
}
function maxSize () {
  // let winWidth = document.body.clientWidth || document.documentElement.clientWidth
  // let winHeight = document.body.clientHeight || document.documentElement.clientHeight
  // let pw = winWidth * 0.4
  // let ph = winHeight * 0.7

  let pw = winWidth >= 1200 ? '1200px' : winWidth - 100 + 'px'
  let ph = winHeight >= 650 ? '650px' : winHeight - 100 + 'px'
  return [pw, ph]
}
function selfMaxSize () {
  let pw = winWidth - 100 + 'px'
  let ph = winHeight - 100 + 'px'
  // window.addEventListener('resize', () => {
  //   let pw = winWidth - 100 + 'px'
  //   let ph = winHeight - 100 + 'px'
  //   return [pw, ph]
  // })
  return [pw, ph]
}

/** 统一定义弹出框大小 */
export default {
  Min: minSize(),
  Max: maxSize(),
  Normal: normalSize(),
  detail: detailSize(),
  Self_Max: selfMaxSize(),
  layerSelfHeight: winHeight - 100 + 'px',
  inputSelfInput: '8vw',
  inputSelfSelect: '9vw',
  buttonSize: 'small',
  tableSelfMaxHeight: winHeight - 300
}
