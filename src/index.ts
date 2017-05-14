import { Platform, StyleSheet as RNStyleSheet } from 'react-native'

export default class DynamicStyleSheet<S> {
  static create<T>(styles: T) {
    return new DynamicStyleSheet<T>(styles)
  }

  private styles: S
  private buildChain: Function[]
  private constructor(styles: S) {
    this.styles = styles
    this.buildChain = [this.handlePropsFunc, this.handlePlatformStyles]
  }

  build(props = {}): S {
    const dynamicStyles = Object.assign({}, this.styles)

    this.buildChain
      .forEach(func => func.call(null, dynamicStyles, props))

    return RNStyleSheet.create((dynamicStyles as any))
  }

  // 处理函数
  private handlePropsFunc = (dynamicStyles, props) => {
    Object
      .keys(dynamicStyles)
      .filter(key => dynamicStyles[key] instanceof Function)
      .forEach(key => dynamicStyles[key] = dynamicStyles[key].call(null, props))
  }

  // 处理平台特定代码
  private handlePlatformStyles = (dynamicStyles) => {
    const OS = Platform.OS

    Object
      .keys(dynamicStyles)
      .filter(key => {
        return Object
          .keys(dynamicStyles[key])
          .some(propsName => propsName === 'ios' || propsName === 'android')
      })
      .forEach(key => {
        dynamicStyles[key] = { ...dynamicStyles[key], ...dynamicStyles[key][OS] }
        delete dynamicStyles[key]['ios']
        delete dynamicStyles[key]['android']
      })
  }
}
