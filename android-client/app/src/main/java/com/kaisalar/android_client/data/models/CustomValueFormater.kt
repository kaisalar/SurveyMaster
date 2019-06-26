package com.kaisalar.android_client.data.models

import com.github.mikephil.charting.formatter.ValueFormatter

class CustomValueFormater(private val labels: ArrayList<String>) :  ValueFormatter() {

    override fun getFormattedValue(value: Float): String {
        if (labels.size > (value.toInt()))
            return labels[value.toInt()]
        return "$value"

//        return "$value"
//        return super.getFormattedValue(value)
    }
}