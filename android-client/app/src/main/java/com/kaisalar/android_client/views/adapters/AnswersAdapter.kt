package com.kaisalar.android_client.views.adapters

import android.content.Context
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import com.kaisalar.android_client.R
import com.kaisalar.android_client.data.models.forGetting.*

class AnswersAdapter(val context: Context, private val questions: List<QuestionForGetting>, private val answers: List<AnswerForGetting>)
    : RecyclerView.Adapter<RecyclerView.ViewHolder>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        val view = LayoutInflater.from(context).inflate(R.layout.answer_list_item, parent, false)
        when (viewType) {
            0 -> return TextHolder(view)
            1 -> return MultipleChoiceHolder(view)
            2 -> return SingleNumberValueHolder(view)
            3 -> return RangeHolder(view)
        }
        return TextHolder(view)
    }

    override fun getItemCount(): Int {
        return answers.count()
    }

    override fun getItemViewType(position: Int): Int {
        val a = answers[position]
        if (a is TextAnswerForGetting) return 0
        if (a is MultipleChoiceAnswerForGetting) return 1
        if (a is SingleNumberValueAnswerForGetting) return 2
        if (a is RangeAnswerForGetting) return 3
        return 4
    }

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        when (holder.itemViewType) {
            0 -> {
                val h = holder as TextHolder
                h.bind(answers[position] as TextAnswerForGetting, position)
            }
            1 -> {
                val h = holder as MultipleChoiceHolder
                h.bind(answers[position] as MultipleChoiceAnswerForGetting, position)
            }
            2 -> {
                val h = holder as SingleNumberValueHolder
                h.bind(answers[position] as SingleNumberValueAnswerForGetting, position)
            }
            3 -> {
                val h = holder as RangeHolder
                h.bind(answers[position] as RangeAnswerForGetting, position)
            }
        }
    }

    inner class TextHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val answerNumber = itemView.findViewById<TextView>(R.id.answerNumberTextView)
        private val answerQuestion = itemView.findViewById<TextView>(R.id.answerQuestionTextView)
        private val answerValue = itemView.findViewById<TextView>(R.id.answerValue)

        fun bind(answer: TextAnswerForGetting, position: Int) {
            answerQuestion.text = getQuestionTitle(answer.questionId)
            answerNumber.text = "#${position + 1}"
            answerValue.text = answer.content.value
        }
    }

    inner class MultipleChoiceHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val answerNumber = itemView.findViewById<TextView>(R.id.answerNumberTextView)
        private val answerQuestion = itemView.findViewById<TextView>(R.id.answerQuestionTextView)
        private val answerValue = itemView.findViewById<TextView>(R.id.answerValue)

        fun bind(answer: MultipleChoiceAnswerForGetting, position: Int) {
            answerQuestion.text = getQuestionTitle(answer.questionId)
            answerNumber.text = "#${position + 1}"
            val strBuilder = StringBuilder()
            if (answer.content.choices.count() == 1) strBuilder.append("- ${answer.content.choices[0]}")
            else {
                for(choice in answer.content.choices)  {
                    when (answer.content.choices.indexOf(choice)) {
                        answer.content.choices.count() - 1 -> strBuilder.append("- $choice")
                        else -> strBuilder.append("- $choice\n")
                    }
                }
            }
            answerValue.text = strBuilder
        }
    }

    inner class SingleNumberValueHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val answerNumber = itemView.findViewById<TextView>(R.id.answerNumberTextView)
        private val answerQuestion = itemView.findViewById<TextView>(R.id.answerQuestionTextView)
        private val answerValue = itemView.findViewById<TextView>(R.id.answerValue)

        fun bind(answer: SingleNumberValueAnswerForGetting, position: Int) {
            answerQuestion.text = getQuestionTitle(answer.questionId)
            answerNumber.text = "#${position + 1}"
            answerValue.text = answer.content.value.toString()
        }
    }

    inner class RangeHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val answerNumber = itemView.findViewById<TextView>(R.id.answerNumberTextView)
        private val answerQuestion = itemView.findViewById<TextView>(R.id.answerQuestionTextView)
        private val answerValue = itemView.findViewById<TextView>(R.id.answerValue)

        fun bind(answer: RangeAnswerForGetting, position: Int) {
            answerQuestion.text = getQuestionTitle(answer.questionId)
            answerNumber.text = "#${position + 1}"
            answerValue.text = "${answer.content.minValue} -> ${answer.content.maxValue}"
        }
    }

    fun getQuestionTitle(questionId: String): String {
        val question = questions.find { q -> q._id == questionId }
        if (question != null) return question.title
        return ""
    }
}