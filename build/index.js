import { Platform, StyleSheet as RNStyleSheet } from 'react-native';
export default class DynamicStyleSheet {
    constructor(styles) {
        // 处理函数
        this.handlePropsFunc = (dynamicStyles, props) => {
            Object
                .keys(dynamicStyles)
                .filter(key => dynamicStyles[key] instanceof Function)
                .forEach(key => dynamicStyles[key] = dynamicStyles[key].call(null, props));
        };
        // 处理平台特定代码
        this.handlePlatformStyles = (dynamicStyles) => {
            const OS = Platform.OS;
            Object
                .keys(dynamicStyles)
                .filter(key => {
                return Object
                    .keys(dynamicStyles[key])
                    .some(propsName => propsName === 'ios' || propsName === 'android');
            })
                .forEach(key => {
                dynamicStyles[key] = Object.assign({}, dynamicStyles[key], dynamicStyles[key][OS]);
                delete dynamicStyles[key]['ios'];
                delete dynamicStyles[key]['android'];
            });
        };
        this.styles = styles;
        this.buildChain = [this.handlePropsFunc, this.handlePlatformStyles];
    }
    static create(styles) {
        return new DynamicStyleSheet(styles);
    }
    build(props = {}) {
        const dynamicStyles = Object.assign({}, this.styles);
        this.buildChain
            .forEach(func => func.call(null, dynamicStyles, props));
        return RNStyleSheet.create(dynamicStyles);
    }
}
