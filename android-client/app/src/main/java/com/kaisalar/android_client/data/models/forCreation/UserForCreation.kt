package com.kaisalar.android_client.data.models.forCreation

class UserForCreation {
    var firstName: String
    var lastName: String
    var email : String
    var password: String

    constructor(firstName: String, lastName: String, email: String, password: String) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.password = password
    }
}