package com.kaisalar.android_client.data.models

import android.os.AsyncTask

interface LoadingImplementation {
    fun onFinishedLoading()
}

class LoadingAsync(private val listener: LoadingImplementation) : AsyncTask<Unit, Unit, Unit>() {

    @Override
    override fun doInBackground(vararg params: Unit?) {
        for(i in 0..10){
            Thread.sleep(1000)
        }
    }

    override fun onPostExecute(result: Unit?) {
        super.onPostExecute(result)

        listener.onFinishedLoading()
    }
}