import React, { useEffect } from 'react'
import { Button, Alert, View, SafeAreaView, PermissionsAndroid, Platform, Text, } from 'react-native'

const Home = props => {
    const [ barcode, setBarcode ] = React.useState('')
    const [ barcodeType, setBarcodeType ] = React.useState('')
    const [ countryCode, setCountryCode ] = React.useState('')
    const [ businessCode, setBusinessCode ] = React.useState('')
    const [ itemCode, setItemCode ] = React.useState('')
    const [ packagingCode, setPackagingCode, ] = React.useState('')

    const isValidBarcode = value => {
        const number = typeof value === 'string' ? value : String(value)
        const digit = number.slice(0, -1).split('').reverse().reduce((sum, v, i) => sum + v * (i % 2 || 3), 0) * 9 % 10
        console.log('checksum digit', digit)
        return /^\d+$/.test(number) && String(digit) === number[number.length - 1]
    }

    const onBarcodeScannerStart = props => {
        if(Platform.OS === 'android') {
            const onCameraPermissionRequest = async () => {
                try {
                    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
                        'title': '카메라 권한 요청',
                        'message': '바코드를 스캔하기 위해 카메라 접근 권한을 허용해주세요.'
                    })
                    
                    if(granted === PermissionsAndroid.RESULTS.GRANTED)
                        props.navigation.navigate('BarcodeScanner', { scanBarcode: onScanBarcode })
                }
                catch(error) {
                    console.error(error)
                    Alert.alert('오류', '오류가 발생했습니다. ' + error.message)
                }
            }
            onCameraPermissionRequest()
        }
        else
            props.navigation.navigate('BarcodeScanner', { scanBarcode: onScanBarcode })
    }

    const onScanBarcode = value => {
        console.log('scanned barcode:', value)

        //  바코드 채크
        const valid = isValidBarcode(value)
        if(valid) {
            //  EAN8
            if(value.length === 8) {
                setBarcode(value)
                setBarcodeType('EAN-8')
                
                setCountryCode(value.substring(0, 3))
                setBusinessCode(value.substring(3, 6))
                setItemCode(value[6])
            }
            //  EAN12
            else if(value.length === 12) {
                setBarcode(value)
                setBarcodeType('EAN-12')
                
                setCountryCode('북미')
                setBusinessCode(value.substring(0, 6))
                setItemCode(6, 11)
            }
            //  EAN13
            else if(value.length === 13) {
                setBarcode(value)
                setBarcodeType('EAN-13')

                setCountryCode(value.substring(0, 3))
                setBusinessCode(value.substring(3, 9))
                setItemCode(value.substring(9, 12))
            }
            //  EAN14
            else if(value.length === 14) {
                setBarcode(value)
                setBarcodeType('EAN-14')
                
                setPackagingCode(value[0])
                setCountryCode(value.substring(1, 4))
                setBusinessCode(value.substring(4, 10))
                setItemCode(value.substring(10, 13))
            }
        }

        // if(value) {
        //     const reversed = value.split('').reverse()

        //     //  EAN-13
        //     if(value?.length === 13) {
        //         let a = 0, b = 0
        //         //  1. 반대로 나열한 바코드 숫자 중 짝수자리에 있는 숫자를 모두 더하고 3을 곱한다.
        //         for(let i = 1; i <= reversed.length; i ++)
        //             if(i % 2 === 0)
        //                 a += Number(reversed[i - 1])
        //         a = a * 3

        //         //  2. 반대로 나열한 바코드 숫자 중 검증코드(첫 번째)를 제외한 홀수자리에 있는 숫자를 모두 더한다.
        //         for(let i = 1; i <= reversed.length; i ++) {
        //             if(i !== 1 && (i % 2 !== 0))
        //                 b += Number(reversed[i - 1])
        //         }

        //         //  3. a 와 b 합한다.
        //         let num = a + b

        //         //  4. a 와 b 의 합한 값의 가장 가까운 수를 구한다.
        //         let roundedNum = Math.round(num / 10) * 10

        //         //  5. roundedNum 에서 num 만큼 뺄셈한다.
        //         let check = roundedNum - num

        //         //  바코드의 채크섬으로 바코드 검증 
        //         if(check === Number(reversed[0])) {
        //             setBarcode(value)
        //             setBarcodeType('EAN-13')

        //             setCountry(value?.substring(0, 3))
        //             setManufacturer(value?.substring(3, 7))
        //             setItem(value?.substring(7, 12))
        //         }
        //         else
        //             Alert.alert('오류', '올바르지 않은 바코드입니다. 다시 스캔해주세요.')
        //     }

        //     //  EAN-8
        //     else if(value?.length === 8) {
        //         const code = value.split('')
                
        //         let a = Number(code[1]) + Number(code[3]) + Number(code[5])
        //         let b = 3 * (Number(code[0]) + Number(code[2]) + Number(code[4]) + Number(code[6]))

        //         let checksumValue = a + b
        //         let checksumDigit = 10 - (checksumValue % 10)
        //         if(checksumDigit === 10)
        //             checksumDigit = 0

        //         if(checksumDigit === Number(code[code.length - 1])) {
        //             setBarcode(value)
        //             setBarcodeType('EAN-8')
        //         }
        //         else
        //             Alert.alert('오류', '올바르지 않은 바코드입니다. 다시 스캔해주세요.')
        //     }
        // }
    }

    return (
        <View style={{ flex: 1, }}>
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <Button title="스캔" onPress={ () => onBarcodeScannerStart(props) } />
                {
                    barcode ?
                    <View style={{ marginTop: 32, }}>
                        <Text style={{ color: 'green', textAlign: 'center', fontWeight: 'bold' }}>
                            바코드가 스캔 되었습니다.
                        </Text>
                        <Text style={{ fontSize: 14, textAlign: 'center', color: 'black', }}>
                            { `스캔된 바코드: ${barcode} [${barcodeType}]` }
                        </Text>
                        <View>
                            <Text style={{ fontSize: 14, color: 'grey' }}>
                                { `국가코드: ${countryCode}` }
                            </Text>
                            <Text style={{ fontSize: 14, color: 'grey' }}>
                                { `업체코드: ${businessCode}` }
                            </Text>
                            <Text style={{ fontSize: 14, color: 'grey' }}>
                                { `제품코드: ${itemCode}` }
                            </Text>
                            {
                                packagingCode ? <Text style={{ fontSize: 14, color: 'grey' }}>{ `물류식별코드: ${packagingCode}` }</Text> : <></>
                            }
                        </View>
                    </View>
                    :
                    <></>
                }
            </SafeAreaView>
        </View>
    )
}

export default Home