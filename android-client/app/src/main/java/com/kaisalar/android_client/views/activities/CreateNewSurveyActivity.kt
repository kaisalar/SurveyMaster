package com.kaisalar.android_client.views.activities

import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.support.v7.widget.PopupMenu
import com.kaisalar.android_client.R
import kotlinx.android.synthetic.main.activity_create_new_survey.*

class CreateNewSurveyActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_create_new_survey)

        supportActionBar!!.title = "Create New Survey"
        supportActionBar!!.setDisplayHomeAsUpEnabled(true)
        supportActionBar!!.setDisplayShowHomeEnabled(true)

        addNewQuestionButton.setOnClickListener {
            val popup = PopupMenu(this, it)
            popup.inflate(R.menu.questions_items)
            popup.show()
        }
    }

    override fun onSupportNavigateUp(): Boolean {
        onBackPressed()
        return false
    }
}
