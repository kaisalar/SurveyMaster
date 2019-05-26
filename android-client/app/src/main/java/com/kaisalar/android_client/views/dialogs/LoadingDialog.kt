package com.kaisalar.android_client.views.dialogs

import android.content.Context
import android.view.LayoutInflater
import com.kaisalar.android_client.R

class LoadingDialog(context: Context) {
    companion object {
        fun getInstance(context: Context): LoadingDialog {
            return LoadingDialog(context)
        }
    }

    private val dialog: android.support.v7.app.AlertDialog

    init {
        val builder = android.support.v7.app.AlertDialog.Builder(context)
        val view = LayoutInflater.from(context).inflate(R.layout.dialog_loading, null)
        builder.setView(view)
        dialog = builder.create()
    }

    fun show() {
        dialog.show()
    }

    fun dismiss() {
        dialog.dismiss()
    }
}