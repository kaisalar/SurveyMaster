package com.kaisalar.android_client.data.models

import android.app.Activity
import android.widget.RelativeLayout
import com.airbnb.lottie.LottieAnimationView
import java.security.AccessControlContext

class LoadingAnimation(private val context: Activity, animationName: String) {

    private var lottieAnimationView : LottieAnimationView = LottieAnimationView(context)

    private var rLayout : RelativeLayout = RelativeLayout(context)
    private var rLayoutParams : RelativeLayout.LayoutParams = RelativeLayout.LayoutParams(RelativeLayout.LayoutParams.FILL_PARENT, RelativeLayout.LayoutParams.FILL_PARENT)

    private val lLayoutParams : RelativeLayout.LayoutParams = RelativeLayout.LayoutParams(RelativeLayout.LayoutParams.WRAP_CONTENT, RelativeLayout.LayoutParams.WRAP_CONTENT)

    init {
        lottieAnimationView.setAnimation(animationName)
        lottieAnimationView.layoutParams = lLayoutParams

        rLayout.addView(lottieAnimationView)
    }

    fun playAnimation(loop: Boolean) {
        lottieAnimationView.loop(loop)
        context.setContentView(rLayout, rLayoutParams)
        lottieAnimationView.playAnimation()
    }

    fun stopAnimation(originalView: Int) {
        lottieAnimationView.cancelAnimation()
        context.setContentView(originalView)
    }

}