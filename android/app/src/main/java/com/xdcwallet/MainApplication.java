package com.xdcwallet;

import android.app.Application;

import com.facebook.react.ReactApplication;
import im.shimo.react.cookie.CookieManagerPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.hieuvp.fingerprint.ReactNativeFingerprintScannerPackage;
// import io.fullstack.oauth.OAuthManagerPackage;
import com.horcrux.svg.SvgPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import org.reactnative.camera.RNCameraPackage;
import com.bitgo.randombytes.RandomBytesPackage;
// import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new CookieManagerPackage(),
            new SplashScreenReactPackage(),
            new ReactNativeFingerprintScannerPackage(),
            // new OAuthManagerPackage(),
            new SvgPackage(),
            new LinearGradientPackage(),
            new RNCameraPackage(),
            new RandomBytesPackage()
            // new RNGoogleSigninPackage()
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
    SoLoader.init(this, /* native exopackage */ false);
  }
}
