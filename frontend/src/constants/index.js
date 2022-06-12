const STATUS_CODE = {
    success: 1,
    failure: 0
}

const USER_ROLE = {
    'admin': 'admin',
    'member': 'member',
    'superAdmin': 'superAdmin'
}

const USER_STATUS = {
    'active': 'active',
    'inactive': 'inactive'
}

const APP_NAME = {
    'web_app': 'web_app'
}

const RESULT_MESSAGE = {
    'errors': {
        'incorrectUsernameOrPassword': 'incorrect_username_or_password',
        'couldNotValidateCredentials': 'could_not_validate_credentials',
        'inactiveUser': 'inactive_user',
        'fileNotFound': 'file_not_found',
        'accountAlreadyExists': 'account_already_exists',
        'userNotFound': 'user_not_found',
        'createFailure': 'create_failure',
        'updateFailure': 'update_failure',
        'deleteFailure': 'delete_failure',
        'userDoesNotExist': 'user_does_not_exist',
        'notPermission': 'not_permission',
        'verificationFailed': 'verification_failed',
        'emailNotFound': 'email_not_found',
        'verifyCodeIncorrect': 'verify_code_incorrect',
        'passwordDontMatch': 'password_dont_match',
        'overNumOfAllowedAttemps': 'over_num_of_allowed_attemps',
        'codeExpired': 'codeExpired',
        'mailHasNotBeenSent': 'mail_has_not_been_sent',
        'passwordIncorrect': 'password_incorrect',
        'mailOrCodeIncorrect': 'mail_or_code_incorrect',
        'emailAlreadyExists': 'email_already_exists'
    },
    'success': {
        'login': 'login_success',
        'register': 'register_success',
        'fetch': 'fetch_success',
        'convert': 'convert_success',
        'create': 'create_success',
        'update': 'update_success',
        'delete': 'delete_success',
        'verify': 'verify_success',
        'forgotPassword': 'mail_has_been_seen',
        'resetPassword': 'reset_password_success',
    }
}

export {
    STATUS_CODE,
    USER_STATUS,
    USER_ROLE,
    APP_NAME,
    RESULT_MESSAGE
}
