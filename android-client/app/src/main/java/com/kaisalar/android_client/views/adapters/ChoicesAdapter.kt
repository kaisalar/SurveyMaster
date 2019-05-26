package com.kaisalar.android_client.views.adapters

import android.content.Context
import android.support.design.widget.TextInputEditText
import android.support.design.widget.TextInputLayout
import android.support.v7.widget.RecyclerView
import android.text.Editable
import android.text.TextWatcher
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.kaisalar.android_client.R

class ChoicesAdapter(
    val context: Context,
    private val choices: List<String>,
    private val onChoiceChange: (String, Int) -> Unit
    ) : RecyclerView.Adapter<ChoicesAdapter.Holder>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): Holder {
        val view = LayoutInflater.from(context).inflate(R.layout.choice_list_item, parent, false)
        return Holder(view)
    }

    override fun getItemCount(): Int {
        return choices.count()
    }

    override fun onBindViewHolder(holder: Holder, position: Int) {
        holder.bindChoice(choices[position], position)
    }

    inner class Holder(itemView: View) : RecyclerView.ViewHolder(itemView) {

        private val choiceEditText = itemView.findViewById<TextInputEditText>(R.id.choiceEditText)
        private val choiceTextLayout = itemView.findViewById<TextInputLayout>(R.id.choiceTextLayout)

        fun bindChoice(choice: String, position: Int) {
            choiceEditText.setText(choice)
            choiceTextLayout.hint = "Choice ${position + 1}"

            choiceEditText.addTextChangedListener(object : TextWatcher {
                override fun afterTextChanged(s: Editable?) {}
                override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
                override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                    onChoiceChange(s.toString(), position)
                }
            })
        }
    }
}