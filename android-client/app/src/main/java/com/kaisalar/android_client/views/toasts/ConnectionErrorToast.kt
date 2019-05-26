package com.kaisalar.android_client.views.toasts

import android.content.Context
import android.view.LayoutInflater
import android.widget.Toast
import com.kaisalar.android_client.R

class ConnectionErrorToast(context: Context) {
    companion object {
        fun getInstance(context: Context): ConnectionErrorToast {
            return ConnectionErrorToast(context)
        }
    }

    private val toast: Toast = Toast(context)

    init {
        toast.view = LayoutInflater.from(context).inflate(R.layout.toast_connection_error, null)
        toast.duration = Toast.LENGTH_LONG
    }

    fun show() {
        toast.show()
    }
}