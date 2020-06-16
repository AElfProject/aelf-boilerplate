import { StyleSheet } from 'react-native';

import pTd from "../../common/utils/unit";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: pTd(20),
    },
    containerItem: {
        marginTop: pTd(15),
        padding: pTd(15),
        borderRadius: pTd(10),
        borderColor: 'gray',
        borderWidth: pTd(1)
    },
    flexRow: {
        marginTop: pTd(10),
        flexDirection: 'row',
    },
    copyDetails: {
        flex: 1,
        color: 'blue'
    },
    awardText:{
        // marginTop:pTd(15),
        alignSelf:'center',
        color:'green',
    }
})


export default styles;