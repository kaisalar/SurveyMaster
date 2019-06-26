package com.kaisalar.android_client.data.models.forGetting

import android.os.Parcel
import android.os.Parcelable

class ReportAnswerForGettingParcelable(
    val _id: String?,
    val type: String?,
    val title: String?,
    val description: String?,
    val content: HashMap<String, Int>
): Parcelable {
    constructor(parcel: Parcel) : this(
        parcel.readString(),
        parcel.readString(),
        parcel.readString(),
        parcel.readString(),
        buildTheMap(parcel)
    )

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeString(_id)
        parcel.writeString(type)
        parcel.writeString(title)
        parcel.writeString(description)
        parcel.writeMap(content)
    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<ReportAnswerForGettingParcelable> {
        override fun createFromParcel(parcel: Parcel): ReportAnswerForGettingParcelable {
            return ReportAnswerForGettingParcelable(parcel)
        }

        override fun newArray(size: Int): Array<ReportAnswerForGettingParcelable?> {
            return arrayOfNulls(size)
        }
    }
}

    fun buildTheMap(parcel: Parcel): HashMap<String, Int> {

        val size = parcel.readInt()
        val map = HashMap<String, Int>(size)

        for (i in 1..size) {
            val key = parcel.readString()
            val value = parcel.readInt()
            map[key!!] = value
        }
        return map
    }
//    fun writeToMap(parcel: Parcel) {
//        parcel.writeInt(content?.size!!)
//        for ((key, value) in content) {
//            parcel.writeString(key)
//            parcel.writeInt(value)
//        }
//    }