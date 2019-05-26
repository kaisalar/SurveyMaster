package com.kaisalar.android_client.views.toasts

import android.content.Context
import android.view.LayoutInflater
import android.widget.TextView
import android.widget.Toast
import com.kaisalar.android_client.R

class DoneToast(context: Context) {
    companion object {
        fun getInstance(context: Context): DoneToast {
            return DoneToast(context)
        }
    }

    private val toast: Toast = Toast(context)
    private val view = LayoutInflater.from(context).inflate(R.layout.toast_done, null)

    init {
        toast.duration = Toast.LENGTH_LONG
    }

    fun show(message: String) {
        view.findViewById<TextView>(R.id.doneToastMessageTextView).text = message
        toast.view = view
        toast.show()
    }
}