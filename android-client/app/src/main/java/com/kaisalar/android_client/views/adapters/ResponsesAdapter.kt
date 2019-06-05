package com.kaisalar.android_client.views.adapters

import android.content.Context
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import com.kaisalar.android_client.R
import com.kaisalar.android_client.data.models.forGetting.ResponseForGetting
import com.kaisalar.android_client.utils.DateUtils

class ResponsesAdapter(
    val context: Context,
    private val responses: List<ResponseForGetting>,
    private val onClick: (ResponseForGetting) -> Unit
) : RecyclerView.Adapter<ResponsesAdapter.Holder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): Holder {
        val view = LayoutInflater.from(context).inflate(R.layout.response_list_item, parent, false)
        return Holder(view)
    }

    override fun getItemCount(): Int {
        return responses.count()
    }

    override fun onBindViewHolder(holder: Holder, position: Int) {
        holder.bind(responses[position], position)
    }

    inner class Holder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val responseNumber = itemView.findViewById<TextView>(R.id.responseNumber)
        private val responseDate = itemView.findViewById<TextView>(R.id.responseDateTextView)

        fun bind(response: ResponseForGetting, position: Int) {
            responseNumber.text = "Response #${position + 1}"
            responseDate.text = DateUtils.convertTimeMillis(response.date)
            itemView.setOnClickListener {
                onClick(response)
            }
        }
    }
}
