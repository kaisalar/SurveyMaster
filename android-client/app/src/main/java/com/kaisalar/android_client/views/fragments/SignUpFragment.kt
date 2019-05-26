package com.kaisalar.android_client.views.fragments

import android.content.Intent
import android.os.Bundle
import android.support.v4.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.kaisalar.android_client.R
import com.kaisalar.android_client.data.models.forCreation.UserForCreation
import com.kaisalar.android_client.data.services.AuthService
import com.kaisalar.android_client.utils.AuthTokenHandler
import com.kaisalar.android_client.views.activities.MainActivity
import com.kaisalar.android_client.views.dialogs.LoadingDialog
import com.kaisalar.android_client.views.toasts.ErrorToast
import kotlinx.android.synthetic.main.fragment_sign_up.*

class SignUpFragment : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_sign_up, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        signUpButton.setOnClickListener {
            val user = UserForCreation(
                firstName = signUpFirstNameEditText.text.toString(),
                lastName = signUpLastNameEditText.text.toString(),
                email = signUpEmailEditText.text.toString(),
                password = signUpPasswordEditText.text.toString()
            )

            val loadingDialog = LoadingDialog.getInstance(context!!)
            loadingDialog.show()

            AuthService.getInstance(context!!).createNewUser(
                user = user,
                onSuccess = {
                    // Store the token
                    AuthTokenHandler.putAuthToken(context!!, it)

                    val intent = Intent(context, MainActivity::class.java)
                    startActivity(intent)

                    loadingDialog.dismiss()
                },
                onFailure = {
                    loadingDialog.dismiss()
                    ErrorToast.getInstance(context!!).show("Connection Error")
//                    ConnectionErrorToast.getInstance(context!!).show()
                }
            )
        }
    }

    override fun onResume() {
        super.onResume()
        signUpFirstNameEditText.requestFocus()
    }
}
