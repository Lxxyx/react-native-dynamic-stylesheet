import { Platform, StyleSheet, ViewStyle } from 'react-native'
import DynamicStyleSheet from '../index'

it('DynamicStyleSheet should exist', () => {
  expect(DynamicStyleSheet).toBeTruthy()
})

it('DynamicStyleSheet should have create method', () => {
  expect(DynamicStyleSheet.create).toBeTruthy()
})

describe('DynamicStyleSheet method', () => {

  it('create normal stylesheet', () => {
    const RNStyles = StyleSheet.create({
      container: {
        flex: 1
      }
    })
    const styles = DynamicStyleSheet.create({
      container: {
        flex: 1,
      }
    })
    expect(styles.build()).toEqual(RNStyles)
  })

  it('create platform specific stylesheet', () => {
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
      } as ViewStyle
    })
    const styles = DynamicStyleSheet.create({
      container: {
        android: {
          flex: 1
        },
        ios: {
          flex: 2,
        }
      } as ViewStyle
    }).build()

    expect(styles).toEqual(RNStyles)
  })

  it('create stylesheet using props', () => {
    const RNStyles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#ffffff'
      } as ViewStyle
    })
    const style = DynamicStyleSheet.create({
      container: props => ({
        flex: 1,
        ...props.isTrue
          ? {
            backgroundColor: '#ffffff'
          } as ViewStyle
          : {}
      }) as ViewStyle
    })

    const styles = style.build({ isTrue: true })
    expect(styles).toEqual(RNStyles)
  })
})