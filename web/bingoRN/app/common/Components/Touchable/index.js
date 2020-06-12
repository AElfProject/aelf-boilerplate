import React from 'react';
import {
    View,
    TouchableOpacity,
    TouchableHighlight
} from "react-native"
import PropTypes from 'prop-types'

// Touchable hooks

function Touchable(props) {

    let time = null
    const handlonLongPress = (props) => {
        const { onLongPress } = props
        onLongPress && onLongPress(props)
    }
    const handleClickThrottled = (props) => {
        const { onPressIn, onPress, onPressWithSecond } = props
        let newTime = new Date().getTime()
        if (!time) {
            onPressIn ? onPressIn(props) : onPress && onPress(props)
        } else if (newTime - time > onPressWithSecond) {
            onPressIn ? onPressIn(props) : onPress && onPress(props)
        }
        time = newTime
    }
    const { onPressIn, onPress, Highlight, children, style } = props
    if (Highlight) {
        return (
            <TouchableHighlight {...props} onPressIn={onPressIn ? handleClickThrottled : null} onPress={onPress ? handleClickThrottled : null} >
                <View style={style}>
                    {children}
                </View>
            </TouchableHighlight>
        )
    }
    return (
        <TouchableOpacity  {...props} onPressIn={onPressIn ? handleClickThrottled : null} onPress={onPress ? handleClickThrottled : null} >
            {children}
        </TouchableOpacity>
    );
}
Touchable.propTypes = {
    onPressWithSecond: PropTypes.number, // Click once every few seconds
    Highlight: PropTypes.bool, //use or not TouchableHighlight
}

Touchable.defaultProps = {
    onPressWithSecond: 500,
}
export default Touchable