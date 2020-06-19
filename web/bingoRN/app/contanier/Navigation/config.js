import React from "react"
import { View, Platform } from 'react-native'
import pTd from "../../common/utils/unit"
const screenOptions = {
    header: () => Platform.OS == 'ios' ? null : <View style={{ height: pTd(1), opacity: 0 }} />,
}

export { screenOptions }