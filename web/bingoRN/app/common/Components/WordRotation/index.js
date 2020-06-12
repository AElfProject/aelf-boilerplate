import React, { Component } from 'react';
import { View, Animated, Easing, Text, ViewPropTypes, Dimensions, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
const sreenWidth = Dimensions.get('screen').width
export default class WordRotation extends Component {
    static propTypes = {
        duration: PropTypes.number,                 // speed
        speed: PropTypes.number,                    // rate
        bgViewStyle: ViewPropTypes.style,           // bg styles
        textStyle: PropTypes.object,                // text styles
        textContainerWidth: PropTypes.number,       // width
        textContainerHeight: PropTypes.number,      // height
        textcontainerStyle: ViewPropTypes.style,    // textBox styles
    };

    static defaultProps = {
        duration: 10000,
        textContainerWidth: sreenWidth,
        speed: 250
        // textContainerHeight: 100
    };
    constructor(props) {
        super(props)
        this.state = {
            textWidth: 0,
            textHeight: 0,
            bgViewWidth: 0,
            duration: 0,
            text: this.props.text || this.props.children || '',
            animation: null,
        };
        this.animation = null;
        this.animatedTransformX = new Animated.Value(1);
    }

    componentWillUnmount() {
        if (this.state.animation !== null) {
            this.state.animation.stop();
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        const newText = nextProps.text || nextProps.children || '';
        if (newText != prevState.text) {
            prevState.animation.stop();
            return {
                text: newText,
                textWidth: 0,
                textHeight: 0,
                duration: 0,
                animation: null,
            }
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        let { textWidth, bgViewWidth, duration, animation } = this.state;

        if (duration === 0) {
            if (textWidth === 0 || bgViewWidth === 0) { return }

            const { duration, speed } = this.props;
            if (duration !== undefined) {
                this.setState({
                    duration: duration,
                });
            } else if (speed !== undefined) {
                this.setState({
                    duration: ((bgViewWidth + textWidth) / speed) * 1000,
                });
            }
        } else {
            if (animation === null) {
                this.animatedTransformX.setValue(bgViewWidth);
                this.setState({
                    animation: Animated.timing(this.animatedTransformX, {
                        toValue: -textWidth,
                        duration: duration,
                        useNativeDriver: true,
                        easing: Easing.linear,
                    }),
                }, () => {
                    this.state.animation.start(() => {
                        this.setState({
                            animation: null,
                        });
                    });
                });
            }
        }
    }

    textOnLayout(e) {
        this.setState({
            textWidth: e.nativeEvent.layout.width + 60,
            textHeight: e.nativeEvent.layout.height,
        });
    }

    bgViewOnLayout(e) {
        this.setState({
            bgViewWidth: e.nativeEvent.layout.width,
        });
    }

    render() {
        const { bgViewStyle, textStyle, textContainerWidth, textContainerHeight, textContainerStyle, } = this.props;
        const { textWidth, textHeight, text, animation } = this.state;

        return (
            <View
                style={{ ...styles.bgViewStyle, ...bgViewStyle }}
                onLayout={(event) => this.bgViewOnLayout(event)}
            >
                <View
                    style={{
                        ...styles.textContainerStyle,
                        width: textContainerWidth,
                        height: textContainerHeight,
                        opacity: animation === null ? 0 : 1, // Make sure the view only shows when it's animating

                        ...textContainerStyle,
                    }}
                >
                    <Animated.Text
                        style={{
                            fontSize: 20,
                            transform: [{ translateX: this.animatedTransformX }],
                            width: textWidth,
                            height: textHeight,
                            ...textStyle,
                        }}
                    >
                        {text}
                    </Animated.Text>
                </View>
                <Text
                    style={{
                        ...styles.textSizeMeasuringViewStyle,
                        ...textStyle,
                    }}
                    onLayout={(event) => this.textOnLayout(event)}
                >
                    {text}
                </Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    bgViewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'scroll',
    },
    textContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textSizeMeasuringViewStyle: {
        opacity: 0,
        fontSize: 20,
    },
})
