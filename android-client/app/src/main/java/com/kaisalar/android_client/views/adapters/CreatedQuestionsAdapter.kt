package com.kaisalar.android_client.views.adapters

import android.content.Context
import android.support.design.widget.TextInputEditText
import android.support.design.widget.TextInputLayout
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.RecyclerView
import android.text.Editable
import android.text.TextWatcher
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageButton
import android.widget.TextView
import com.kaisalar.android_client.R
import com.kaisalar.android_client.data.models.forCreation.*

class CreatedQuestionsAdapter(
    val context: Context,
    private val questions: List<QuestionForCreation>,
    private val onDeleteQuestion: (QuestionForCreation) -> Unit
    ) : RecyclerView.Adapter<RecyclerView.ViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        when (viewType) {
            0 -> {
                val view = LayoutInflater.from(context).inflate(R.layout.question_text_list_item, parent, false)
                return TextQuestionViewHolder(view)
            }
            1 -> {
                val view = LayoutInflater.from(context).inflate(R.layout.question_paragraph_list_item, parent, false)
                return ParagraphQuestionViewHolder(view)
            }
            2 -> {
                val view = LayoutInflater.from(context).inflate(R.layout.question_multiple_choice_list_item, parent, false)
                return MultipleChoiceQuestionViewHolder(view)
            }

        }
        return TextQuestionViewHolder(View(context))
    }

    override fun getItemCount(): Int {
        return questions.count()
    }

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        when (holder.itemViewType) {
            0 ->  {
                val textHolder = holder as TextQuestionViewHolder
                textHolder.bindQuestion(questions[position] as TextQuestionForCreation, position)
            }
            1 -> {
                val paragraphHolder = holder as ParagraphQuestionViewHolder
                paragraphHolder.bindQuestion(questions[position] as ParagraphQuestionForCreation, position)
            }
            2 -> {
                val multipleChoiceHolder = holder as MultipleChoiceQuestionViewHolder
                multipleChoiceHolder.bindQuestion(questions[position] as MultipleChoiceQuestionForCreation, position)
            }
        }
    }

    override fun getItemViewType(position: Int): Int {
        val q = questions[position]
        if (q is TextQuestionForCreation) return 0
        if (q is ParagraphQuestionForCreation) return 1
        if (q is CheckBoxQuestionForCreation ||
            q is RadioGroupQuestionForCreation ||
            q is DropDownQuestionForCreation) return 2
        return 3
    }

    inner class TextQuestionViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

        private val titleEditText = itemView.findViewById<TextInputEditText>(R.id.questionTextTitleEditText)
        private val titleTextLayout = itemView.findViewById<TextInputLayout>(R.id.questionTextTitleTextLayout)
        private val descriptionEditText = itemView.findViewById<TextInputEditText>(R.id.questionTextDescriptionEditText)
        private val descriptionTextLayout = itemView.findViewById<TextInputLayout>(R.id.questionTextDescriptionTextLayout)
        private val topLable = itemView.findViewById<TextView>(R.id.answerTextNumberTextView)
        private val deleteButton = itemView.findViewById<ImageButton>(R.id.textQuestionDeleteButton)

        fun bindQuestion(question: TextQuestionForCreation, position: Int) {
            titleEditText.setText(question.title)
            descriptionEditText.setText(question.description)
            topLable.setText("#${position + 1} Text Question")
            deleteButton.setOnClickListener {
                onDeleteQuestion(question)
            }

            titleEditText.addTextChangedListener(object : TextWatcher {
                override fun afterTextChanged(s: Editable?) {}
                override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
                override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                    question.title = s.toString()
                }
            })

            descriptionEditText.addTextChangedListener(object : TextWatcher {
                override fun afterTextChanged(s: Editable?) {}
                override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
                override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                    question.description = s.toString()
                }
            })
        }
    }

    inner class ParagraphQuestionViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {

        private val titleEditText = itemView.findViewById<TextInputEditText>(R.id.questionParagraphTitleEditText)
        private val titleTextLayout = itemView.findViewById<TextInputLayout>(R.id.questionParagraphTitleTextLayout)
        private val descriptionEditText = itemView.findViewById<TextInputEditText>(R.id.questionParagraphDescriptionEditText)
        private val descriptionTextLayout = itemView.findViewById<TextInputLayout>(R.id.questionParagraphDescriptionTextLayout)
        private val topLable = itemView.findViewById<TextView>(R.id.paragraphQuestionTopLabel)
        private val deleteButton = itemView.findViewById<ImageButton>(R.id.paragraphQuestionDeleteButton)

        fun bindQuestion(question: ParagraphQuestionForCreation, position: Int) {
            titleEditText.setText(question.title)
            descriptionEditText.setText(question.description)
            topLable.setText("#${position + 1} Paragraph Question")
            deleteButton.setOnClickListener {
                onDeleteQuestion(question)
            }

            titleEditText.addTextChangedListener(object : TextWatcher {
                override fun afterTextChanged(s: Editable?) {}
                override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
                override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                    question.title = s.toString()
                }
            })

            descriptionEditText.addTextChangedListener(object : TextWatcher {
                override fun afterTextChanged(s: Editable?) {}
                override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
                override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                    question.description = s.toString()
                }
            })
        }
    }

    inner class MultipleChoiceQuestionViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {

        private val titleEditText = itemView.findViewById<TextInputEditText>(R.id.questionMultipleChoiceTitleEditText)
        private val titleTextLayout = itemView.findViewById<TextInputLayout>(R.id.questionMultipleChoiceTitleTextLayout)
        private val descriptionEditText = itemView.findViewById<TextInputEditText>(R.id.questionMultipleChoiceDescriptionEditText)
        private val descriptionTextLayout = itemView.findViewById<TextInputLayout>(R.id.questionMultipleChoiceDescriptionTextLayout)
        private val topLable = itemView.findViewById<TextView>(R.id.multipleChoiceQuestionTopLabel)
        private val deleteButton = itemView.findViewById<ImageButton>(R.id.multipleChoiceQuestionDeleteButton)
        private val choicesList = itemView.findViewById<RecyclerView>(R.id.multipleChoiceQuestionChoicesRecyclerView)
        private val addNewChoiceButton = itemView.findViewById<Button>(R.id.multipleChoiceQuestionAddNewChoiceButton)

        fun bindQuestion(question: MultipleChoiceQuestionForCreation, position: Int) {
            titleEditText.setText(question.title)
            descriptionEditText.setText(question.description)
            if (question is CheckBoxQuestionForCreation)
                topLable.setText("#${position + 1} Check Box Question")
            if (question is RadioGroupQuestionForCreation)
                topLable.setText("#${position + 1} Radio Group Question")
            if (question is DropDownQuestionForCreation)
                topLable.setText("#${position + 1} Drop Down Question")
            deleteButton.setOnClickListener {
                onDeleteQuestion(question)
            }

            titleEditText.addTextChangedListener(object : TextWatcher {
                override fun afterTextChanged(s: Editable?) {}
                override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
                override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                    question.title = s.toString()
                }
            })

            descriptionEditText.addTextChangedListener(object : TextWatcher {
                override fun afterTextChanged(s: Editable?) {}
                override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
                override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                    question.description = s.toString()
                }
            })

            val choices = question.content.choices
            val adapter = ChoicesAdapter(context, choices) { s, i ->
                choices[i] = s
            }

            val layoutManager = LinearLayoutManager(context)

            choicesList.apply {
                this.adapter = adapter
                this.layoutManager = layoutManager
            }

            addNewChoiceButton.setOnClickListener {
                question.content.choices.add("")
                adapter.notifyItemInserted(choices.count() - 1)
            }
        }
    }

}