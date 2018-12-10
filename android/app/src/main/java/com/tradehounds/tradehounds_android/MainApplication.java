package com.tradehounds.tradehounds_android;

import android.app.Application;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.appevents.AppEventsLogger;

import com.horcrux.svg.SvgPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.tkporter.sendsms.SendSMSPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.airbnb.android.react.maps.MapsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.dylanvann.fastimage.FastImageViewPackage;

import com.facebook.soloader.SoLoader;
import com.facebook.react.ReactPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactApplication;
import com.mkuczera.RNReactNativeHapticFeedbackPackage;
import com.horcrux.svg.SvgPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.actionsheet.ActionSheetPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.actionsheet.ActionSheetPackage;
import com.bugsnag.BugsnagReactNative;
import com.facebook.react.shell.MainReactPackage;
import com.rnfs.RNFSPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new SvgPackage(),
        new MapsPackage(),
        new RNFSPackage(),
        new RNDeviceInfo(),
        new PickerPackage(),
        new MainReactPackage(),
            new RNReactNativeHapticFeedbackPackage(),
            new SvgPackage(),
            new SplashScreenReactPackage(),
            new LinearGradientPackage(),
            new FastImageViewPackage(),
            new ReactNativeConfigPackage(),
            new ActionSheetPackage(),
            new VectorIconsPackage(),
            new BlurViewPackage(),
        new ActionSheetPackage(),
        new RNFetchBlobPackage(),
        new ReactNativeContacts(),
        new FastImageViewPackage(),
        new LinearGradientPackage(),
        SendSMSPackage.getInstance(),
        new SplashScreenReactPackage(),
        new ReactNativeConfigPackage(),
        BugsnagReactNative.getPackage(),
        new FBSDKPackage(mCallbackManager),
        new ReactNativePushNotificationPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    // Configuration config = new Configuration();
    // config.setReleaseStage(BuildConfig.ENVIRONMENT);
    // BugsnagReactNative.startWithConfiguration(this, config);
    BugsnagReactNative.start(this);
    FacebookSdk.sdkInitialize(getApplicationContext());
    AppEventsLogger.activateApp(this);
    SoLoader.init(this, /* native exopackage */ false);
  }
}
