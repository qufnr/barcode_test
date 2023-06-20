# 바코드 스캐너 앱
React Native 로 구현한 바코드 스캐너 앱입니다. (Android 기기에서만 테스트된 앱입니다.)

<img width="280" alt="screenshot_1" src="https://github.com/qufnr/barcode_test/assets/49121916/c1a45bdf-7752-4acf-ab3f-60f09a56a7d8" />
<img width="280" alt="screenshot_2" src="https://github.com/qufnr/barcode_test/assets/49121916/a776a54f-cd3e-4e5a-b47e-e47bef71b3c0" />

`npm install`  
`cd android && ./gradlew clean`  
`yarn android`

## 1. react-native-camera-kit 설정
* 구버전 React Native 에서 `react-native-camera-kit` 을 사용하려면 다음과 같이 설정해야합니다.

### 1. Kotlin 버전 설정
`android/build.gradle`에 다음과 같이 Kotlin 버전을 추가합니다.
```gradle
buildscript {
    ext {
        kotlin_version = "1.6.21"
    }
    dependencies {
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version")
    }
}
```

### 2. Android 버전 설정
`android/build.gradle` 에서 버전을 다음과 같이 설정합니다.
```gradle
buildscript {
    ext {
        buildToolsVersion = "29.0.2"
        minSdkVersion = 23
        compileSdkVersion = 31
        targetSdkVersion = 29
    }
}
```
여기서 중요한 부분은 `minSdkVersion`인데, 해당 버전은 `react-native-camera-kit` 라이브러리 버전에 따라 달라질 수 있습니다.  
프로젝트를 실행 했을 때 이와 관련된 오류가 뜬다면, 오류 메시지에 `minSdkVersion`에 대한 버전을 설정하라는 메시지가 출력될 것입니다.

### 3. react-native-camera-kit의 Android 버전 설정
`node_modules/react-native-camera-kit/android/build.gradle`을 확인합니다.  
`compileSdkVersion`, `buildToolsVersion`, `minSdkVersion`, `targetSdkVersion` 을 확인하고, `android/build.gradle`에서 확인한 버전과 동일 한지 확인합니다.  
만약 동일하지 않다면 `android/build.gradle`에 설정된 버전으로 동일하게 설정해주세요.

## 2. Android 카메라 권한 설정
`android/app/main/AndroidManifest.xml`에서 카메라 접근 권한을 추가합니다.
```xml
    <uses-permission android:name="android.permission.INTERNET" />
    ...
    <uses-permission android:name="android.permission.CAMERA" />
```
