package com.kaisalar.android_client.views.fragments

import android.os.Bundle
import android.support.v4.app.Fragment
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.PopupMenu
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.kaisalar.android_client.R
import com.kaisalar.android_client.data.models.forCreation.*
import com.kaisalar.android_client.views.activities.CreateNewSurveyActivity
import com.kaisalar.android_client.views.adapters.CreatedQuestionsAdapter
import kotlinx.android.synthetic.main.fragment_create_survey_questions.*

class CreateSurveyQuestionsFragment : Fragment() {

    private val questions = mutableListOf<QuestionForCreation>()
    private lateinit var questionsAdapter: CreatedQuestionsAdapter

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_create_survey_questions, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        questionsAdapter = CreatedQuestionsAdapter(context!!, questions) { onDeleteQuestion(it) }

        addNewQuestionButton.setOnClickListener { onAddNewQuestion(it) }

        val layoutManager = LinearLayoutManager(context)

        createSurveyQuestionsRecyclerView.apply {
            this.adapter = questionsAdapter
            this.layoutManager = layoutManager
        }
    }

    private fun onAddNewQuestion(view: View) {
        val popup = PopupMenu(context!!, view)
        popup.inflate(R.menu.questions_items)
        popup.setOnMenuItemClickListener {
            when (it.itemId) {
                R.id.text_question_item -> questions.add(TextQuestionForCreation("", ""))
                R.id.paragraph_question_item -> questions.add(ParagraphQuestionForCreation("", ""))
                R.id.checkbox_question_item -> questions.add(CheckBoxQuestionForCreation("", ""))
                R.id.radio_group_question_item -> questions.add(RadioGroupQuestionForCreation("", ""))
                R.id.dropdown_question_item -> questions.add(DropDownQuestionForCreation("", ""))
            }
            questionsAdapter.notifyItemInserted(questions.count() - 1)
            true
        }
        popup.show()
    }

    override fun onPause() {
        super.onPause()
        CreateNewSurveyActivity.survey.pages[0].questions.clear()
        CreateNewSurveyActivity.survey.pages[0].questions.addAll(questions)
    }

    override fun onResume() {
        super.onResume()
        questions.clear()
        questions.addAll(CreateNewSurveyActivity.survey.pages[0].questions)
        questionsAdapter.notifyDataSetChanged()
    }

    private fun onDeleteQuestion(question: QuestionForCreation) {
        val removedIndex = questions.indexOf(question)
        questions.removeAt(removedIndex)
        questionsAdapter.notifyItemRemoved(removedIndex)
    }
}
