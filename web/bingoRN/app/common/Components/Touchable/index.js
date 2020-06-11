import React, { PureComponent } from 'react';
import {
  View,
  TouchableOpacity,
  TouchableHighlight
} from "react-native"
import PropTypes from 'prop-types'

// Touchable

export default class Touchable extends PureComponent {
  time = null
  handlonLongPress = (props) => {
    if (this.props.onLongPress) {
      this.props.onLongPress(props)
    }
  }
  handleClickThrottled = (props) => {
    const { onPressWithSecond, onPress, onPressIn } = this.props
    let newTime = new Date().getTime()
    if (!this.time) {
      onPressIn ? onPressIn(props) : onPress && onPress(props)
    } else if (newTime - this.time > onPressWithSecond) {
      onPressIn ? onPressIn(props) : onPress && onPress(props)
    }
    this.time = newTime
  }
  render() {
    const { onPressIn, onPress, Highlight, children, style } = this.props
    if (Highlight) {
      return (
        <TouchableHighlight {...this.props} onPressIn={onPressIn ? this.handleClickThrottled : null} onPress={onPress ? this.handleClickThrottled : null} >
          <View style={style}>
            {children}
          </View>
        </TouchableHighlight>
      )
    } else {
      return (
        <TouchableOpacity  {...this.props} onPressIn={onPressIn ? this.handleClickThrottled : null} onPress={onPress ? this.handleClickThrottled : null} >
          {children}
        </TouchableOpacity>
      );
    }
  }
}

Touchable.propTypes = {
  onPressWithSecond: PropTypes.number, // 几秒钟可以点击一次
  Highlight: PropTypes.bool, //
}

Touchable.defaultProps = {
  onPressWithSecond: 500,
}
