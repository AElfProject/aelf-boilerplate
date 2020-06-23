import React from "react"
import { View, Platform } from 'react-native'
import { CardStyleInterpolators } from '@react-navigation/stack';
import pTd from "../../common/utils/unit";
const screenOptions = {
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    header: () => Platform.OS == 'ios' ? null : <View style={{ height: pTd(1), backgroundColor: 'gray' }} />,
}

export { screenOptions }