package com.kaisalar.android_client.views.toasts

import android.content.Context
import android.view.LayoutInflater
import android.widget.TextView
import android.widget.Toast
import com.kaisalar.android_client.R

class ErrorToast(context: Context) {
    companion object {
        fun getInstance(context: Context): ErrorToast {
            return ErrorToast(context)
        }
    }

    private val toast: Toast = Toast(context)
    private val view = LayoutInflater.from(context).inflate(R.layout.toast_error, null)

    init {
        toast.duration = Toast.LENGTH_LONG
    }

    fun show(message: String) {
        view.findViewById<TextView>(R.id.errorToastMessageTextView).text = message
        toast.view = view
        toast.show()
    }
}