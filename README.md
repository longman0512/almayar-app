# almayar-app


# image upload issue using axios(2021-02-23)
-android
there is a solution on https://stackoverflow.com/questions/61288096/react-native-axios-upload-image-return-network-error-on-android

public void apply(OkHttpClient.Builder builder) {
    // builder.addNetworkInterceptor(new FlipperOkhttpInterceptor(networkFlipperPlugin));
}

* but I have only fixed on android, I don't know it work on ios