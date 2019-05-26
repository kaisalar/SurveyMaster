package com.kaisalar.android_client.views.fragments

import android.content.Intent
import android.os.Bundle
import android.support.v4.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.kaisalar.android_client.R
import com.kaisalar.android_client.data.services.AuthService
import com.kaisalar.android_client.utils.AuthTokenHandler
import com.kaisalar.android_client.views.activities.MainActivity
import com.kaisalar.android_client.views.dialogs.LoadingDialog
import com.kaisalar.android_client.views.toasts.ConnectionErrorToast
import kotlinx.android.synthetic.main.fragment_login.*

class LoginFragment : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_login, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        loginButton.setOnClickListener {

            val loadingDialog = LoadingDialog.getInstance(context!!)
            loadingDialog.show()

            AuthService.getInstance(context!!).authUser(
                email = loginEmailEditText.text.toString(),
                password = loginPasswordEditText.text.toString(),
                onSuccess = {
                    // Store the token
                    AuthTokenHandler.putAuthToken(context!!, it)

                    val intent = Intent(context, MainActivity::class.java)
                    startActivity(intent)

                    loadingDialog.dismiss()
                },
                onFailure = {
                    loadingDialog.dismiss()
                    ConnectionErrorToast.getInstance(context!!).show()
                }
            )
        }
    }

    override fun onResume() {
        super.onResume()
        loginEmailEditText.requestFocus()
    }
}
