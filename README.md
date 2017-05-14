![build status](https://travis-ci.org/Lxxyx/react-native-dynamic-stylesheet.svg?branch=master)

# Intro
A dynamic stylesheet for react native, support typescript.

```
npm install react-native-dynamic-stylesheet --save
```

# How to use

Just like react stylesheet, but need use `build` to generate stylesheet after use `create` method.

```typescript
import DynamicStyleSheet from 'react-native-dynamic-stylesheet'

const styles = DynamicStyleSheet.create({
  container: {
    flex: 1
  }
}).build()

class Example extends React.Component {
  render () {
    return (
       <View style={styles.container}></View>
    )
  }
}

```

# Usage

## 1. platform specific styles

```typescript
import { StyleSheet } from 'react-native'
import DynamicStyleSheet from 'react-native-dynamic-stylesheet'

const RNStyles = StyleSheet.create({
  container: {
    ...Platform.select({
      android: {
        flex: 1
      },
      ios: {
        flex: 2
      }
    })
  }
})

// is same

const styles = DynamicStyleSheet.create({
  container: {
    android: {
      flex: 1
    },
    ios: {
      flex: 2,
    }
  }
}).build()
```

Then when application running at android device, container style `flex` will be 2, ios container style `flex` will be 1.

Do not need write `Platform.select` anymore.

## 2. dynamic styles

You can pass props at `build` method.

```typescript
import { StyleSheet } from 'react-native'
import DynamicStyleSheet from 'react-native-dynamic-stylesheet'

const RNStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  }
})

// build styles
const styles = DynamicStyleSheet.create({
  container: props => ({
    flex: 1,
    ...props.isTrue
      ? {
        backgroundColor: '#ffffff'
      }
      : {}
  })
}).build({ isTrue: true })
```
