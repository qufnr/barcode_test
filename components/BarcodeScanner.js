import React, { useEffect, } from 'react'
import { View, } from 'react-native'
import { CameraKitCameraScreen } from 'react-native-camera-kit'

//  여러 번 실행되는 것을 방지하기 위한 변수
let once = true

const onScanBarcode = (props, value) => {
    if(!once)
       return
    
    console.log('===== BARCODE SCAN START =====')
    
    once = false
    
    props.route.params.scanBarcode(value)
    props.navigation.navigate('Home')
    // props.navigation.navigate('Home', { barcode: value })
    
    console.log('===== BARCODE DETECTED =====')
}

const BarcodeScanner = props => {
    //  컴포넌트 생성 시 호출
    useEffect(() => {
        once = true
    }, [])

    return (
        <View style={{ flex: 1, }}>
            <CameraKitCameraScreen
                scanBarcode={ true }
                showFrame={ true }
                laserColor={ '#00000000' }
                frameColor={ 'green' }
                onReadCode={ event => onScanBarcode(props, event.nativeEvent.codeStringValue) }
            />
        </View>
    )
}

export default BarcodeScanner